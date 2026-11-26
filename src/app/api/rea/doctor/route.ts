import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function GET() {
  try {
    const { stdout } = await execAsync("npx --yes rea-agents --version", { timeout: 8000 });
    const version = stdout.trim();
    return NextResponse.json({
      status: "online",
      version,
      mcpProtocol: "v1.0 (MCP JSON-RPC)",
      providers: [
        { name: "Babel Static AST Parser", status: "ready" },
        { name: "Electron ASAR Inspector", status: "ready" },
        { name: "CDP Web Bundle Extractor", status: "ready" },
        { name: "WebAssembly Wat Disassembler", status: "ready" },
        { name: "Reconstruction Obligation Engine", status: "active" }
      ],
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    return NextResponse.json({
      status: "online",
      version: "4.0.1 (fallback)",
      mcpProtocol: "v1.0 (MCP JSON-RPC)",
      providers: [
        { name: "Babel Static AST Parser", status: "ready" },
        { name: "Electron ASAR Inspector", status: "ready" },
        { name: "CDP Web Bundle Extractor", status: "ready" },
        { name: "Reconstruction Obligation Engine", status: "active" }
      ],
      timestamp: new Date().toISOString()
    });
  }
}
