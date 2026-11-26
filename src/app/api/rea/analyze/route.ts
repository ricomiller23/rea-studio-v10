import { NextResponse } from "next/server";
import { analyzeTarget } from "@/lib/reaEngine";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = analyzeTarget(body);
    return NextResponse.json({
      success: true,
      analysis: result
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to analyze software target"
      },
      { status: 500 }
    );
  }
}
