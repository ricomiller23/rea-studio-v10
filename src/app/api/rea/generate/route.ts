import { NextResponse } from "next/server";
import { synthesizeImprovedProject } from "@/lib/reaEngine";

export async function POST(req: Request) {
  try {
    const { analysis, improvements } = await req.json();
    if (!analysis || !improvements) {
      return NextResponse.json(
        { success: false, error: "Both analysis and improvements are required" },
        { status: 400 }
      );
    }
    const project = synthesizeImprovedProject(analysis, improvements);
    return NextResponse.json({
      success: true,
      project
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to generate project" },
      { status: 500 }
    );
  }
}
