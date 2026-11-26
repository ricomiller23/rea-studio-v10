"use client";

import React from "react";
import { Download, Sliders, Cpu, Sparkles, Check, ArrowRight } from "lucide-react";

export type StageId = 1 | 2 | 3 | 4;

interface StageIndicatorProps {
  currentStage: StageId;
  onSelectStage: (stage: StageId) => void;
  maxUnlockedStage: StageId;
}

export function StageIndicator({
  currentStage,
  onSelectStage,
  maxUnlockedStage
}: StageIndicatorProps) {
  const stages = [
    {
      id: 1 as StageId,
      label: "1. Target Ingest",
      desc: "Source & Spec Selection",
      icon: Download
    },
    {
      id: 2 as StageId,
      label: "2. Reverse Engineer",
      desc: "REA Deep Extraction",
      icon: Cpu
    },
    {
      id: 3 as StageId,
      label: "3. Improve & Adjust",
      desc: "Evolution & Stack Deltas",
      icon: Sliders
    },
    {
      id: 4 as StageId,
      label: "4. Create & Synthesize",
      desc: "Codebase & Live Preview",
      icon: Sparkles
    }
  ];

  return (
    <div className="stepper-container">
      {stages.map((stage, idx) => {
        const Icon = stage.icon;
        const isActive = currentStage === stage.id;
        const isCompleted = currentStage > stage.id;
        const isUnlocked = stage.id <= maxUnlockedStage;

        return (
          <React.Fragment key={stage.id}>
            <button
              onClick={() => isUnlocked && onSelectStage(stage.id)}
              disabled={!isUnlocked}
              className={`step-btn ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""} ${
                !isUnlocked ? "locked" : ""
              }`}
            >
              <div className="step-icon-wrapper">
                {isCompleted ? (
                  <Check size={16} className="text-emerald" />
                ) : (
                  <Icon size={16} />
                )}
              </div>
              <div className="step-text-wrapper">
                <span className="step-title">{stage.label}</span>
                <span className="step-desc">{stage.desc}</span>
              </div>
            </button>
            {idx < stages.length - 1 && (
              <div className={`step-connector ${currentStage > stage.id ? "active" : ""}`}>
                <ArrowRight size={14} />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
