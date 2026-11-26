"use client";

import React from "react";
import {
  Sliders,
  Sparkles,
  Shield,
  Trash2,
  Plus,
  Zap,
  ArrowRight,
  Palette,
  Layers,
  Cpu,
  Check
} from "lucide-react";
import { ImprovementMatrix, REAAnalysisResult } from "@/types/rea";

interface ImproveAdjustViewProps {
  analysis: REAAnalysisResult;
  improvements: ImprovementMatrix;
  onChangeImprovements: (updated: ImprovementMatrix) => void;
  onSynthesize: () => void;
  isSynthesizing: boolean;
}

export function ImproveAdjustView({
  analysis,
  improvements,
  onChangeImprovements,
  onSynthesize,
  isSynthesizing
}: ImproveAdjustViewProps) {
  const toggleFeatureAdd = (key: keyof ImprovementMatrix["featuresToAdd"]) => {
    onChangeImprovements({
      ...improvements,
      featuresToAdd: {
        ...improvements.featuresToAdd,
        [key]: !improvements.featuresToAdd[key]
      }
    });
  };

  const toggleFeatureRemove = (key: keyof ImprovementMatrix["featuresToRemove"]) => {
    onChangeImprovements({
      ...improvements,
      featuresToRemove: {
        ...improvements.featuresToRemove,
        [key]: !improvements.featuresToRemove[key]
      }
    });
  };

  return (
    <div className="improve-panel">
      {/* Stage Header */}
      <div className="panel-header">
        <div className="pill-tag">
          <Sliders size={14} className="text-emerald" />
          <span>Stage 3: Evolution &amp; Adjustment Matrix</span>
        </div>
        <h2 className="panel-title">Customize, Modernize &amp; Improve {analysis.targetName}</h2>
        <p className="panel-subtitle">
          Configure exactly what changes, improvements, and feature additions you want applied to the deconstructed target. Modernize the tech stack, strip legacy bloat, add AI copilot capabilities, and fine-tune business logic.
        </p>
      </div>

      <div className="improve-grid">
        {/* Column 1: Tech Stack Modernization */}
        <div className="improve-card">
          <div className="card-header-row">
            <Layers size={18} className="text-cyan" />
            <h3 className="card-title">Target Tech Stack</h3>
          </div>
          <p className="card-desc">Select modern, high-performance foundations to replace legacy baggage.</p>

          <div className="stack-form">
            <div className="form-field">
              <label className="field-label">Framework / Architecture</label>
              <select
                value={improvements.targetStack.framework}
                onChange={(e: any) =>
                  onChangeImprovements({
                    ...improvements,
                    targetStack: { ...improvements.targetStack, framework: e.target.value }
                  })
                }
                className="select-field"
              >
                <option value="Next.js 15 (App Router)">Next.js 15 (App Router &amp; Turbopack)</option>
                <option value="Vite + React 19">Vite + React 19 (SPA High-Speed)</option>
                <option value="Remix Run">Remix Run (Standard Web API)</option>
                <option value="SvelteKit">SvelteKit (Zero Virtual DOM)</option>
              </select>
            </div>

            <div className="form-field">
              <label className="field-label">Language &amp; Type Safety</label>
              <select
                value={improvements.targetStack.language}
                onChange={(e: any) =>
                  onChangeImprovements({
                    ...improvements,
                    targetStack: { ...improvements.targetStack, language: e.target.value }
                  })
                }
                className="select-field"
              >
                <option value="TypeScript (Strict)">TypeScript (Strict &amp; Sound)</option>
                <option value="TypeScript + Zod">TypeScript + Zod Schema Validation</option>
                <option value="Modern JavaScript">Modern JavaScript (ESNext)</option>
              </select>
            </div>

            <div className="form-field">
              <label className="field-label">Styling Engine</label>
              <select
                value={improvements.targetStack.styling}
                onChange={(e: any) =>
                  onChangeImprovements({
                    ...improvements,
                    targetStack: { ...improvements.targetStack, styling: e.target.value }
                  })
                }
                className="select-field"
              >
                <option value="Vanilla Modern CSS (Design Tokens)">Vanilla Modern CSS (Design Tokens)</option>
                <option value="CSS Modules">CSS Modules (Scoped Components)</option>
                <option value="Tailwind CSS v4">Tailwind CSS v4</option>
              </select>
            </div>

            <div className="form-field">
              <label className="field-label">State Management</label>
              <select
                value={improvements.targetStack.stateManagement}
                onChange={(e: any) =>
                  onChangeImprovements({
                    ...improvements,
                    targetStack: { ...improvements.targetStack, stateManagement: e.target.value }
                  })
                }
                className="select-field"
              >
                <option value="Zustand">Zustand (Micro Reactive Store)</option>
                <option value="React Context + Hooks">React Context + Native Hooks</option>
                <option value="Jotai">Jotai (Atomic Primitives)</option>
                <option value="TanStack Query">TanStack Query (Server State Cache)</option>
              </select>
            </div>

            <div className="form-field">
              <label className="field-label">Persistence &amp; Storage</label>
              <select
                value={improvements.targetStack.database}
                onChange={(e: any) =>
                  onChangeImprovements({
                    ...improvements,
                    targetStack: { ...improvements.targetStack, database: e.target.value }
                  })
                }
                className="select-field"
              >
                <option value="SQLite (Drizzle ORM)">SQLite (Drizzle ORM — Zero Config)</option>
                <option value="PostgreSQL (Prisma)">PostgreSQL (Prisma Cloud Schema)</option>
                <option value="Browser IndexedDB + LocalStorage">Browser IndexedDB + LocalStorage</option>
              </select>
            </div>
          </div>
        </div>

        {/* Column 2: New Capabilities & Feature Additions */}
        <div className="improve-card">
          <div className="card-header-row">
            <Sparkles size={18} className="text-emerald" />
            <h3 className="card-title">Feature Additions</h3>
          </div>
          <p className="card-desc">Inject state-of-the-art modern capabilities into the re-engineered codebase.</p>

          <div className="toggles-list">
            <label className="toggle-item">
              <input
                type="checkbox"
                checked={improvements.featuresToAdd.aiCopilot}
                onChange={() => toggleFeatureAdd("aiCopilot")}
                className="checkbox-custom"
              />
              <div className="toggle-text">
                <strong>Embedded AI Copilot &amp; Assistant</strong>
                <span>Real-time contextual suggestions and automated code synthesis</span>
              </div>
            </label>

            <label className="toggle-item">
              <input
                type="checkbox"
                checked={improvements.featuresToAdd.realtimeSync}
                onChange={() => toggleFeatureAdd("realtimeSync")}
                className="checkbox-custom"
              />
              <div className="toggle-text">
                <strong>Optimistic State &amp; Offline Sync</strong>
                <span>Instant sub-16ms UI updates with background delta reconciliation</span>
              </div>
            </label>

            <label className="toggle-item">
              <input
                type="checkbox"
                checked={improvements.featuresToAdd.multiTenantAuth}
                onChange={() => toggleFeatureAdd("multiTenantAuth")}
                className="checkbox-custom"
              />
              <div className="toggle-text">
                <strong>Multi-Tenant Auth &amp; RBAC</strong>
                <span>Role-based permissions (Admin, Member, Guest) with session tokens</span>
              </div>
            </label>

            <label className="toggle-item">
              <input
                type="checkbox"
                checked={improvements.featuresToAdd.exportReporting}
                onChange={() => toggleFeatureAdd("exportReporting")}
                className="checkbox-custom"
              />
              <div className="toggle-text">
                <strong>Forensic Report &amp; Data Export</strong>
                <span>One-click CSV, Markdown, and JSON briefings generation</span>
              </div>
            </label>

            <label className="toggle-item">
              <input
                type="checkbox"
                checked={improvements.featuresToAdd.darkModeToggle}
                onChange={() => toggleFeatureAdd("darkModeToggle")}
                className="checkbox-custom"
              />
              <div className="toggle-text">
                <strong>Theme Switcher (Obsidian / Titanium / Radiant)</strong>
                <span>Smooth transitions with system preference auto-detection</span>
              </div>
            </label>

            <label className="toggle-item">
              <input
                type="checkbox"
                checked={improvements.featuresToAdd.rateLimiting}
                onChange={() => toggleFeatureAdd("rateLimiting")}
                className="checkbox-custom"
              />
              <div className="toggle-text">
                <strong>Edge Rate Limiting &amp; DoS Protection</strong>
                <span>Token-bucket rate limiter at edge gateway boundary</span>
              </div>
            </label>
          </div>
        </div>

        {/* Column 3: Bloat Removal & Custom Behavioral Prompts */}
        <div className="improve-card">
          <div className="card-header-row">
            <Trash2 size={18} className="text-danger" />
            <h3 className="card-title">Strip Bloat &amp; Legacy Polyfills</h3>
          </div>
          <p className="card-desc">Purge unneeded dependencies for maximum runtime speed.</p>

          <div className="toggles-list mb-4">
            <label className="toggle-item">
              <input
                type="checkbox"
                checked={improvements.featuresToRemove.legacyPolyfills}
                onChange={() => toggleFeatureRemove("legacyPolyfills")}
                className="checkbox-custom"
              />
              <div className="toggle-text">
                <strong>Strip Legacy Polyfills &amp; Wrappers</strong>
                <span>Eliminate Babel core-js polyfills and outdated DOM fallbacks</span>
              </div>
            </label>

            <label className="toggle-item">
              <input
                type="checkbox"
                checked={improvements.featuresToRemove.thirdPartyAnalytics}
                onChange={() => toggleFeatureRemove("thirdPartyAnalytics")}
                className="checkbox-custom"
              />
              <div className="toggle-text">
                <strong>Purge Invasive 3rd-Party Telemetry</strong>
                <span>Zero analytics trackers or vendor beacons for complete privacy</span>
              </div>
            </label>
          </div>

          <div className="card-header-row mt-4">
            <Palette size={18} className="text-violet" />
            <h3 className="card-title">Design System Aesthetic</h3>
          </div>
          <div className="aesthetic-row">
            {[
              "Cyberpunk Neon",
              "Dark Titanium Minimal",
              "Radiant Glassmorphism",
              "Enterprise High-Contrast"
            ].map((theme) => (
              <button
                key={theme}
                onClick={() =>
                  onChangeImprovements({ ...improvements, designAesthetic: theme as any })
                }
                className={`aesthetic-pill ${
                  improvements.designAesthetic === theme ? "active" : ""
                }`}
              >
                {theme}
              </button>
            ))}
          </div>

          <div className="mt-4">
            <label className="field-label">Custom Behavioral Rules &amp; Logic Changes</label>
            <textarea
              rows={3}
              value={improvements.customAdjustments}
              onChange={(e) =>
                onChangeImprovements({ ...improvements, customAdjustments: e.target.value })
              }
              placeholder="e.g. Change pricing to credit-based tokens; Make all tasks auto-save to IndexedDB; Add keyboard shortcut J/K for task navigation..."
              className="custom-rules-textarea"
            />
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="panel-footer">
        <div className="footer-note">
          Ready to synthesize full production-grade codebase with all specified improvements.
        </div>
        <button
          onClick={onSynthesize}
          disabled={isSynthesizing}
          className="btn-synthesize"
        >
          {isSynthesizing ? (
            <>
              <span className="spinner-sm"></span>
              <span>Synthesizing Reconstructed Project...</span>
            </>
          ) : (
            <>
              <Sparkles size={18} />
              <span>Synthesize &amp; Create Improved Codebase</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
