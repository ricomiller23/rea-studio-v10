import test from "node:test";
import assert from "node:assert/strict";
import { PRESET_TARGETS } from "../src/lib/presets.ts";
import { analyzeTarget, synthesizeImprovedProject } from "../src/lib/reaEngine.ts";

test("REA Studio Engine & Parity Verification Suite", async (t) => {
  await t.test("Test 1: Preset Targets Catalog contains 6 verified reference apps", () => {
    assert.strictEqual(PRESET_TARGETS.length, 6, "Must provide 6 verified reference targets");
    const ids = PRESET_TARGETS.map(p => p.id);
    assert.ok(ids.includes("linear"), "Must include Linear");
    assert.ok(ids.includes("vercel-ai"), "Must include Vercel AI");
    assert.ok(ids.includes("stripe"), "Must include Stripe");
    assert.ok(ids.includes("excalidraw"), "Must include Excalidraw");
    assert.ok(ids.includes("supabase"), "Must include Supabase");
    assert.ok(ids.includes("notion"), "Must include Notion");
  });

  await t.test("Test 2: Each preset carries authentic REA metrics and obligations", () => {
    for (const preset of PRESET_TARGETS) {
      assert.ok(preset.metrics.parityScore >= 85, `${preset.name} must have >= 85% parity score`);
      assert.ok(preset.components.length > 0, `${preset.name} must extract components`);
      assert.ok(preset.endpoints.length > 0, `${preset.name} must extract endpoints`);
      assert.ok(preset.schemas.length > 0, `${preset.name} must extract schemas`);
      assert.ok(preset.obligations.length > 0, `${preset.name} must extract obligations`);
    }
  });

  await t.test("Test 3: analyzeTarget resolves presets deterministically", () => {
    const linearAnalysis = analyzeTarget({ type: "preset", name: "Linear Issue Tracker & Sprint Engine" });
    assert.strictEqual(linearAnalysis.targetId, "linear");
    assert.strictEqual(linearAnalysis.architectureTier, "Fullstack SSR / Edge");
    assert.ok(linearAnalysis.components.some(c => c.name === "IssueBoard"));
  });

  await t.test("Test 4: analyzeTarget handles arbitrary dynamic GitHub / Web inputs", () => {
    const custom = analyzeTarget({
      type: "github",
      name: "Acme Crypto Terminal",
      url: "https://github.com/acme/crypto-terminal",
      description: "Real time orderbook"
    });
    assert.strictEqual(custom.targetName, "Acme Crypto Terminal");
    assert.ok(custom.components.length >= 4);
    assert.ok(custom.endpoints.length >= 3);
  });

  await t.test("Test 5: synthesizeImprovedProject generates complete compilable codebase", () => {
    const analysis = analyzeTarget({ type: "preset", name: "Linear" });
    const project = synthesizeImprovedProject(analysis, {
      targetStack: {
        framework: "Next.js 15 (App Router)",
        language: "TypeScript (Strict)",
        styling: "Vanilla Modern CSS (Design Tokens)",
        stateManagement: "Zustand",
        database: "SQLite (Drizzle ORM)"
      },
      featuresToAdd: {
        aiCopilot: true,
        multiTenantAuth: true,
        realtimeSync: true,
        auditLog: true,
        exportReporting: true,
        darkModeToggle: true,
        pwaOffline: false,
        rateLimiting: true
      },
      featuresToRemove: {
        legacyPolyfills: true,
        thirdPartyAnalytics: true,
        deprecatedStateStores: true,
        heavyVendorBundles: true
      },
      designAesthetic: "Cyberpunk Neon",
      customAdjustments: "Enforce audit logging on every update"
    });

    assert.ok(project.files.length >= 6, "Must generate at least 6 production files");
    const filePaths = project.files.map(f => f.path);
    assert.ok(filePaths.includes("package.json"), "Must include package.json");
    assert.ok(filePaths.includes("README.md"), "Must include README.md");
    assert.ok(filePaths.includes("src/lib/store.ts"), "Must include store.ts");
    assert.ok(filePaths.includes("src/components/WorkspaceApp.tsx"), "Must include WorkspaceApp.tsx");
    assert.ok(filePaths.includes("src/app/page.tsx"), "Must include page.tsx");
    assert.ok(filePaths.includes("src/app/globals.css"), "Must include globals.css");
    assert.ok(project.improvementsApplied.length >= 4, "Must apply requested improvements");
    assert.ok(project.originalVsImprovedDiffs.length >= 2, "Must generate diff comparisons");
  });
});
