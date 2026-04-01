"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Headphones,
  Microscope,
  Server,
  TrendingUp,
  Plus,
} from "lucide-react";
import { TEAM_TEMPLATES } from "@/lib/composition/templates";
import { MOCK_AGENTS } from "@/lib/agents/mock-agents";
import type { TeamTemplate, TemplateSlot } from "@/lib/composition/types";
import type { AgentProfile } from "@/lib/agents/types";
import TeamNode from "@/components/composition/TeamNode";
import TeamConnection from "@/components/composition/TeamConnection";
import CompositeScore from "@/components/composition/CompositeScore";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const TEMPLATE_ICONS: Record<string, typeof Bot> = {
  "customer-support-team": Headphones,
  "research-team": Microscope,
  "devops-team": Server,
  "sales-team": TrendingUp,
};

const DOMAIN_COLORS: Record<string, string> = {
  "Customer Support": "from-pink-500/10 to-transparent",
  Research: "from-violet-500/10 to-transparent",
  DevOps: "from-sky-500/10 to-transparent",
  Sales: "from-amber-500/10 to-transparent",
};

/* ------------------------------------------------------------------ */
/*  Slot state: each slot tracks the assigned agent (or null)          */
/* ------------------------------------------------------------------ */

interface SlotState {
  slot: TemplateSlot;
  agent: AgentProfile | null;
}

/* ------------------------------------------------------------------ */
/*  Node position helpers (CSS-grid positions → SVG coords)            */
/* ------------------------------------------------------------------ */

const NODE_WIDTH = 176; // w-44
const NODE_HEIGHT = 170;
const GRID_GAP = 48;

