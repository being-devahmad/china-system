import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { userSchema } from '@/models/User';
import { compare } from 'bcryptjs';
import { Connection } from 'mongoose';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and Password are required' }, { status: 400 });
    }

    const centralDB: Connection = await connectDB('centeral_db');
    const AuthUser = centralDB.models.User || centralDB.model('User', userSchema);

    const user = await AuthUser.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        tenant: user?.tenant,
        role: user.role,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const responseUser = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      tenant: user?.tenant,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    // ⚡ Create ONE response
    const response = NextResponse.json(
      {
        message: 'Login successful',
        token,
        user: responseUser,
      },
      { status: 200 }
    );

    // ⚡ Set cookies ON THAT SAME response
    response.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;

  } catch (error: any) {
    console.error('Signin error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
