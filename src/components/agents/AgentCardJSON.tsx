"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Copy, Check } from "lucide-react";
import type { A2AAgentCard } from "@/lib/agents/types";

/* ------------------------------------------------------------------
 *  Minimal JSON syntax highlighter – zero extra dependencies.
 *  Outputs an array of <span> elements with Tailwind colour classes.
 * ------------------------------------------------------------------ */

function highlightJSON(json: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // Match JSON tokens: strings, numbers, booleans/null, structural chars
  const tokenRe =
    /("(?:\\.|[^"\\])*")\s*(:)?|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|(\btrue\b|\bfalse\b|\bnull\b)|([[\]{}:,])|(\s+)/g;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = tokenRe.exec(json)) !== null) {
    const [full, str, colon, num, keyword, punct, ws] = match;
    if (str) {
      // Differentiate keys (followed by `:`) from string values
      if (colon) {
        nodes.push(
          <span key={i++} className="text-sky-400">
            {str}
          </span>,
        );
        nodes.push(
          <span key={i++} className="text-zinc-500">
            {colon}
          </span>,
        );
      } else {
        nodes.push(
          <span key={i++} className="text-emerald-400">
            {str}
          </span>,
        );
      }
    } else if (num) {
      nodes.push(
        <span key={i++} className="text-amber-400">
          {full}
        </span>,
      );
    } else if (keyword) {
      nodes.push(
        <span key={i++} className="text-purple-400">
          {full}
        </span>,
      );
    } else if (punct) {
      nodes.push(
        <span key={i++} className="text-zinc-500">
          {full}
        </span>,
      );
    } else if (ws) {
      nodes.push(<span key={i++}>{full}</span>);
    }
  }

  return nodes;
}

/* ------------------------------------------------------------------ */

export default function AgentCardJSON({ card }: { card: A2AAgentCard }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const raw = JSON.stringify(card, null, 2);

  function handleCopy() {
    navigator.clipboard.writeText(raw).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900">
      {/* Toggle header */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-2 px-5 py-4 text-left text-sm font-medium text-zinc-200 transition-colors hover:text-zinc-50"
      >
        {open ? (
          <ChevronDown className="h-4 w-4 text-emerald-500" />
        ) : (
          <ChevronRight className="h-4 w-4 text-emerald-500" />
        )}
        A2A Agent Card
        <span className="ml-auto text-xs text-zinc-500">JSON</span>
      </button>

      {/* Collapsible body */}
      {open && (
        <div className="relative border-t border-zinc-800">
          <button
            type="button"
            onClick={handleCopy}
            className="absolute right-3 top-3 rounded-lg border border-zinc-700 bg-zinc-800 p-1.5 text-zinc-400 transition-colors hover:text-zinc-200"
            aria-label="Copy JSON"
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-400" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
          <pre className="overflow-x-auto p-5 text-[13px] leading-6">
            <code>{highlightJSON(raw)}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
