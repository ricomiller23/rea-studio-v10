import type { SoftwareTarget, REAAnalysisResult } from "../types/rea.ts";

export interface PresetTarget extends SoftwareTarget, REAAnalysisResult {}

export const PRESET_TARGETS: PresetTarget[] = [
  {
    "id": "linear",
    "targetId": "linear",
    "name": "Linear Issue Tracker & Sprint Engine",
    "targetName": "Linear Issue Tracker & Sprint Engine",
    "category": "Project Management / Productivity",
    "sourceType": "web",
    "sourceUrl": "https://linear.app",
    "description": "High-velocity, keyboard-driven issue tracker with optimistic updates, cycle management, and instant search.",
    "analysisTimestamp": "2026-10-15T13:17:00Z",
    "reaVersion": "rea-agents v6.5.0 (MCP)",
    "detectedStack": {
      "framework": "React 19 / Next.js",
      "runtime": "Edge / Node.js",
      "language": "TypeScript",
      "styling": "Vanilla CSS Tokens",
      "bundler": "Turbopack"
    },
    "architectureTier": "Fullstack SSR / Edge",
    "summary": "Reverse-engineered keyboard-first task engine. Uses local optimistic transaction queue with bidirectional synchronization.",
    "components": [
      {
        "name": "IssueBoard",
        "type": "page",
        "file": "src/components/IssueBoard.tsx",
        "props": [
          "teamId",
          "activeCycle"
        ],
        "stateHooks": [
          "useOptimisticIssues",
          "useBoardFilter",
          "useKeyboardNav"
        ],
        "dependencies": [
          "IssueCard",
          "FilterToolbar",
          "CycleProgressBar"
        ],
        "responsibilities": "Renders kanban columns (Backlog, Todo, In Progress, Done) with smooth drag and instant keyboard reordering.",
        "complexity": "high"
      },
      {
        "name": "CommandPalette",
        "type": "ui-component",
        "file": "src/components/CommandPalette.tsx",
        "props": [
          "isOpen",
          "onClose"
        ],
        "stateHooks": [
          "useCommandSearch",
          "useRecentActions"
        ],
        "dependencies": [
          "lucide-react"
        ],
        "responsibilities": "Global CMD+K omnibox allowing rapid issue creation, status changes, and fuzzy navigation across projects.",
        "complexity": "medium"
      },
      {
        "name": "IssueCard",
        "type": "ui-component",
        "file": "src/components/IssueCard.tsx",
        "props": [
          "issue",
          "onSelect",
          "onStatusChange"
        ],
        "stateHooks": [
          "useHoverState",
          "usePriorityBadge"
        ],
        "dependencies": [],
        "responsibilities": "Displays issue title, priority indicator (Urgent/High/Medium/Low), assigned avatar, and label pills.",
        "complexity": "low"
      },
      {
        "name": "useSyncQueue",
        "type": "hook",
        "file": "src/lib/useSyncQueue.ts",
        "props": [],
        "stateHooks": [
          "useIndexedDB",
          "useWebSocket"
        ],
        "dependencies": [],
        "responsibilities": "Buffers user mutations in client memory and replays them to server when network reconnects.",
        "complexity": "high"
      }
    ],
    "endpoints": [
      {
        "method": "GET",
        "path": "/api/issues",
        "description": "Fetches paginated list of team issues with priority and status filters",
        "authRequired": true,
        "responseShape": "{ issues: Issue[], total: number, cycle: Cycle }"
      },
      {
        "method": "POST",
        "path": "/api/issues",
        "description": "Creates a new issue with optimistic ID and broadcasts WebSocket delta",
        "authRequired": true,
        "requestPayload": "{ title: string, priority: string, status: string, assigneeId?: string }",
        "responseShape": "{ success: boolean, issue: Issue }"
      },
      {
        "method": "PATCH",
        "path": "/api/issues/:id",
        "description": "Mutates issue state, status column, or assignee",
        "authRequired": true,
        "requestPayload": "{ status?: string, priority?: string, title?: string }",
        "responseShape": "{ success: boolean, updated: Issue }"
      }
    ],
    "schemas": [
      {
        "entity": "Issue",
        "fields": [
          {
            "name": "id",
            "type": "string (UUID)",
            "isPrimary": true
          },
          {
            "name": "identifier",
            "type": "string (e.g. ENG-402)"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "status",
            "type": "enum (backlog, todo, in_progress, done, canceled)"
          },
          {
            "name": "priority",
            "type": "enum (urgent, high, medium, low, none)"
          },
          {
            "name": "assigneeName",
            "type": "string",
            "isNullable": true
          },
          {
            "name": "createdAt",
            "type": "timestamp"
          }
        ],
        "relations": [
          "User (assignee)",
          "Cycle",
          "Labels[]"
        ]
      },
      {
        "entity": "Cycle",
        "fields": [
          {
            "name": "id",
            "type": "string",
            "isPrimary": true
          },
          {
            "name": "number",
            "type": "number"
          },
          {
            "name": "startDate",
            "type": "date"
          },
          {
            "name": "endDate",
            "type": "date"
          }
        ],
        "relations": [
          "Issue[]"
        ]
      }
    ],
    "obligations": [
      {
        "id": "obl-1",
        "title": "Sub-50ms Optimistic UI Transitions",
        "category": "ui-flow",
        "description": "Issue status column changes must render immediately in client state before server confirms.",
        "parityWeight": 9,
        "status": "identified"
      },
      {
        "id": "obl-2",
        "title": "Universal CMD+K Keyboard Navigation",
        "category": "core-logic",
        "description": "Every UI action must be triggerable via hotkeys without reaching for the mouse.",
        "parityWeight": 8,
        "status": "identified"
      },
      {
        "id": "obl-3",
        "title": "Offline Mutation Queue with Conflict Replay",
        "category": "data-persistence",
        "description": "Disconnected client operations queue locally and sync cleanly upon reconnection.",
        "parityWeight": 8,
        "status": "identified"
      }
    ],
    "metrics": {
      "totalComponents": 14,
      "totalEndpoints": 6,
      "parityScore": 94,
      "estimatedLOC": 1820,
      "cyclomaticComplexity": 16
    },
    "keyFindings": [
      "No heavy external state library is required; a localized reactive store with broadcast channels yields optimal speed.",
      "Optimistic UI state requires deterministic client-generated UUIDs (v4) to eliminate round-trip latency.",
      "Keyboard traps must be avoided in modal dialogs by managing activeElement focus lifecycles."
    ],
    "reconstructedOriginalCode": {
      "IssueBoard.tsx": "// Reverse-engineered Linear Board component\nexport function IssueBoard() { return <div>Linear Issue Board</div>; }"
    }
  },
  {
    "id": "vercel-ai",
    "targetId": "vercel-ai",
    "name": "Vercel AI Studio & Artifacts Canvas",
    "targetName": "Vercel AI Studio & Artifacts Canvas",
    "category": "AI / Developer Tools",
    "sourceType": "web",
    "sourceUrl": "https://v0.dev",
    "description": "Real-time streaming agentic assistant with split-pane interactive code & component preview canvas.",
    "analysisTimestamp": "2026-10-15T13:17:00Z",
    "reaVersion": "rea-agents v6.5.0 (MCP)",
    "detectedStack": {
      "framework": "Next.js 15 App Router",
      "runtime": "Edge Runtime",
      "language": "TypeScript",
      "styling": "CSS Design Tokens",
      "bundler": "Turbopack"
    },
    "architectureTier": "Fullstack SSR / Edge",
    "summary": "Deconstructed streaming AI orchestrator with Server-Sent Events (SSE) and isolated sandboxed iframe preview canvas.",
    "components": [
      {
        "name": "AiChatStream",
        "type": "page",
        "file": "src/components/AiChatStream.tsx",
        "props": [
          "threadId"
        ],
        "stateHooks": [
          "useChatStream",
          "useArtifactInspector"
        ],
        "dependencies": [
          "ArtifactCanvas",
          "PromptBar"
        ],
        "responsibilities": "Main view managing bidirectional chat stream, message history, and artifact triggering.",
        "complexity": "high"
      },
      {
        "name": "ArtifactCanvas",
        "type": "ui-component",
        "file": "src/components/ArtifactCanvas.tsx",
        "props": [
          "artifact",
          "viewMode"
        ],
        "stateHooks": [
          "useSandboxRuntime",
          "useDiffToggle"
        ],
        "dependencies": [
          "CodeViewer",
          "LiveIframeRenderer"
        ],
        "responsibilities": "Split-pane panel that renders generated code, side-by-side diffs, or live preview sandbox.",
        "complexity": "high"
      },
      {
        "name": "PromptBar",
        "type": "ui-component",
        "file": "src/components/PromptBar.tsx",
        "props": [
          "onSend",
          "isStreaming"
        ],
        "stateHooks": [
          "useInputHistory",
          "useFileAttachments"
        ],
        "dependencies": [],
        "responsibilities": "Auto-resizing text area with voice, image attachment, and model selection triggers.",
        "complexity": "medium"
      }
    ],
    "endpoints": [
      {
        "method": "POST",
        "path": "/api/chat",
        "description": "Server-Sent Events streaming endpoint handling conversational prompt and code synthesis",
        "authRequired": true,
        "requestPayload": "{ prompt: string, threadId: string, model: string }",
        "responseShape": "ReadableStream<SSETokenChunk>"
      },
      {
        "method": "GET",
        "path": "/api/artifacts/:id",
        "description": "Retrieves versioned artifact bundle with source files and metadata",
        "authRequired": true,
        "responseShape": "{ artifact: ArtifactBundle }"
      }
    ],
    "schemas": [
      {
        "entity": "Artifact",
        "fields": [
          {
            "name": "id",
            "type": "string",
            "isPrimary": true
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "type",
            "type": "enum (code, markdown, html, react)"
          },
          {
            "name": "content",
            "type": "string"
          },
          {
            "name": "version",
            "type": "number"
          },
          {
            "name": "createdAt",
            "type": "timestamp"
          }
        ],
        "relations": [
          "Message",
          "Conversation"
        ]
      }
    ],
    "obligations": [
      {
        "id": "obl-ai-1",
        "title": "Low-Latency Chunk Streaming",
        "category": "core-logic",
        "description": "Edge runtime SSE streaming with zero line buffering for instant token appearance.",
        "parityWeight": 10,
        "status": "identified"
      },
      {
        "id": "obl-ai-2",
        "title": "Safe Sandboxed Code Execution",
        "category": "security",
        "description": "User code preview must run in an isolated sandbox with restricted script permissions.",
        "parityWeight": 9,
        "status": "identified"
      }
    ],
    "metrics": {
      "totalComponents": 11,
      "totalEndpoints": 4,
      "parityScore": 96,
      "estimatedLOC": 1450,
      "cyclomaticComplexity": 12
    },
    "keyFindings": [
      "SSE streaming on Edge functions prevents 60s gateway timeouts typical on standard serverless.",
      "Artifact state should be decoupled from raw chat history to allow concurrent code iteration."
    ],
    "reconstructedOriginalCode": {
      "AiChatStream.tsx": "// Reverse-engineered Vercel AI Chat Stream\nexport function AiChatStream() { return <div>AI Chat Stream</div>; }"
    }
  },
  {
    "id": "stripe",
    "targetId": "stripe",
    "name": "Stripe Developer Console & Payment Hub",
    "targetName": "Stripe Developer Console & Payment Hub",
    "category": "Fintech / Payments",
    "sourceType": "web",
    "sourceUrl": "https://stripe.com",
    "description": "PCI-compliant checkout session creator, live webhook inspector with HMAC signatures, and transaction analytics.",
    "analysisTimestamp": "2026-10-15T13:17:00Z",
    "reaVersion": "rea-agents v6.5.0 (MCP)",
    "detectedStack": {
      "framework": "Next.js 15",
      "runtime": "Node.js",
      "language": "TypeScript",
      "styling": "Modern CSS Tokens",
      "bundler": "Next Bundler"
    },
    "architectureTier": "Fullstack SSR / Edge",
    "summary": "Deconstructed payment gateway console with signed webhook dispatch and idempotent transaction execution.",
    "components": [
      {
        "name": "CheckoutFlow",
        "type": "page",
        "file": "src/components/CheckoutFlow.tsx",
        "props": [
          "sessionId"
        ],
        "stateHooks": [
          "useCardValidation",
          "usePaymentIntent"
        ],
        "dependencies": [
          "CardInput",
          "OrderSummary"
        ],
        "responsibilities": "Handles customer payment method tokenization, billing address, and checkout completion.",
        "complexity": "high"
      },
      {
        "name": "WebhookInspector",
        "type": "ui-component",
        "file": "src/components/WebhookInspector.tsx",
        "props": [
          "endpointId"
        ],
        "stateHooks": [
          "useEventFilter",
          "useResendPayload"
        ],
        "dependencies": [
          "JsonViewer"
        ],
        "responsibilities": "Displays live webhook delivery attempts, HTTP status codes, latency, and signed payload headers.",
        "complexity": "medium"
      }
    ],
    "endpoints": [
      {
        "method": "POST",
        "path": "/api/checkout/sessions",
        "description": "Creates a secure checkout session with line items and currency configuration",
        "authRequired": true,
        "requestPayload": "{ amount: number, currency: string, customerEmail: string }",
        "responseShape": "{ sessionId: string, clientSecret: string, url: string }"
      },
      {
        "method": "POST",
        "path": "/api/webhooks/test",
        "description": "Dispatches an HMAC-signed event simulation to test listener endpoint",
        "authRequired": true,
        "requestPayload": "{ eventType: string, payload: object }",
        "responseShape": "{ delivered: boolean, statusCode: number, latencyMs: number }"
      }
    ],
    "schemas": [
      {
        "entity": "PaymentTransaction",
        "fields": [
          {
            "name": "id",
            "type": "string",
            "isPrimary": true
          },
          {
            "name": "amountCents",
            "type": "number"
          },
          {
            "name": "currency",
            "type": "string (USD, EUR, GBP)"
          },
          {
            "name": "status",
            "type": "enum (succeeded, pending, failed, refunded)"
          },
          {
            "name": "customerEmail",
            "type": "string"
          },
          {
            "name": "paymentMethod",
            "type": "string"
          }
        ],
        "relations": [
          "Customer",
          "Invoice"
        ]
      }
    ],
    "obligations": [
      {
        "id": "obl-str-1",
        "title": "Idempotency Key Enforcement",
        "category": "security",
        "description": "Every payment creation must check Idempotency-Key header to eliminate double charges.",
        "parityWeight": 10,
        "status": "identified"
      }
    ],
    "metrics": {
      "totalComponents": 9,
      "totalEndpoints": 5,
      "parityScore": 92,
      "estimatedLOC": 1280,
      "cyclomaticComplexity": 14
    },
    "keyFindings": [
      "Zero card details must ever touch the primary application database; tokenization at the client boundary is mandatory.",
      "Webhook delivery requires exponential backoff retry scheduling."
    ],
    "reconstructedOriginalCode": {
      "CheckoutFlow.tsx": "// Reverse-engineered Stripe Checkout\nexport function CheckoutFlow() { return <div>Stripe Checkout</div>; }"
    }
  },
  {
    "id": "excalidraw",
    "targetId": "excalidraw",
    "name": "Excalidraw Vector Whiteboard & Math Engine",
    "targetName": "Excalidraw Vector Whiteboard & Math Engine",
    "category": "Design / Graphics",
    "sourceType": "web",
    "sourceUrl": "https://excalidraw.com",
    "description": "Virtual infinite vector canvas featuring hand-drawn rough strokes, geometric snapping, and SVG export.",
    "analysisTimestamp": "2026-10-15T13:17:00Z",
    "reaVersion": "rea-agents v6.5.0 (MCP)",
    "detectedStack": {
      "framework": "React 19 / HTML5 Canvas",
      "runtime": "Client Browser / WebGL",
      "language": "TypeScript",
      "styling": "CSS Modules",
      "bundler": "Vite"
    },
    "architectureTier": "Client-Only SPA",
    "summary": "Reverse-engineered 60fps canvas engine with mathematical rough geometry generator, spatial bounding box lookup, and undo/redo history.",
    "components": [
      {
        "name": "InfiniteCanvas",
        "type": "page",
        "file": "src/components/InfiniteCanvas.tsx",
        "props": [
          "initialElements"
        ],
        "stateHooks": [
          "useCanvasViewport",
          "useSelectionTool",
          "useRoughRenderer"
        ],
        "dependencies": [
          "ToolPalette",
          "CanvasPropertyPanel"
        ],
        "responsibilities": "Maintains 2D canvas transform matrix (pan, zoom), draws elements with rough-jitter styling, handles mouse/pointer dragging.",
        "complexity": "high"
      },
      {
        "name": "ToolPalette",
        "type": "ui-component",
        "file": "src/components/ToolPalette.tsx",
        "props": [
          "activeTool",
          "onSelectTool"
        ],
        "stateHooks": [],
        "dependencies": [
          "lucide-react"
        ],
        "responsibilities": "Floating toolbar offering Rectangle, Diamond, Ellipse, Arrow, Freehand Pen, Text, and Selection tools.",
        "complexity": "low"
      }
    ],
    "endpoints": [
      {
        "method": "POST",
        "path": "/api/canvas/export",
        "description": "Converts vector element JSON tree into lossless PNG or standalone SVG file",
        "authRequired": false,
        "requestPayload": "{ elements: CanvasElement[], exportType: 'svg' | 'png' }",
        "responseShape": "{ downloadUrl: string, dataUri: string }"
      }
    ],
    "schemas": [
      {
        "entity": "CanvasElement",
        "fields": [
          {
            "name": "id",
            "type": "string",
            "isPrimary": true
          },
          {
            "name": "type",
            "type": "enum (rectangle, ellipse, arrow, text, draw)"
          },
          {
            "name": "x",
            "type": "number"
          },
          {
            "name": "y",
            "type": "number"
          },
          {
            "name": "width",
            "type": "number"
          },
          {
            "name": "height",
            "type": "number"
          },
          {
            "name": "strokeColor",
            "type": "string"
          },
          {
            "name": "backgroundColor",
            "type": "string"
          },
          {
            "name": "roughness",
            "type": "number"
          }
        ],
        "relations": []
      }
    ],
    "obligations": [
      {
        "id": "obl-exc-1",
        "title": "Sub-16ms Frame Render Loop",
        "category": "core-logic",
        "description": "Redraw cycles must strictly stay within requestAnimationFrame budgets.",
        "parityWeight": 9,
        "status": "identified"
      }
    ],
    "metrics": {
      "totalComponents": 8,
      "totalEndpoints": 2,
      "parityScore": 95,
      "estimatedLOC": 1600,
      "cyclomaticComplexity": 18
    },
    "keyFindings": [
      "Double-buffered canvas rendering eliminates flickering during active dragging.",
      "Spatial bounding box calculation allows linear-time hit testing even with hundreds of shapes."
    ],
    "reconstructedOriginalCode": {
      "InfiniteCanvas.tsx": "// Reverse-engineered Excalidraw Infinite Canvas\nexport function InfiniteCanvas() { return <div>Canvas Engine</div>; }"
    }
  },
  {
    "id": "supabase",
    "targetId": "supabase",
    "name": "Supabase Cloud Studio & RLS Policy Manager",
    "targetName": "Supabase Cloud Studio & RLS Policy Manager",
    "category": "Database / Cloud Infrastructure",
    "sourceType": "web",
    "sourceUrl": "https://supabase.com",
    "description": "Visual relational database schema explorer, Monaco SQL execution console, and Row-Level Security rule constructor.",
    "analysisTimestamp": "2026-10-15T13:17:00Z",
    "reaVersion": "rea-agents v6.5.0 (MCP)",
    "detectedStack": {
      "framework": "Next.js 15 App Router",
      "runtime": "Node.js",
      "language": "TypeScript",
      "styling": "Modern Dark CSS",
      "bundler": "Turbopack"
    },
    "architectureTier": "Fullstack SSR / Edge",
    "summary": "Deconstructed cloud DB console with interactive table visualizer and automated RLS policy validator.",
    "components": [
      {
        "name": "SchemaExplorer",
        "type": "page",
        "file": "src/components/SchemaExplorer.tsx",
        "props": [
          "projectId"
        ],
        "stateHooks": [
          "useTableList",
          "useColumnSchema",
          "useForeignKeys"
        ],
        "dependencies": [
          "TableGrid",
          "SqlConsole"
        ],
        "responsibilities": "Visualizes Postgres tables, columns, constraints, foreign keys, and indexes.",
        "complexity": "high"
      },
      {
        "name": "RlsRuleBuilder",
        "type": "ui-component",
        "file": "src/components/RlsRuleBuilder.tsx",
        "props": [
          "table",
          "onSavePolicy"
        ],
        "stateHooks": [
          "useRoleSelection",
          "useSqlExpressionValidation"
        ],
        "dependencies": [],
        "responsibilities": "Provides point-and-click UI to construct Postgres RLS policies (SELECT, INSERT, UPDATE, DELETE for auth.uid()).",
        "complexity": "medium"
      }
    ],
    "endpoints": [
      {
        "method": "POST",
        "path": "/api/sql/run",
        "description": "Executes parameterized SQL command against project database with safety guards",
        "authRequired": true,
        "requestPayload": "{ query: string, readOnly: boolean }",
        "responseShape": "{ rows: any[], rowCount: number, durationMs: number }"
      }
    ],
    "schemas": [
      {
        "entity": "RlsPolicy",
        "fields": [
          {
            "name": "id",
            "type": "string",
            "isPrimary": true
          },
          {
            "name": "tableName",
            "type": "string"
          },
          {
            "name": "policyName",
            "type": "string"
          },
          {
            "name": "action",
            "type": "enum (ALL, SELECT, INSERT, UPDATE, DELETE)"
          },
          {
            "name": "roles",
            "type": "string[]"
          },
          {
            "name": "usingExpression",
            "type": "string"
          }
        ],
        "relations": []
      }
    ],
    "obligations": [
      {
        "id": "obl-sup-1",
        "title": "SQL Injection Pre-flight Guard",
        "category": "security",
        "description": "All raw queries must undergo AST analysis to prevent unauthorized multi-statement DDL execution.",
        "parityWeight": 10,
        "status": "identified"
      }
    ],
    "metrics": {
      "totalComponents": 12,
      "totalEndpoints": 5,
      "parityScore": 91,
      "estimatedLOC": 1720,
      "cyclomaticComplexity": 15
    },
    "keyFindings": [
      "Table grid rendering must use virtualized windowing to support 100k+ row datasets smoothly.",
      "RLS validation requires mock auth context testing before saving rules to production."
    ],
    "reconstructedOriginalCode": {
      "SchemaExplorer.tsx": "// Reverse-engineered Supabase Table Explorer\nexport function SchemaExplorer() { return <div>Schema Explorer</div>; }"
    }
  },
  {
    "id": "notion",
    "targetId": "notion",
    "name": "Notion Modular Block Document Studio",
    "targetName": "Notion Modular Block Document Studio",
    "category": "Content / Knowledge Base",
    "sourceType": "web",
    "sourceUrl": "https://notion.so",
    "description": "Block-based modular document editor with slash commands, nested hierarchies, callouts, and clean markdown export.",
    "analysisTimestamp": "2026-10-15T13:17:00Z",
    "reaVersion": "rea-agents v6.5.0 (MCP)",
    "detectedStack": {
      "framework": "React 19 / Next.js",
      "runtime": "Edge",
      "language": "TypeScript",
      "styling": "Vanilla CSS Design Tokens",
      "bundler": "Turbopack"
    },
    "architectureTier": "Fullstack SSR / Edge",
    "summary": "Deconstructed polymorphic document engine where every element is an atomic, re-orderable block with markdown parity.",
    "components": [
      {
        "name": "BlockEditor",
        "type": "page",
        "file": "src/components/BlockEditor.tsx",
        "props": [
          "documentId"
        ],
        "stateHooks": [
          "useBlockTree",
          "useSlashMenu",
          "useUndoStack"
        ],
        "dependencies": [
          "BlockItem",
          "SlashMenuPopup"
        ],
        "responsibilities": "Coordinates block list, drag handles, enter-to-create-block, and backspace-to-merge logic.",
        "complexity": "high"
      },
      {
        "name": "SlashMenuPopup",
        "type": "ui-component",
        "file": "src/components/SlashMenuPopup.tsx",
        "props": [
          "position",
          "filter",
          "onSelectType"
        ],
        "stateHooks": [
          "useSelectedBlockIndex"
        ],
        "dependencies": [
          "lucide-react"
        ],
        "responsibilities": "Displays floating menu when user types / to convert current block to Heading, Todo, Code, Quote, or Callout.",
        "complexity": "medium"
      }
    ],
    "endpoints": [
      {
        "method": "GET",
        "path": "/api/documents/:id",
        "description": "Retrieves recursive block tree for document with metadata",
        "authRequired": true,
        "responseShape": "{ document: Document, blocks: Block[] }"
      },
      {
        "method": "POST",
        "path": "/api/documents/export",
        "description": "Flattens block hierarchy into standard CommonMark markdown string",
        "authRequired": true,
        "requestPayload": "{ documentId: string }",
        "responseShape": "{ markdown: string, filename: string }"
      }
    ],
    "schemas": [
      {
        "entity": "Block",
        "fields": [
          {
            "name": "id",
            "type": "string",
            "isPrimary": true
          },
          {
            "name": "type",
            "type": "enum (p, h1, h2, h3, todo, code, quote, callout)"
          },
          {
            "name": "content",
            "type": "string"
          },
          {
            "name": "orderIndex",
            "type": "number"
          },
          {
            "name": "isCompleted",
            "type": "boolean",
            "isNullable": true
          },
          {
            "name": "parentBlockId",
            "type": "string",
            "isNullable": true
          }
        ],
        "relations": [
          "Document",
          "ChildBlocks[]"
        ]
      }
    ],
    "obligations": [
      {
        "id": "obl-not-1",
        "title": "Polymorphic Block Drag & Reorder",
        "category": "ui-flow",
        "description": "Drag-and-drop handles must re-parent blocks cleanly without full tree re-render.",
        "parityWeight": 8,
        "status": "identified"
      }
    ],
    "metrics": {
      "totalComponents": 10,
      "totalEndpoints": 4,
      "parityScore": 93,
      "estimatedLOC": 1390,
      "cyclomaticComplexity": 13
    },
    "keyFindings": [
      "Storing blocks as an indexed flat array with parent pointers is dramatically faster than deeply nested object trees.",
      "Keyboard shortcut capture must intercept Tab and Shift+Tab for indent / outdent operations."
    ],
    "reconstructedOriginalCode": {
      "BlockEditor.tsx": "// Reverse-engineered Notion Block Editor\nexport function BlockEditor() { return <div>Block Editor</div>; }"
    }
  }
];
