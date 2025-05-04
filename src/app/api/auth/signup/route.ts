import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { hash } from 'bcryptjs';
import { userSchema } from '@/models/User';
import { Connection } from 'mongoose';

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, password, tenant } = await req.json();

    if (!firstName || !lastName || !email || !password || !tenant) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Connect to the central database (auth_db)
    const centralDB: Connection = await connectDB('centeral_db');
    const AuthUser = centralDB.models.User || centralDB.model('User', userSchema);


    // Connect to the tenant-specific database
    const tenantDb: Connection = await connectDB(`${tenant}_db`);
    const TenantUser = tenantDb.models.User || tenantDb.model('User', userSchema);

    // Check if the user already exists in auth_db
    const existingUser = await AuthUser.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create user in auth_db
    const authUser = await AuthUser.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: 'user',
      tenant: tenant,  // Add tenantId here for central centeral database
    });

    // Create user in tenant_db
    await TenantUser.create({
      firstName,
      lastName,
      email,
      authUserId: authUser._id,  // Reference to the user in the central DB
      role: 'user',
      tenant: tenant,  // Add tenantId here for tenant-specific database
    });

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });

  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
