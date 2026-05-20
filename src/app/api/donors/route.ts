import { connectDB } from "@/lib/db";
import Donor from "@/models/Donor";
import { donorCreateSchema } from "@/schemas/donorSchema";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const bloodGroup = searchParams.get("bloodGroup") || "";

    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "9");
    const skip = (page - 1) * limit;

    const baseQuery: Record<string, unknown> = {};

    if (search) {
      baseQuery.$or = [
        { name: { $regex: search, $options: "i" } },
        { address: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    const donorQuery: Record<string, unknown> = {
      ...baseQuery,
    };

    if (bloodGroup && bloodGroup !== "ALL") {
      donorQuery.bloodGroup = bloodGroup;
    }

    const [donors, total, bloodGroupCounts] = await Promise.all([
      Donor.find(donorQuery).sort({ createdAt: -1 }).skip(skip).limit(limit),

      Donor.countDocuments(donorQuery),

      Donor.aggregate([
        {
          $match: baseQuery,
        },
        {
          $group: {
            _id: "$bloodGroup",
            count: { $sum: 1 },
          },
        },
      ]),
    ]);

    const counts: Record<string, number> = bloodGroupCounts.reduce(
      (
        acc: Record<string, number>,
        item: {
          _id: string;
          count: number;
        },
      ) => {
        acc[item._id] = item.count;
        return acc;
      },
      {} as Record<string, number>,
    );

    const countValues: number[] = Object.values(counts);

    const totalBloodGroupCount = countValues.reduce(
      (sum, count) => sum + count,
      0,
    );

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: donors,
      counts: {
        ALL: totalBloodGroupCount,
        ...counts,
      },
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages,
      },
    });
  } catch (error) {
    console.error("GET /api/donors error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch donors",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const parsed = donorCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: parsed.error.issues[0]?.message || "Invalid data",
        },
        { status: 400 },
      );
    }

    const existingDonor = await Donor.findOne({
      phone: parsed.data.phone,
      dateOfBirth: parsed.data.dateOfBirth,
    });

    if (existingDonor) {
      return NextResponse.json(
        {
          success: false,
          message:
            "A donor with this phone number and date of birth already exists",
        },
        { status: 409 },
      );
    }

    const donor = await Donor.create(parsed.data);

    return NextResponse.json(
      {
        success: true,
        message: "Donor registered successfully",
        data: donor,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to register donor",
      },
      { status: 500 },
    );
  }
}
