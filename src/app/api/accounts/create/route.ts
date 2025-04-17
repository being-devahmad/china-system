// src/app/api/accounts/create/route.ts
import { Account } from '@/models/Account';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { tenantId, name, type, CNIC, phone } = await req.json();

    // Connect to the tenant's specific database
    await connectToTenantDB(tenantId);

    // Create a new account for that tenant
    const account = new Account({
        name,
        type,
        CNIC,
        phone
    });

    await account.save();

    return NextResponse.json({ message: 'Account created successfully', account });
}
