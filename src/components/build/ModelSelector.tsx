"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Lock, Cpu } from "lucide-react";
import {
  ModelTier,
  getAvailableModels,
  getModelConfig,
  type ModelConfig,
} from "@/lib/models/tiers";
import { getProviderForModel } from "@/lib/models/providers";

// All models in ascending tier order for display.
const ALL_MODELS: ModelConfig[] = [
  ...getAvailableModels(ModelTier.ENTERPRISE),
];

const TIER_LABELS: Record<ModelTier, string> = {
  [ModelTier.FREE]: "Free",
  [ModelTier.PRO]: "Pro",
  [ModelTier.CERTIFIED]: "Certified",
  [ModelTier.ENTERPRISE]: "Enterprise",
};

const UPGRADE_CTA: Record<ModelTier, string> = {
  [ModelTier.FREE]: "",
  [ModelTier.PRO]: "Upgrade to Pro",
  [ModelTier.CERTIFIED]: "Upgrade to Certified",
  [ModelTier.ENTERPRISE]: "Upgrade to Enterprise",
};

interface ModelSelectorProps {
  /** The user's current tier — controls which models are selectable. */
  userTier?: ModelTier;
  /** Currently selected model id. */
  value?: string;
  /** Callback when the user selects a model. */
  onChange?: (modelId: string) => void;
}

export default function ModelSelector({
  userTier = ModelTier.FREE,
  value,
  onChange,
}: ModelSelectorProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selected = value ? getModelConfig(value) : ALL_MODELS[0];
  const selectedProvider = selected
    ? getProviderForModel(selected.id)
    : undefined;

  const handleSelect = (model: ModelConfig, allowed: boolean) => {
    if (!allowed) return;
    onChange?.(model.id);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-72">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 transition-colors hover:border-zinc-500"
      >
        <span className="flex items-center gap-2">
          <Cpu className="h-4 w-4 text-emerald-400" />
          {selected ? (
            <>
              {selected.name}
              <span className="text-xs text-zinc-500">
                {selectedProvider?.name}
              </span>
            </>
          ) : (
            "Select model"
          )}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-zinc-500 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <ul className="absolute z-50 mt-1 max-h-80 w-full overflow-y-auto rounded-lg border border-zinc-700 bg-zinc-900 py-1 shadow-xl">
          {ALL_MODELS.map((model) => {
            const allowed = getAvailableModels(userTier).some(
              (m) => m.id === model.id,
            );
            const provider = getProviderForModel(model.id);

            return (
              <li key={model.id} className="relative">
                <button
                  type="button"
                  onClick={() => handleSelect(model, allowed)}
                  disabled={!allowed}
                  className={`group flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors ${
                    allowed
                      ? "text-zinc-100 hover:bg-zinc-800"
                      : "cursor-not-allowed text-zinc-600"
                  } ${selected?.id === model.id ? "bg-zinc-800" : ""}`}
                >
                  <span className="flex items-center gap-2">
                    <span>{model.name}</span>
                    <span className="text-xs text-zinc-500">
                      {provider?.name}
                    </span>
                  </span>

                  {allowed ? (
                    <span className="text-[10px] text-zinc-500">
                      {TIER_LABELS[model.tier]}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Lock className="h-3 w-3 text-zinc-600" />
                      {/* Tooltip on hover */}
                      <span className="pointer-events-none absolute right-0 top-full z-50 mt-1 hidden whitespace-nowrap rounded-md bg-zinc-800 px-2 py-1 text-xs text-amber-400 shadow-lg group-hover:block">
                        {UPGRADE_CTA[model.tier]}
                      </span>
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
