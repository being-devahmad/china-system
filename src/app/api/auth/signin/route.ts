// src/app/api/auth/signin/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect  from '@/lib/db';
import { User } from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  const { email, password } = await req.json();
  await dbConnect ();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Create token with all tenants
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      tenants: user.tenants // All tenant roles
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return NextResponse.json({
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      tenants: user.tenants
    }
  });
}
