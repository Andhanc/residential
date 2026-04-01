import prisma from 'lib/prisma'
import bcrypt from 'bcryptjs'

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase()
}

function normalizePhone(value) {
  return String(value || '').trim()
}

function normalizeFullName(value) {
  return String(value || '').trim()
}

export async function POST(request) {
  try {
    const body = await request.json()
    const apartmentIdRaw = body?.apartmentId
    const apartmentId = apartmentIdRaw === null || apartmentIdRaw === undefined || apartmentIdRaw === ''
      ? null
      : Number(apartmentIdRaw)
    const fullName = normalizeFullName(body?.fullName)
    const phone = normalizePhone(body?.phone)
    const email = normalizeEmail(body?.email)
    const isReservation = Boolean(body?.isReservation)
    const meetingAtRaw = body?.meetingAt

    if (isReservation) {
      if (!apartmentId || Number.isNaN(apartmentId)) {
        return new Response(JSON.stringify({ error: 'Missing apartmentId' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        })
      }
    } else {
      if (apartmentId !== null && Number.isNaN(apartmentId)) {
        return new Response(JSON.stringify({ error: 'Invalid apartmentId' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        })
      }
    }

    if (!fullName || !phone || !email) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    let meetingAt = null
    if (isReservation) {
      if (!meetingAtRaw) {
        return new Response(JSON.stringify({ error: 'Missing meetingAt for reservation' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        })
      }

      meetingAt = new Date(meetingAtRaw)
      if (Number.isNaN(meetingAt.getTime())) {
        return new Response(JSON.stringify({ error: 'Invalid meetingAt' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        })
      }
    }

    const result = await prisma.$transaction(async (tx) => {
      if (apartmentId) {
        const apartment = await tx.apartment.findUnique({
          where: { id: apartmentId },
          select: { id: true, isReserved: true }
        })

        if (!apartment) {
          return { ok: false, status: 404, error: 'Apartment not found' }
        }

        if (isReservation && apartment.isReserved) {
          return { ok: false, status: 409, error: 'Apartment already reserved' }
        }
      }

      if (isReservation && meetingAt) {
        const existingSlot = await tx.purchaseRequest.findFirst({
          where: {
            isReservation: true,
            meetingAt
          },
          select: { id: true }
        })

        if (existingSlot) {
          return { ok: false, status: 409, error: 'Time slot already reserved' }
        }
      }

      // Upsert user by email. For new "lead" users we generate a random passwordHash.
      const existingUser = await tx.user.findUnique({
        where: { email },
        select: { id: true }
      })

      const user = existingUser
        ? await tx.user.update({
            where: { email },
            data: { fullName, phone, isLead: true },
            select: { id: true, fullName: true, phone: true, email: true }
          })
        : await tx.user.create({
            data: {
              fullName,
              phone,
              email,
              isLead: true,
              passwordHash: await bcrypt.hash(crypto.randomUUID(), 10)
            },
            select: { id: true, fullName: true, phone: true, email: true }
          })

      const purchaseRequest = await tx.purchaseRequest.create({
        data: {
          user: { connect: { id: user.id } },
          ...(apartmentId ? { apartment: { connect: { id: apartmentId } } } : {}),
          status: 'NEW',
          isReservation,
          meetingAt
        },
        select: { id: true, status: true, requestDate: true, apartmentId: true, userId: true }
      })

      if (isReservation) {
        await tx.apartment.update({
          where: { id: apartmentId },
          data: { isReserved: true, reservedAt: new Date() },
          select: { id: true }
        })
      }

      return { ok: true, user, purchaseRequest }
    })

    if (!result.ok) {
      return new Response(JSON.stringify({ error: result.error }), {
        status: result.status,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    return new Response(JSON.stringify(result), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    if (error?.code === 'P2002') {
      return new Response(JSON.stringify({ error: 'Time slot already reserved' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    console.error('Purchase request error', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

