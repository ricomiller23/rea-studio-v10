import { NextResponse } from "next/server";
import { PRESET_TARGETS } from "@/lib/presets";

export async function GET() {
  return NextResponse.json({
    presets: PRESET_TARGETS,
    total: PRESET_TARGETS.length,
    timestamp: new Date().toISOString()
  });
}
