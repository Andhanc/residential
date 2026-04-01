import prisma from 'lib/prisma';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const houseId = searchParams.get('houseId');
  const floorId = searchParams.get('floorId');

  const where = {};

  if (houseId) {
    where.floor = { houseId: Number(houseId) };
  }

  if (floorId) {
    where.floorId = Number(floorId);
  }

  try {
    const apartments = await prisma.apartment.findMany({
      where,
      include: {
        floor: {
          include: {
            house: true
          }
        }
      },
      orderBy: {
        id: 'asc'
      }
    });

    return new Response(JSON.stringify(apartments), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Failed to fetch apartments', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch apartments' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const id = Number(body?.id);
    const isReserved = body?.isReserved;

    if (!id || Number.isNaN(id)) {
      return new Response(JSON.stringify({ error: 'Apartment id is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (typeof isReserved !== 'boolean') {
      return new Response(JSON.stringify({ error: 'isReserved must be boolean' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const updated = await prisma.apartment.update({
      where: { id },
      data: {
        isReserved,
        reservedAt: isReserved ? new Date() : null
      },
      include: {
        floor: {
          include: {
            house: true
          }
        }
      }
    });

    return new Response(JSON.stringify(updated), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Failed to update apartment reservation', error);
    return new Response(JSON.stringify({ error: 'Failed to update apartment reservation' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

