import prisma from 'lib/prisma'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)

    const slots = await prisma.purchaseRequest.findMany({
      where: {
        isReservation: true,
        meetingAt: { not: null }
      },
      select: { meetingAt: true }
    })

    return new Response(JSON.stringify(slots.map((s) => s.meetingAt).filter(Boolean)), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Failed to fetch reservation slots', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch reservation slots' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

