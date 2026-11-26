"use client";

import React, { useState, useEffect } from "react";
import {
  Download,
  FileCode,
  Check,
  Copy,
  Play,
  Layers,
  Sparkles,
  GitBranch,
  Terminal,
  ExternalLink,
  Eye,
  CheckCircle2,
  RefreshCw
} from "lucide-react";
import JSZip from "jszip";
import confetti from "canvas-confetti";
import { ReconstructedProject, GeneratedFile } from "@/types/rea";
import { WorkspaceApp } from "./WorkspaceApp";

interface CreateSynthesizeViewProps {
  project: ReconstructedProject;
  onRestart: () => void;
}

export function CreateSynthesizeView({ project, onRestart }: CreateSynthesizeViewProps) {
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [copiedFile, setCopiedFile] = useState(false);
  const [activeTab, setActiveTab] = useState<"code" | "sandbox" | "diffs">("sandbox");
  const [isZipping, setIsZipping] = useState(false);

  useEffect(() => {
    // Fire celebratory confetti on initial synthesis
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  }, []);

  const currentFile = project.files[selectedFileIndex] || project.files[0];

  const handleCopyCode = () => {
    if (!currentFile) return;
    navigator.clipboard.writeText(currentFile.content);
    setCopiedFile(true);
    setTimeout(() => setCopiedFile(false), 2000);
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();
      project.files.forEach((file) => {
        zip.file(file.path, file.content);
      });

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${project.targetName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-improved.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("ZIP export error:", err);
    } finally {
      setIsZipping(false);
    }
  };

  const handleExportBlueprint = () => {
    const mdContent = `# REA Reverse Engineering Blueprint: ${project.targetName}
Generated on: ${project.timestamp}
REA Version: rea-agents v6.5.0 MCP

## Applied Improvements & Modernizations
${project.improvementsApplied.map((imp) => `- ${imp}`).join("\n")}

## Reconstructed Codebase Files (${project.files.length} total)
${project.files.map((f) => `### \`${f.path}\` (${f.description})\n\`\`\`${f.language}\n${f.content}\n\`\`\``).join("\n\n")}
`;
    const blob = new Blob([mdContent], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${project.targetName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-rea-blueprint.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="create-panel">
      {/* Top Banner */}
      <div className="create-hero-banner">
        <div className="hero-left">
          <div className="pill-tag">
            <Sparkles size={14} className="text-emerald" />
            <span>Stage 4: Synthesis Complete</span>
          </div>
          <h2 className="hero-title">{project.targetName} Re-Engineered &amp; Ready</h2>
          <p className="hero-sub">
            {project.summary} Every file has been synthesized with sound TypeScript types, reactive state hooks, and zero legacy baggage.
          </p>
        </div>

        <div className="hero-actions">
          <button
            onClick={handleDownloadZip}
            disabled={isZipping}
            className="btn-download-zip"
          >
            <Download size={18} />
            <span>{isZipping ? "Packaging ZIP..." : "Download Project (.ZIP)"}</span>
          </button>
          <button onClick={handleExportBlueprint} className="btn-export-spec">
            <FileCode size={16} />
            <span>Export Blueprint (.md)</span>
          </button>
          <button onClick={onRestart} className="btn-secondary-restart">
            <RefreshCw size={14} />
            <span>New Target</span>
          </button>
        </div>
      </div>

      {/* View Switcher Tabs */}
      <div className="view-tabs-bar">
        <button
          onClick={() => setActiveTab("sandbox")}
          className={`view-tab ${activeTab === "sandbox" ? "active" : ""}`}
        >
          <Play size={16} className="text-emerald" />
          <span>Live Interactive Sandbox Simulator</span>
        </button>
        <button
          onClick={() => setActiveTab("code")}
          className={`view-tab ${activeTab === "code" ? "active" : ""}`}
        >
          <Terminal size={16} />
          <span>Interactive Code Explorer ({project.files.length} Files)</span>
        </button>
        <button
          onClick={() => setActiveTab("diffs")}
          className={`view-tab ${activeTab === "diffs" ? "active" : ""}`}
        >
          <Layers size={16} />
          <span>Original vs. Improved Diffs</span>
        </button>
      </div>

      {/* Main View Area */}
      <div className="view-content-wrapper">
        {/* Sandbox Tab */}
        {activeTab === "sandbox" && (
          <div className="sandbox-container">
            <div className="sandbox-chrome">
              <div className="browser-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="browser-url-bar">
                <ExternalLink size={12} className="text-muted" />
                <span>localhost:3000 — {project.targetName} (Live Reconstructed Environment)</span>
              </div>
              <div className="badge-live">
                <span className="pulse-green"></span>
                <span>LIVE SANDBOX ACTIVE</span>
              </div>
            </div>

            <div className="sandbox-body">
              <WorkspaceApp />
            </div>
          </div>
        )}

        {/* Code Explorer Tab */}
        {activeTab === "code" && (
          <div className="code-explorer-grid">
            {/* Left File Tree */}
            <div className="file-tree-panel">
              <div className="tree-header">
                <span>PROJECT REPOSITORY</span>
                <span className="file-count-badge">{project.files.length} files</span>
              </div>
              <div className="tree-list">
                {project.files.map((file, idx) => (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFileIndex(idx)}
                    className={`tree-item ${selectedFileIndex === idx ? "active" : ""}`}
                  >
                    <FileCode size={14} className="text-muted" />
                    <span className="tree-item-name">{file.name}</span>
                    <span className="tree-item-lang">{file.language}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Code Viewer */}
            <div className="code-viewer-panel">
              <div className="code-header">
                <div className="code-header-left">
                  <span className="file-active-path">{currentFile.path}</span>
                  <span className="file-desc-pill">{currentFile.description}</span>
                </div>
                <button onClick={handleCopyCode} className="copy-btn">
                  {copiedFile ? (
                    <>
                      <Check size={14} className="text-emerald" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              <div className="code-block-wrapper">
                <pre className="code-pre">
                  <code>{currentFile.content}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Diffs Tab */}
        {activeTab === "diffs" && (
          <div className="diffs-container">
            <div className="diffs-intro">
              <h3>Evolution &amp; Architectural Transformation Log</h3>
              <p className="text-muted">
                Compare how REA extracted the original target code versus the reconstructed modern implementation.
              </p>
            </div>

            <div className="diffs-list">
              {project.originalVsImprovedDiffs.map((diff, idx) => (
                <div key={idx} className="diff-card">
                  <div className="diff-header">
                    <h4 className="diff-scope">{diff.file}</h4>
                    <span className="diff-rationale">{diff.rationale}</span>
                  </div>
                  <div className="diff-split">
                    <div className="diff-side original">
                      <div className="diff-side-title text-danger">Original / Legacy Architecture</div>
                      <pre className="diff-pre">{diff.original}</pre>
                    </div>
                    <div className="diff-side improved">
                      <div className="diff-side-title text-emerald">Reconstructed &amp; Improved Codebase</div>
                      <pre className="diff-pre">{diff.improved}</pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
