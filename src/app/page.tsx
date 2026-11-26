"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { StageIndicator, StageId } from "@/components/StageIndicator";
import { TargetIngestView } from "@/components/TargetIngestView";
import { ReverseEngineerView } from "@/components/ReverseEngineerView";
import { ImproveAdjustView } from "@/components/ImproveAdjustView";
import { CreateSynthesizeView } from "@/components/CreateSynthesizeView";
import { PRESET_TARGETS } from "@/lib/presets";
import {
  REAAnalysisResult,
  ImprovementMatrix,
  ReconstructedProject,
  TargetInputMode
} from "@/types/rea";

export default function Home() {
  const [currentStage, setCurrentStage] = useState<StageId>(1);
  const [maxUnlockedStage, setMaxUnlockedStage] = useState<StageId>(1);
  const [selectedPresetId, setSelectedPresetId] = useState("linear");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  // Default preset pre-load
  const defaultPreset = PRESET_TARGETS[0];
  const [analysis, setAnalysis] = useState<REAAnalysisResult>({
    targetId: defaultPreset.id,
    targetName: defaultPreset.name,
    analysisTimestamp: defaultPreset.analysisTimestamp,
    reaVersion: defaultPreset.reaVersion,
    summary: defaultPreset.summary,
    architectureTier: defaultPreset.architectureTier,
    components: defaultPreset.components,
    endpoints: defaultPreset.endpoints,
    schemas: defaultPreset.schemas,
    obligations: defaultPreset.obligations,
    metrics: defaultPreset.metrics,
    keyFindings: defaultPreset.keyFindings,
    reconstructedOriginalCode: defaultPreset.reconstructedOriginalCode
  });

  const [improvements, setImprovements] = useState<ImprovementMatrix>({
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
    customAdjustments: ""
  });

  const [project, setProject] = useState<ReconstructedProject | null>(null);

  const handleSelectPreset = (id: string) => {
    setSelectedPresetId(id);
    const found = PRESET_TARGETS.find((p) => p.id === id);
    if (found) {
      setAnalysis({
        targetId: found.id,
        targetName: found.name,
        analysisTimestamp: found.analysisTimestamp,
        reaVersion: found.reaVersion,
        summary: found.summary,
        architectureTier: found.architectureTier,
        components: found.components,
        endpoints: found.endpoints,
        schemas: found.schemas,
        obligations: found.obligations,
        metrics: found.metrics,
        keyFindings: found.keyFindings,
        reconstructedOriginalCode: found.reconstructedOriginalCode
      });
    }
  };

  const handleAnalyze = async (target: {
    type: TargetInputMode;
    name: string;
    url?: string;
    description?: string;
    rawInput?: string;
  }) => {
    setIsAnalyzing(true);
    try {
      const res = await fetch("/api/rea/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(target)
      });
      const data = await res.json();
      if (data.success && data.analysis) {
        setAnalysis(data.analysis);
        setCurrentStage(2);
        if (maxUnlockedStage < 2) setMaxUnlockedStage(2);
      }
    } catch (err) {
      console.error("Analysis error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleProceedToImprove = () => {
    setCurrentStage(3);
    if (maxUnlockedStage < 3) setMaxUnlockedStage(3);
  };

  const handleSynthesize = async () => {
    setIsSynthesizing(true);
    try {
      const res = await fetch("/api/rea/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analysis, improvements })
      });
      const data = await res.json();
      if (data.success && data.project) {
        setProject(data.project);
        setCurrentStage(4);
        if (maxUnlockedStage < 4) setMaxUnlockedStage(4);
      }
    } catch (err) {
      console.error("Synthesis error:", err);
    } finally {
      setIsSynthesizing(false);
    }
  };

  const handleRestart = () => {
    setCurrentStage(1);
  };

  return (
    <div className="app-shell">
      <Header
        onSelectPreset={handleSelectPreset}
        selectedPresetId={selectedPresetId}
      />

      <main className="app-main-content">
        <StageIndicator
          currentStage={currentStage}
          onSelectStage={(s) => setCurrentStage(s)}
          maxUnlockedStage={maxUnlockedStage}
        />

        <div className="stage-view-wrapper">
          {currentStage === 1 && (
            <TargetIngestView
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
              selectedPresetId={selectedPresetId}
              onSelectPreset={handleSelectPreset}
            />
          )}

          {currentStage === 2 && (
            <ReverseEngineerView
              analysis={analysis}
              onProceedToImprove={handleProceedToImprove}
            />
          )}

          {currentStage === 3 && (
            <ImproveAdjustView
              analysis={analysis}
              improvements={improvements}
              onChangeImprovements={setImprovements}
              onSynthesize={handleSynthesize}
              isSynthesizing={isSynthesizing}
            />
          )}

          {currentStage === 4 && project && (
            <CreateSynthesizeView
              project={project}
              onRestart={handleRestart}
            />
          )}
        </div>
      </main>

      <footer className="app-footer">
        <div className="footer-inner">
          <span className="footer-copy">
            REA Studio &bull; Built with Google Antigravity &bull; Reverse Engineer Anything v6.5.0 MCP Protocol
          </span>
          <div className="footer-links">
            <span className="footer-link">MCP Certified</span>
            <span className="footer-link">Local-First Static AST</span>
            <span className="footer-link">Zero Third-Party Telemetry</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
