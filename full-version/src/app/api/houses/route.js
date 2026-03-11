import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const houses = await prisma.house.findMany({
      include: {
        floors: {
          include: {
            apartments: true
          }
        }
      },
      orderBy: {
        id: 'asc'
      }
    });

    return new Response(JSON.stringify(houses), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Failed to fetch houses', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch houses' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

