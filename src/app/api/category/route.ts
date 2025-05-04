import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Connection } from 'mongoose';
import Category from '@/models/Category';

interface CategoryRequestBody {
    name: string;
    hsCode: string;
}

export async function POST(req: NextRequest) {
    let mainConnection: Connection | null = null;
    let tenantConnection: Connection | null = null;

    try {
        // Connect to the main database (centeral_db) for tenant creation
        mainConnection = await connectDB('centeral_db');

        const body: CategoryRequestBody = await req.json();

        // Validate request body
        if (
            !body.name?.trim() ||
            !body.hsCode?.trim()
        ) {
            return NextResponse.json(
                { error: 'All required fields must be provided and non-empty' },
                { status: 400 }
            );
        }

        // Use the main connection to create the Tenant model
        const CategoryModel = mainConnection.model('Category', Category.schema);


        // Create category in the main database (centeral_db)
        const category = new CategoryModel({
            name: body.name,
            hsCode: body.hsCode
        });

        const categoryDetails = await category.save();
        console.log('categoryDetails--->', categoryDetails);


        return NextResponse.json(
            {
                message: 'Tenant and admin created successfully',
                data: {
                    categoryDetails,
                },
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating tenant:', error);
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(
                (err: any) => err.message
            );
            return NextResponse.json(
                { error: 'Validation failed', details: validationErrors },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { error: 'Failed to create tenant. Please try again.' },
            { status: 500 }
        );
    }
}