// REA Studio: Reverse Engineer Anything Types & Contracts

export type TargetInputMode = "github" | "web" | "bundle" | "prompt" | "preset";

export interface SoftwareTarget {
  id: string;
  name: string;
  category: string;
  sourceType: TargetInputMode;
  sourceUrl?: string;
  description: string;
  rawInput?: string;
  detectedStack?: {
    framework: string;
    runtime: string;
    language: string;
    styling: string;
    bundler?: string;
  };
}

export interface ExtractedComponent {
  name: string;
  type: "page" | "layout" | "ui-component" | "hook" | "service" | "store";
  file: string;
  props: string[];
  stateHooks: string[];
  dependencies: string[];
  responsibilities: string;
  complexity: "low" | "medium" | "high";
}

export interface ExtractedEndpoint {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "WS";
  path: string;
  description: string;
  authRequired: boolean;
  requestPayload?: string;
  responseShape: string;
}

export interface ExtractedSchema {
  entity: string;
  fields: { name: string; type: string; isPrimary?: boolean; isNullable?: boolean }[];
  relations: string[];
}

export interface ReconstructionObligation {
  id: string;
  title: string;
  category: "core-logic" | "ui-flow" | "api-contract" | "data-persistence" | "security";
  description: string;
  parityWeight: number; // 1-10
  status: "identified" | "reconstructed" | "improved";
}

export interface REAAnalysisResult {
  targetId: string;
  targetName: string;
  analysisTimestamp: string;
  reaVersion: string;
  summary: string;
  architectureTier: "Client-Only SPA" | "Fullstack SSR / Edge" | "Microservices" | "Desktop / Electron" | "Native / WASM";
  components: ExtractedComponent[];
  endpoints: ExtractedEndpoint[];
  schemas: ExtractedSchema[];
  obligations: ReconstructionObligation[];
  metrics: {
    totalComponents: number;
    totalEndpoints: number;
    parityScore: number; // 0-100%
    estimatedLOC: number;
    cyclomaticComplexity: number;
  };
  keyFindings: string[];
  reconstructedOriginalCode: Record<string, string>;
}

export interface ImprovementMatrix {
  targetStack: {
    framework: "Next.js 15 (App Router)" | "Vite + React 19" | "Remix Run" | "SvelteKit";
    language: "TypeScript (Strict)" | "TypeScript + Zod" | "Modern JavaScript";
    styling: "Vanilla Modern CSS (Design Tokens)" | "CSS Modules" | "Tailwind CSS v4";
    stateManagement: "Zustand" | "React Context + Hooks" | "Jotai" | "TanStack Query";
    database: "SQLite (Drizzle ORM)" | "PostgreSQL (Prisma)" | "Browser IndexedDB + LocalStorage";
  };
  featuresToAdd: {
    aiCopilot: boolean;
    multiTenantAuth: boolean;
    realtimeSync: boolean;
    auditLog: boolean;
    exportReporting: boolean;
    darkModeToggle: boolean;
    pwaOffline: boolean;
    rateLimiting: boolean;
  };
  featuresToRemove: {
    legacyPolyfills: boolean;
    thirdPartyAnalytics: boolean;
    deprecatedStateStores: boolean;
    heavyVendorBundles: boolean;
  };
  designAesthetic: "Cyberpunk Neon" | "Dark Titanium Minimal" | "Radiant Glassmorphism" | "Enterprise High-Contrast";
  customAdjustments: string;
}

export interface GeneratedFile {
  path: string;
  name: string;
  language: "typescript" | "javascript" | "css" | "json" | "markdown" | "html";
  content: string;
  description: string;
  isImproved: boolean;
}

export interface ReconstructedProject {
  id: string;
  targetName: string;
  timestamp: string;
  description: string;
  improvementsApplied: string[];
  files: GeneratedFile[];
  summary: string;
  originalVsImprovedDiffs: {
    file: string;
    original: string;
    improved: string;
    rationale: string;
  }[];
}
