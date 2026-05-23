import { connectDB } from "@/lib/db";
import Suggestion from "@/models/Suggestion";
import { suggestionCreateSchema } from "@/schemas/suggestionSchema";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const parsed = suggestionCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: parsed.error.issues[0]?.message || "Invalid data",
        },
        { status: 400 },
      );
    }

    const suggestion = await Suggestion.create(parsed.data);

    return NextResponse.json(
      {
        success: true,
        message: "Suggestion submitted successfully",
        data: suggestion,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/suggestions error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit suggestion",
      },
      { status: 500 },
    );
  }
}