import prisma from 'lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

function getTokenFromHeader(request) {
  const auth = request.headers.get('authorization') || request.headers.get('Authorization');
  if (!auth || !auth.startsWith('Bearer ')) return null;
  return auth.substring(7);
}

export async function GET(request) {
  try {
    const token = getTokenFromHeader(request);
    if (!token) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    return new Response(
      JSON.stringify({
        user: {
          id: user.id,
          email: user.email,
          name: user.fullName
        }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Me error', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}

