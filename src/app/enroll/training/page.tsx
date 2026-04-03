"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import TrainingDashboard from "@/components/training/TrainingDashboard";

const DOMAIN = "Customer Support";

export default function TrainingPage() {
  const [running, setRunning] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
        <div>
          <h1 className="text-lg font-semibold text-zinc-100">
            Training Dashboard
          </h1>
          <p className="text-xs text-zinc-500">
            Watch your agent improve in real time
          </p>
        </div>

        {!running && (
          <button
            onClick={() => setRunning(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
          >
            <Play className="h-4 w-4" />
            Start Training
          </button>
        )}
      </header>

      {/* Dashboard or empty state */}
      <main className="flex-1">
        {running ? (
          <TrainingDashboard domain={DOMAIN} running={running} />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 p-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
              <Play className="h-8 w-8 text-emerald-400" />
            </div>
            <h2 className="text-xl font-semibold text-zinc-200">
              Ready to Train
            </h2>
            <p className="max-w-md text-sm text-zinc-500">
              This will run 50 training katas for a{" "}
              <strong className="text-zinc-300">{DOMAIN}</strong> agent,
              evaluating skills like greeting, error handling, escalation, and
              more.
            </p>
            <button
              onClick={() => setRunning(true)}
              className="mt-2 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
            >
              <Play className="h-4 w-4" />
              Start Training
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
