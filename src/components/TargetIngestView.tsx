"use client";

import React, { useState } from "react";
import {
  GitBranch,
  Globe,
  UploadCloud,
  FileCode,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Box,
  Layers,
  Zap,
  Terminal
} from "lucide-react";
import { PRESET_TARGETS, PresetTarget } from "@/lib/presets";
import { SoftwareTarget, TargetInputMode } from "@/types/rea";

interface TargetIngestViewProps {
  onAnalyze: (target: {
    type: TargetInputMode;
    name: string;
    url?: string;
    description?: string;
    rawInput?: string;
  }) => void;
  isAnalyzing: boolean;
  selectedPresetId: string;
  onSelectPreset: (id: string) => void;
}

export function TargetIngestView({
  onAnalyze,
  isAnalyzing,
  selectedPresetId,
  onSelectPreset
}: TargetIngestViewProps) {
  const [activeTab, setActiveTab] = useState<TargetInputMode>("preset");
  const [githubUrl, setGithubUrl] = useState("https://github.com/shadcn/taxonomy");
  const [webUrl, setWebUrl] = useState("https://linear.app");
  const [promptText, setPromptText] = useState(
    "A high-velocity keyboard-driven Kanban issue tracking application with optimistic UI updates, cycle planning, and offline sync."
  );
  const [appName, setAppName] = useState("");
  const [bundleFileName, setBundleFileName] = useState<string | null>(null);

  const selectedPreset = PRESET_TARGETS.find((p) => p.id === selectedPresetId) || PRESET_TARGETS[0];

  const handleLaunch = () => {
    if (activeTab === "preset") {
      onAnalyze({
        type: "preset",
        name: selectedPreset.name,
        url: selectedPreset.sourceUrl,
        description: selectedPreset.description
      });
    } else if (activeTab === "github") {
      onAnalyze({
        type: "github",
        name: appName || githubUrl.split("/").pop() || "GitHub Project",
        url: githubUrl,
        description: `Reverse engineering GitHub repository at ${githubUrl}`
      });
    } else if (activeTab === "web") {
      onAnalyze({
        type: "web",
        name: appName || new URL(webUrl).hostname,
        url: webUrl,
        description: `Reverse engineering live web application at ${webUrl}`
      });
    } else if (activeTab === "prompt") {
      onAnalyze({
        type: "prompt",
        name: appName || "Custom Software Architecture",
        description: promptText
      });
    } else if (activeTab === "bundle") {
      onAnalyze({
        type: "bundle",
        name: bundleFileName || "Uploaded JS/ASAR Bundle",
        description: "Reverse engineering uploaded bundle archive via REA AST decompiler"
      });
    }
  };

  return (
    <div className="ingest-panel">
      {/* Stage Header */}
      <div className="panel-header">
        <div className="pill-tag">
          <Terminal size={14} className="text-emerald" />
          <span>Stage 1: Target Ingestion</span>
        </div>
        <h2 className="panel-title">What software do you want replicated &amp; improved?</h2>
        <p className="panel-subtitle">
          Point REA to any existing codebase, live web application, bundle, or architectural specification. REA deconstructs its runtime behavior, extracts the component hierarchy, API contracts, and produces an actionable parity blueprint.
        </p>
      </div>

      {/* Input Modality Tabs */}
      <div className="modality-tabs">
        <button
          onClick={() => setActiveTab("preset")}
          className={`modality-tab ${activeTab === "preset" ? "active" : ""}`}
        >
          <Box size={16} />
          <span>Preset Archetypes (6)</span>
        </button>
        <button
          onClick={() => setActiveTab("github")}
          className={`modality-tab ${activeTab === "github" ? "active" : ""}`}
        >
          <GitBranch size={16} />
          <span>GitHub Repository</span>
        </button>
        <button
          onClick={() => setActiveTab("web")}
          className={`modality-tab ${activeTab === "web" ? "active" : ""}`}
        >
          <Globe size={16} />
          <span>Live Web App URL</span>
        </button>
        <button
          onClick={() => setActiveTab("prompt")}
          className={`modality-tab ${activeTab === "prompt" ? "active" : ""}`}
        >
          <FileCode size={16} />
          <span>Prompt / Feature Spec</span>
        </button>
        <button
          onClick={() => setActiveTab("bundle")}
          className={`modality-tab ${activeTab === "bundle" ? "active" : ""}`}
        >
          <UploadCloud size={16} />
          <span>Bundle Upload (.js / .asar)</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="tab-content-card">
        {activeTab === "preset" && (
          <div className="presets-grid">
            {PRESET_TARGETS.map((preset) => {
              const isSelected = preset.id === selectedPresetId;
              return (
                <div
                  key={preset.id}
                  onClick={() => onSelectPreset(preset.id)}
                  className={`preset-card ${isSelected ? "selected" : ""}`}
                >
                  <div className="preset-card-top">
                    <span className="preset-category">{preset.category}</span>
                    <span className="parity-badge">{preset.metrics.parityScore}% Parity</span>
                  </div>
                  <h3 className="preset-name">{preset.name}</h3>
                  <p className="preset-desc">{preset.description}</p>
                  <div className="preset-stack-pills">
                    <span className="stack-pill">{preset.detectedStack?.framework}</span>
                    <span className="stack-pill">{preset.detectedStack?.language}</span>
                    <span className="stack-pill">{preset.architectureTier}</span>
                  </div>
                  {isSelected && (
                    <div className="selected-marker">
                      <CheckCircle2 size={16} className="text-emerald" />
                      <span>Selected for REA Pipeline</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "github" && (
          <div className="custom-input-form">
            <div className="form-group">
              <label className="form-label">Public GitHub Repository URL</label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/organization/repo"
                className="form-input"
              />
              <span className="form-hint">REA clones and scans repo AST, routes, component exports, and dependencies.</span>
            </div>
            <div className="form-group">
              <label className="form-label">Application Name (Optional)</label>
              <input
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                placeholder="e.g. NextJS Taxonomy Modernized"
                className="form-input"
              />
            </div>
          </div>
        )}

        {activeTab === "web" && (
          <div className="custom-input-form">
            <div className="form-group">
              <label className="form-label">Target Web Application URL</label>
              <input
                type="url"
                value={webUrl}
                onChange={(e) => setWebUrl(e.target.value)}
                placeholder="https://example.app"
                className="form-input"
              />
              <span className="form-hint">REA executes a bounded CDP probe to capture bundle scripts, CSS styles, and API calls.</span>
            </div>
            <div className="form-group">
              <label className="form-label">Target Application Name (Optional)</label>
              <input
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                placeholder="e.g. Linear Task Hub"
                className="form-input"
              />
            </div>
          </div>
        )}

        {activeTab === "prompt" && (
          <div className="custom-input-form">
            <div className="form-group">
              <label className="form-label">Application Name</label>
              <input
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                placeholder="e.g. Real-Time Crypto Trading Terminal"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Detailed Feature &amp; Architectural Specification</label>
              <textarea
                rows={5}
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="Describe every core view, user interaction, data model, and API requirement..."
                className="form-textarea"
              />
            </div>
          </div>
        )}

        {activeTab === "bundle" && (
          <div className="bundle-upload-box">
            <UploadCloud size={40} className="text-muted mb-2" />
            <h4 className="upload-heading">Drag &amp; drop bundle archive here</h4>
            <p className="upload-sub">Supports .js bundles, .zip source trees, .asar Electron packages, or .wasm binaries</p>
            <input
              type="file"
              id="bundleFileInput"
              className="hidden-file-input"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setBundleFileName(e.target.files[0].name);
                }
              }}
            />
            <label htmlFor="bundleFileInput" className="btn-secondary-upload">
              Browse Local File
            </label>
            {bundleFileName && (
              <div className="selected-file-badge">
                <FileCode size={16} className="text-emerald" />
                <span>Selected: {bundleFileName}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Launch Trigger Footer */}
      <div className="ingest-footer">
        <div className="target-summary-pill">
          <span className="text-muted">Target Ready:</span>
          <strong>
            {activeTab === "preset"
              ? selectedPreset.name
              : appName || (activeTab === "github" ? githubUrl : activeTab === "web" ? webUrl : "Custom Target")}
          </strong>
        </div>

        <button
          onClick={handleLaunch}
          disabled={isAnalyzing}
          className="btn-launch-rea"
        >
          {isAnalyzing ? (
            <>
              <span className="spinner-sm"></span>
              <span>Running REA Deconstruction...</span>
            </>
          ) : (
            <>
              <Zap size={18} />
              <span>Launch REA Reverse Engineering Engine</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
