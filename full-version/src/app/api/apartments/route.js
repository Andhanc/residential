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

