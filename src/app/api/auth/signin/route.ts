// src/app/api/auth/signin/route.ts
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { User } from '@/models/User'
import { sign } from 'jsonwebtoken'
import dbConnect from '@/lib/db'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  await dbConnect()

  const user = await User.findOne({ email })
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 400 })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 })
  }

  // Create JWT token
  const token = sign(
    { email: user.email, firstName: user.firstName, lastName: user.lastName },
    process.env.JWT_SECRET as string,
    { expiresIn: '1d' }
  )

  return NextResponse.json({
    message: 'Signin successful',
    user: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    token, // Optional, if you're sending token back
  })
}
