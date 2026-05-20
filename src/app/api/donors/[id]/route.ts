import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Donor from "@/models/Donor";
import { donorUpdateSchema } from "@/schemas/donorSchema";

export const runtime = "nodejs";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    const parsed = donorUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: parsed.error.issues[0]?.message || "Invalid data",
        },
        { status: 400 }
      );
    }

    const donor = await Donor.findById(id);

    if (!donor) {
      return NextResponse.json(
        {
          success: false,
          message: "Donor not found",
        },
        { status: 404 }
      );
    }

    if (
      donor.phone !== parsed.data.phone ||
      donor.dateOfBirth !== parsed.data.dateOfBirth
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Phone number and date of birth cannot be changed",
        },
        { status: 400 }
      );
    }

    const updatedDonor = await Donor.findByIdAndUpdate(id, parsed.data, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      data: updatedDonor,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update profile",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    const parsed = donorUpdateSchema
      .pick({
        phone: true,
        dateOfBirth: true,
      })
      .safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: parsed.error.issues[0]?.message || "Invalid data",
        },
        { status: 400 }
      );
    }

    const donor = await Donor.findById(id);

    if (!donor) {
      return NextResponse.json(
        {
          success: false,
          message: "Donor not found",
        },
        { status: 404 }
      );
    }

    if (
      donor.phone !== parsed.data.phone ||
      donor.dateOfBirth !== parsed.data.dateOfBirth
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Phone number and date of birth did not match",
        },
        { status: 403 }
      );
    }

    await Donor.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/donors/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete profile",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}