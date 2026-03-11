import prisma from 'lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
const TOKEN_EXPIRES_IN = '7d';

function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
}

export async function POST(request) {
  try {
    const { email, password, firstName, lastName } = await request.json();

    if (!email || !password || !firstName || !lastName) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return new Response(JSON.stringify({ error: 'User already exists' }), { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        phone: '',
        fullName: `${firstName} ${lastName}`,
        passwordHash
      }
    });

    const serviceToken = createToken({ sub: user.id, email: user.email });

    return new Response(
      JSON.stringify({
        serviceToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.fullName
        }
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Register error', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}

