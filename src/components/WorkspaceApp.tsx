"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Search,
  Plus,
  CheckCircle2,
  Clock,
  Shield,
  Zap,
  Download,
  Terminal,
  Filter,
  Layers,
  ArrowRight,
  Sliders,
  Check
} from "lucide-react";

export function WorkspaceApp() {
  const [items, setItems] = useState([
    {
      id: "TSK-01",
      title: "Optimistic Transaction Dispatcher",
      status: "active",
      priority: "urgent",
      category: "Core Engine",
      updatedAt: "Just now"
    },
    {
      id: "TSK-02",
      title: "Bi-directional WebSocket Sync Pipeline",
      status: "in_review",
      priority: "high",
      category: "Real-time",
      updatedAt: "12m ago"
    },
    {
      id: "TSK-03",
      title: "Client-Side Zero-Latency State Cache",
      status: "completed",
      priority: "medium",
      category: "Performance",
      updatedAt: "1h ago"
    },
    {
      id: "TSK-04",
      title: "Multi-Tenant RBAC Session Guard",
      status: "active",
      priority: "high",
      category: "Security",
      updatedAt: "2h ago"
    }
  ]);
  const [search, setSearch] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiInsight, setAiInsight] = useState<string | null>(null);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newItem = {
      id: `TSK-0${items.length + 1}`,
      title: newTitle.trim(),
      status: "active" as const,
      priority: "high" as const,
      category: "Feature",
      updatedAt: "Just now"
    };
    setItems([newItem, ...items]);
    setNewTitle("");
  };

  const toggleStatus = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "completed" ? "active" : "completed" }
          : item
      )
    );
  };

  const handleRunAiInsight = () => {
    if (!aiPrompt.trim()) return;
    setAiInsight(
      `⚡ REA AI Copilot: Analyzing requested behavior: "${aiPrompt}". Recommended architecture enhancement: Implement asynchronous mutation pipelining with deterministic rollback vectors. Parity target achieved at 99.4% precision.`
    );
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = selectedFilter === "all" || item.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="workspace-container">
      {/* Top Banner & Control Bar */}
      <header className="workspace-header">
        <div className="workspace-title-group">
          <div className="workspace-icon-pill">
            <Zap size={14} className="text-emerald" />
            <span className="badge-text">Live Reconstructed Engine</span>
          </div>
          <h2 className="app-heading">Operational Task &amp; Feature Workspace</h2>
          <p className="app-subtext">
            Executing with Next.js 15 &amp; Vanilla Modern CSS Tokens (Zero External Bloat)
          </p>
        </div>

        <div className="workspace-actions">
          <button
            onClick={() => setShowAiModal(!showAiModal)}
            className="btn-glow-emerald"
          >
            <Sparkles size={16} />
            <span>AI Copilot</span>
          </button>
        </div>
      </header>

      {/* AI Assistant Drawer */}
      {showAiModal && (
        <section className="ai-copilot-card">
          <div className="ai-header">
            <div className="flex-row items-center gap-2">
              <Sparkles size={16} className="text-emerald" />
              <strong>REA Integrated AI Copilot</strong>
            </div>
            <button onClick={() => setShowAiModal(false)} className="close-btn">&times;</button>
          </div>
          <div className="ai-body">
            <p className="text-muted text-sm">
              Instruct the embedded assistant to synthesize new business logic, optimize data flows, or execute schema adjustments:
            </p>
            <div className="ai-input-row">
              <input
                type="text"
                placeholder="e.g. Add real-time user presence indicators or auto-summarize completed tasks"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="input-field"
              />
              <button onClick={handleRunAiInsight} className="btn-primary">
                Analyze
              </button>
            </div>
            {aiInsight && (
              <div className="ai-response-box">
                {aiInsight}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Controls: Search, Filters, New Item */}
      <div className="toolbar-row">
        <div className="search-bar">
          <Search size={16} className="text-muted" />
          <input
            type="text"
            placeholder="Search tasks, features, or architecture components..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="transparent-input"
          />
        </div>

        <div className="filter-group">
          {["all", "active", "completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedFilter(tab)}
              className={`filter-tab ${selectedFilter === tab ? "active" : ""}`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Creator Form */}
      <form onSubmit={handleAddItem} className="create-item-form">
        <input
          type="text"
          placeholder="Add an actionable feature, task, or bug fix..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="create-input"
        />
        <button type="submit" className="btn-add">
          <Plus size={16} />
          <span>Add Task</span>
        </button>
      </form>

      {/* Item List */}
      <div className="items-grid">
        {filteredItems.map((item) => (
          <div key={item.id} className={`item-card ${item.status}`}>
            <div className="item-header">
              <span className="item-id">{item.id}</span>
              <span className={`priority-badge ${item.priority}`}>
                {item.priority.toUpperCase()}
              </span>
            </div>
            <h3 className="item-title">{item.title}</h3>
            <div className="item-footer">
              <span className="category-tag">{item.category}</span>
              <button
                onClick={() => toggleStatus(item.id)}
                className={`status-toggle-btn ${item.status}`}
              >
                <CheckCircle2 size={14} />
                <span>{item.status === "completed" ? "Completed" : "Mark Done"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
