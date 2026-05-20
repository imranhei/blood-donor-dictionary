import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Donor from "@/models/Donor";
import { donorVerifySchema } from "@/schemas/donorSchema";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const parsed = donorVerifySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: parsed.error.issues[0]?.message || "Invalid data",
        },
        { status: 400 }
      );
    }

    const donor = await Donor.findOne({
      phone: parsed.data.phone,
      dateOfBirth: parsed.data.dateOfBirth,
    });

    if (!donor) {
      return NextResponse.json(
        {
          success: false,
          message: "No profile found. Please register first.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Profile verified",
      data: donor,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Verification failed",
      },
      { status: 500 }
    );
  }
}