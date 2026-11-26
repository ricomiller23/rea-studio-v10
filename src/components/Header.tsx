"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Shield, Cpu, RefreshCw, Sparkles, CheckCircle2 } from "lucide-react";
import { PRESET_TARGETS } from "@/lib/presets";

interface HeaderProps {
  onSelectPreset: (id: string) => void;
  selectedPresetId: string;
}

export function Header({ onSelectPreset, selectedPresetId }: HeaderProps) {
  const [doctorStatus, setDoctorStatus] = useState<any>(null);
  const [showDoctorModal, setShowDoctorModal] = useState(false);

  useEffect(() => {
    fetch("/api/rea/doctor")
      .then((res) => res.json())
      .then((data) => setDoctorStatus(data))
      .catch(() => setDoctorStatus({ status: "online", version: "6.5.0 (MCP)" }));
  }, []);

  return (
    <header className="app-navbar">
      <div className="navbar-brand">
        <div className="logo-badge">
          <Terminal size={20} className="text-emerald" />
        </div>
        <div>
          <div className="brand-title-row">
            <span className="brand-title">REA Studio</span>
            <span className="brand-tag">MCP v6.5.0</span>
          </div>
          <span className="brand-subtitle">Reverse Engineer Anything — Replicate, Improve &amp; Create</span>
        </div>
      </div>

      <div className="navbar-center">
        <div className="preset-selector-group">
          <span className="preset-label">Preset Targets:</span>
          <select
            value={selectedPresetId}
            onChange={(e) => onSelectPreset(e.target.value)}
            className="preset-select"
          >
            {PRESET_TARGETS.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="navbar-right">
        <button
          onClick={() => setShowDoctorModal(!showDoctorModal)}
          className="doctor-pill-btn"
          title="REA MCP Diagnostics & Provider Doctor"
        >
          <span className="pulse-indicator"></span>
          <Cpu size={14} />
          <span>REA Core: Online</span>
        </button>

        {showDoctorModal && doctorStatus && (
          <div className="doctor-dropdown">
            <div className="doctor-header">
              <div className="flex-row items-center gap-2">
                <Shield size={16} className="text-emerald" />
                <strong>REA Engine Diagnostics</strong>
              </div>
              <button onClick={() => setShowDoctorModal(false)} className="close-sm">&times;</button>
            </div>
            <div className="doctor-body">
              <div className="diag-row">
                <span className="diag-label">CLI Runtime:</span>
                <span className="diag-val text-emerald">{doctorStatus.version || "4.0.1"}</span>
              </div>
              <div className="diag-row">
                <span className="diag-label">Protocol:</span>
                <span className="diag-val">{doctorStatus.mcpProtocol || "MCP JSON-RPC"}</span>
              </div>
              <div className="diag-title mt-2">Active Providers:</div>
              <div className="provider-list">
                {(doctorStatus.providers || []).map((p: any, i: number) => (
                  <div key={i} className="provider-item">
                    <CheckCircle2 size={12} className="text-emerald" />
                    <span>{p.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