function nodeCenter(index: number, total: number) {
  // Lay out in a single row; each cell = NODE_WIDTH + GRID_GAP
  const totalWidth = total * NODE_WIDTH + (total - 1) * GRID_GAP;
  const startX = (800 - totalWidth) / 2; // centred in 800px SVG
  return {
    x: startX + index * (NODE_WIDTH + GRID_GAP) + NODE_WIDTH / 2,
    y: NODE_HEIGHT / 2,
  };
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ComposePage() {
  const [activeTemplate, setActiveTemplate] = useState<TeamTemplate | null>(
    null,
  );
  const [slots, setSlots] = useState<SlotState[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  /* ---- Template selection ---- */
  function selectTemplate(tpl: TeamTemplate) {
    setActiveTemplate(tpl);
    setSlots(
      tpl.members.map((slot) => {
        const suggested = slot.suggestedAgentId
          ? MOCK_AGENTS.find((a) => a.id === slot.suggestedAgentId) ?? null
          : null;
        return { slot, agent: suggested };
      }),
    );
    setSelectedSlot(null);
  }

  /* ---- Assign agent to slot ---- */
  function assignAgent(slotIdx: number, agent: AgentProfile) {
    setSlots((prev) =>
      prev.map((s, i) => (i === slotIdx ? { ...s, agent } : s)),
    );
    setSelectedSlot(null);
  }

  /* ---- Add an empty slot ---- */
  function addSlot() {
    if (!activeTemplate) return;
    setSlots((prev) => [
      ...prev,
      {
        slot: {
          role: "Custom",
          domain: activeTemplate.domain,
          requiredTier: "bronze",
        },
        agent: null,
      },
    ]);
  }

  /* ---- Sidebar agents (match domain) ---- */
  const sidebarAgents = activeTemplate
    ? MOCK_AGENTS.filter(
        (a) =>
          a.domain.toLowerCase() === activeTemplate.domain.toLowerCase() ||
          a.certifications.some(
            (c) =>
              c.domain.toLowerCase() === activeTemplate.domain.toLowerCase(),
          ),
      )
    : MOCK_AGENTS;

  /* ---- Composite score data ---- */
  const scoreData = slots
    .filter((s) => s.agent)
    .map((s) => ({
      name: s.agent!.name,
      score: s.agent!.stats.averageScore,
    }));

  return (
    <>
      {/* ---- Nav ---- */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-zinc-50"
          >
            agents<span className="text-emerald-500">.academy</span>
          </Link>
          <span className="text-sm text-zinc-400">Compose</span>
        </nav>
      </header>

      <main className="flex-1">
        {/* ---- Hero ---- */}
        <section className="relative overflow-hidden border-b border-zinc-800">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.06),transparent_50%)]" />
          <div className="relative mx-auto max-w-5xl px-6 py-16 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-500">
              Agent Composition
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-zinc-50 sm:text-4xl">
              Build Multi-Agent Teams
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              Select a team template, fill each role with a certified agent, and
              deploy a coordinated team that works together.
            </p>
          </div>
        </section>

        {/* ---- Template Cards ---- */}
        <section className="border-b border-zinc-800 bg-zinc-900/40">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <h2 className="text-lg font-semibold text-zinc-100">
              Team Templates
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Choose a starting template for your multi-agent team.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {TEAM_TEMPLATES.map((tpl) => {
                const Icon = TEMPLATE_ICONS[tpl.id] ?? Bot;
                const active = activeTemplate?.id === tpl.id;
                return (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => selectTemplate(tpl)}
                    className={`group relative rounded-2xl border p-6 text-left transition-all ${
                      active
                        ? "border-emerald-500 bg-emerald-950/20 shadow-lg shadow-emerald-500/5"
                        : "border-zinc-800 bg-zinc-900 hover:border-zinc-700"
                    }`}
                  >
                    <div
                      className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br ${
                        DOMAIN_COLORS[tpl.domain] ?? ""
                      }`}
                    />
                    <div className="relative">
                      <Icon
                        className={`h-7 w-7 ${active ? "text-emerald-400" : "text-zinc-500 group-hover:text-zinc-300"}`}
                      />
                      <h3 className="mt-4 text-base font-semibold text-zinc-100">
                        {tpl.name}
                      </h3>
                      <p className="mt-1.5 text-xs leading-5 text-zinc-500">
                        {tpl.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {tpl.members.map((m) => (
                          <span
                            key={m.role}
                            className="rounded-full bg-zinc-800/80 px-2 py-0.5 text-[10px] font-medium text-zinc-400"
                          >
                            {m.role}
                          </span>
                        ))}
                      </div>
                      <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-emerald-500">
                        {active ? "Selected" : "Use Template"}
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---- Team Builder ---- */}
        {activeTemplate && (
          <section className="mx-auto max-w-7xl px-6 py-14">
            {/* Composite score */}
            <div className="mb-10 max-w-md">
              <CompositeScore
                agents={scoreData}
                teamName={activeTemplate.name}
              />
            </div>

            <div className="flex gap-8">
              {/* ---- Visual builder (grid + SVG connections) ---- */}
              <div className="flex-1 overflow-x-auto">
                <h2 className="mb-6 text-lg font-semibold text-zinc-100">
                  Team Layout
                </h2>

                {/* SVG connection layer */}
                <div className="relative">
                  <svg
                    className="absolute inset-0 pointer-events-none"
                    width="100%"
                    height={NODE_HEIGHT}
                    viewBox={`0 0 800 ${NODE_HEIGHT}`}
                    preserveAspectRatio="xMidYMid meet"
                  >
                    {slots.map((_, i) => {
                      if (i === slots.length - 1) return null;
                      const from = nodeCenter(i, slots.length);
                      const to = nodeCenter(i + 1, slots.length);
                      return (
                        <TeamConnection
                          key={`conn-${i}`}
                          x1={from.x + NODE_WIDTH / 2 - 10}
                          y1={from.y}
                          x2={to.x - NODE_WIDTH / 2 + 10}
                          y2={to.y}
                          type="delegates_to"
                        />
                      );
                    })}
                  </svg>

                  {/* Node grid */}
                  <div className="relative z-10 flex flex-wrap justify-center gap-6">
                    {slots.map((s, i) => (
                      <TeamNode
                        key={`${s.slot.role}-${i}`}
                        name={s.agent?.name}
                        role={s.slot.role}
                        certTier={
                          s.agent
                            ? (s.agent.certifications[0]?.tier ?? undefined)
                            : undefined
                        }
                        score={s.agent?.stats.averageScore}
                        selected={selectedSlot === i}
                        onAdd={() => setSelectedSlot(i)}
                      />
                    ))}

                    {/* Add slot button */}
                    <button
                      type="button"
                      onClick={addSlot}
                      className="flex w-44 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-zinc-700 p-5 text-zinc-500 transition-colors hover:border-emerald-500/50 hover:text-emerald-400"
                    >
                      <Plus className="h-6 w-6" />
                      <span className="text-xs font-medium">Add Slot</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* ---- Sidebar: available agents ---- */}
              <aside className="w-72 shrink-0">
                <h2 className="text-sm font-semibold text-zinc-100">
                  {selectedSlot !== null
                    ? `Agents for "${slots[selectedSlot]?.slot.role}"`
                    : "Available Agents"}
                </h2>
                <p className="mt-1 text-xs text-zinc-500">
                  {selectedSlot !== null
                    ? "Click an agent to assign it to the selected slot."
                    : "Select a slot first, then pick an agent."}
                </p>

                <div className="mt-4 space-y-3">
                  {sidebarAgents.map((agent) => {
                    const cert = agent.certifications[0];
                    return (
                      <button
                        key={agent.id}
                        type="button"
                        disabled={selectedSlot === null}
                        onClick={() =>
                          selectedSlot !== null &&
                          assignAgent(selectedSlot, agent)
                        }
                        className={`w-full rounded-xl border p-3 text-left transition-all ${
                          selectedSlot !== null
                            ? "border-zinc-800 bg-zinc-900 hover:border-emerald-500/50 cursor-pointer"
                            : "border-zinc-800/50 bg-zinc-900/50 opacity-60 cursor-not-allowed"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 ring-1 ring-zinc-700">
                            <Bot className="h-4 w-4 text-emerald-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-zinc-200">
                              {agent.name}
                            </p>
                            <p className="text-[10px] text-zinc-500">
                              {agent.domain}
                            </p>
                          </div>
                        </div>
                        {cert && (
                          <div className="mt-2 flex items-center gap-2 text-[10px]">
                            <span className="font-bold uppercase tracking-wider text-amber-400">
                              {cert.tier}
                            </span>
                            <span className="tabular-nums text-zinc-500">
                              {cert.score.toFixed(1)}
                            </span>
                          </div>
                        )}
                      </button>
                    );
                  })}

                  {sidebarAgents.length === 0 && (
                    <p className="text-xs text-zinc-600">
                      No matching agents found for this domain.
                    </p>
                  )}
                </div>
              </aside>
            </div>
          </section>
        )}

        {/* ---- Empty state ---- */}
        {!activeTemplate && (
          <section className="mx-auto max-w-3xl px-6 py-24 text-center">
            <Bot className="mx-auto h-12 w-12 text-zinc-700" />
            <p className="mt-4 text-zinc-500">
              Select a team template above to start composing your multi-agent
              team.
            </p>
          </section>
        )}
      </main>
    </>
  );
}
