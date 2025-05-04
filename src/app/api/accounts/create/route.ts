import dbConnect from "@/lib/db";
import { ShopAccount } from "@/models/Account";
import { ShopAccountFormState } from "@/store/account.store";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  try {
    await dbConnect(); // Ensure DB is connected

    const data: ShopAccountFormState = await request.json();

    // Validations as before...

    const newAccount = await ShopAccount.create({
      ...data,
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Shop account created successfully",
        data: newAccount,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating shop account:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
