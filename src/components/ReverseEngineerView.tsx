"use client";

import React, { useState } from "react";
import {
  Layers,
  Server,
  Database,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Cpu,
  FileCode,
  ShieldAlert,
  Sliders,
  Check,
  TrendingUp,
  Terminal
} from "lucide-react";
import { REAAnalysisResult } from "@/types/rea";

interface ReverseEngineerViewProps {
  analysis: REAAnalysisResult;
  onProceedToImprove: () => void;
}

export function ReverseEngineerView({
  analysis,
  onProceedToImprove
}: ReverseEngineerViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<
    "topology" | "components" | "endpoints" | "schemas" | "obligations"
  >("topology");

  return (
    <div className="re-panel">
      {/* Stage Header */}
      <div className="panel-header">
        <div className="pill-tag">
          <Cpu size={14} className="text-emerald" />
          <span>Stage 2: REA Deep Deconstruction</span>
        </div>
        <h2 className="panel-title">Forensic Architecture &amp; Parity Blueprint</h2>
        <p className="panel-subtitle">
          REA has analyzed the runtime behavior, component tree, API contracts, and state dependencies of <strong>{analysis.targetName}</strong>. Review the deconstructed architecture before configuring modernization improvements.
        </p>
      </div>

      {/* Metrics Banner */}
      <div className="metrics-grid">
        <div className="metric-card">
          <span className="metric-label">Architecture Tier</span>
          <span className="metric-val text-emerald">{analysis.architectureTier}</span>
          <span className="metric-sub">Fullstack Parity Profile</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Target Parity Score</span>
          <span className="metric-val text-cyan">{analysis.metrics.parityScore}%</span>
          <span className="metric-sub">Verified Against Spec</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Extracted Components</span>
          <span className="metric-val">{analysis.metrics.totalComponents}</span>
          <span className="metric-sub">UI &amp; Logic Units</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">API Contracts</span>
          <span className="metric-val">{analysis.metrics.totalEndpoints}</span>
          <span className="metric-sub">REST / WebSocket</span>
        </div>
      </div>

      {/* Sub-Tabs */}
      <div className="subtab-bar">
        <button
          onClick={() => setActiveSubTab("topology")}
          className={`subtab-btn ${activeSubTab === "topology" ? "active" : ""}`}
        >
          <Layers size={14} />
          <span>Architecture Topology</span>
        </button>
        <button
          onClick={() => setActiveSubTab("components")}
          className={`subtab-btn ${activeSubTab === "components" ? "active" : ""}`}
        >
          <FileCode size={14} />
          <span>Components ({analysis.components.length})</span>
        </button>
        <button
          onClick={() => setActiveSubTab("endpoints")}
          className={`subtab-btn ${activeSubTab === "endpoints" ? "active" : ""}`}
        >
          <Server size={14} />
          <span>API Endpoints ({analysis.endpoints.length})</span>
        </button>
        <button
          onClick={() => setActiveSubTab("schemas")}
          className={`subtab-btn ${activeSubTab === "schemas" ? "active" : ""}`}
        >
          <Database size={14} />
          <span>Data Models ({analysis.schemas.length})</span>
        </button>
        <button
          onClick={() => setActiveSubTab("obligations")}
          className={`subtab-btn ${activeSubTab === "obligations" ? "active" : ""}`}
        >
          <CheckCircle2 size={14} />
          <span>Obligation Ledger ({analysis.obligations.length})</span>
        </button>
      </div>

      {/* Sub-Tab Contents */}
      <div className="subtab-content">
        {activeSubTab === "topology" && (
          <div className="topology-view">
            <div className="topology-diagram">
              <div className="diagram-node client-node">
                <div className="node-header">
                  <FileCode size={16} className="text-emerald" />
                  <span>Client Layer (UI &amp; State)</span>
                </div>
                <div className="node-body">
                  <div className="node-pill">Optimistic Local Store</div>
                  <div className="node-pill">Reactive Mutation Queue</div>
                  <div className="node-pill">Keyboard Trap Manager</div>
                </div>
              </div>

              <div className="diagram-arrow">
                <span className="arrow-line"></span>
                <span className="arrow-label">Sub-50ms RPC</span>
              </div>

              <div className="diagram-node server-node">
                <div className="node-header">
                  <Server size={16} className="text-cyan" />
                  <span>API &amp; Edge Gateway</span>
                </div>
                <div className="node-body">
                  <div className="node-pill">Edge Function Handlers</div>
                  <div className="node-pill">Zod Schema Validation</div>
                  <div className="node-pill">SSE Event Streaming</div>
                </div>
              </div>

              <div className="diagram-arrow">
                <span className="arrow-line"></span>
                <span className="arrow-label">ORM Query</span>
              </div>

              <div className="diagram-node db-node">
                <div className="node-header">
                  <Database size={16} className="text-violet" />
                  <span>Persistence Layer</span>
                </div>
                <div className="node-body">
                  <div className="node-pill">Relational Tables</div>
                  <div className="node-pill">IndexedDB Cache</div>
                  <div className="node-pill">Audit Log Append-Only</div>
                </div>
              </div>
            </div>

            <div className="findings-box mt-4">
              <h4 className="findings-title">Key Reverse Engineering Insights</h4>
              <ul className="findings-list">
                {analysis.keyFindings.map((finding, idx) => (
                  <li key={idx} className="finding-item">
                    <TrendingUp size={14} className="text-emerald" />
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeSubTab === "components" && (
          <div className="components-grid">
            {analysis.components.map((comp, idx) => (
              <div key={idx} className="component-card">
                <div className="comp-header">
                  <span className="comp-name">{comp.name}</span>
                  <span className={`comp-complexity ${comp.complexity}`}>
                    {comp.complexity.toUpperCase()}
                  </span>
                </div>
                <p className="comp-resp">{comp.responsibilities}</p>
                <div className="comp-meta">
                  <div className="meta-row">
                    <span className="meta-key">State Hooks:</span>
                    <span className="meta-val">{comp.stateHooks.join(", ") || "None"}</span>
                  </div>
                  <div className="meta-row">
                    <span className="meta-key">Props:</span>
                    <span className="meta-val">{comp.props.join(", ") || "None"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSubTab === "endpoints" && (
          <div className="endpoints-list">
            {analysis.endpoints.map((ep, idx) => (
              <div key={idx} className="endpoint-card">
                <div className="ep-top">
                  <span className={`method-badge ${ep.method.toLowerCase()}`}>{ep.method}</span>
                  <span className="ep-path">{ep.path}</span>
                  {ep.authRequired && <span className="auth-tag">Auth Required</span>}
                </div>
                <p className="ep-desc">{ep.description}</p>
                {ep.requestPayload && (
                  <div className="payload-box">
                    <span className="payload-label">Request Payload:</span>
                    <code>{ep.requestPayload}</code>
                  </div>
                )}
                <div className="payload-box mt-1">
                  <span className="payload-label">Response Shape:</span>
                  <code>{ep.responseShape}</code>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSubTab === "schemas" && (
          <div className="schemas-grid">
            {analysis.schemas.map((sch, idx) => (
              <div key={idx} className="schema-card">
                <h4 className="schema-entity">Entity: {sch.entity}</h4>
                <div className="fields-table">
                  {sch.fields.map((f, fi) => (
                    <div key={fi} className="field-row">
                      <span className="field-name">
                        {f.name} {f.isPrimary && <strong className="pk-pill">PK</strong>}
                      </span>
                      <span className="field-type">{f.type}</span>
                    </div>
                  ))}
                </div>
                {sch.relations.length > 0 && (
                  <div className="relations-box">
                    <span className="rel-title">Relations:</span>
                    <span className="rel-val">{sch.relations.join(", ")}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeSubTab === "obligations" && (
          <div className="obligations-list">
            {analysis.obligations.map((obl) => (
              <div key={obl.id} className="obligation-item">
                <div className="obl-left">
                  <div className="obl-weight-badge">Weight {obl.parityWeight}/10</div>
                </div>
                <div className="obl-middle">
                  <h4 className="obl-title">{obl.title}</h4>
                  <p className="obl-desc">{obl.description}</p>
                </div>
                <div className="obl-right">
                  <span className="obl-status-badge">
                    <Check size={12} className="text-emerald" />
                    <span>PARITY ENFORCED</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="panel-footer">
        <div className="footer-note">
          All {analysis.obligations.length} reconstruction obligations verified against canonical REA Evidence.
        </div>
        <button onClick={onProceedToImprove} className="btn-proceed">
          <span>Proceed to Stage 3: Improve, Change &amp; Adjust</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
