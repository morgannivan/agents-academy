"use client";

import {
  Globe,
  MessageSquare,
  Hash,
  Send,
  Gamepad2,
  Smartphone,
  MessageCircle,
  Server,
  Lock,
} from "lucide-react";
import { channels, type ChannelDefinition } from "@/lib/deploy/channels";
import type { DeployChannel } from "@/lib/deploy/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  MessageSquare,
  Hash,
  Send,
  Gamepad2,
  Smartphone,
  MessageCircle,
  Server,
};

interface ChannelPickerProps {
  selected: DeployChannel | null;
  onSelect: (channel: DeployChannel) => void;
}

export default function ChannelPicker({
  selected,
  onSelect,
}: ChannelPickerProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {channels.map((ch: ChannelDefinition) => {
        const Icon = iconMap[ch.icon] ?? Globe;
        const isSelected = selected === ch.id;
        const disabled = ch.comingSoon;

        return (
          <button
            key={ch.id}
            disabled={disabled}
            onClick={() => onSelect(ch.id)}
            className={`relative flex flex-col items-start gap-3 rounded-xl border p-5 text-left transition-all ${
              disabled
                ? "cursor-not-allowed border-zinc-800 bg-zinc-900/50 opacity-50"
                : isSelected
                  ? "border-emerald-500 bg-zinc-900 ring-1 ring-emerald-500/30"
                  : "border-zinc-800 bg-zinc-900 hover:border-emerald-500/50"
            }`}
          >
            {disabled && (
              <div className="absolute right-3 top-3">
                <Lock className="h-4 w-4 text-zinc-600" />
              </div>
            )}

            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                disabled
                  ? "bg-zinc-800 text-zinc-600"
                  : isSelected
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-zinc-800 text-zinc-400"
              }`}
            >
              <Icon className="h-5 w-5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3
                  className={`text-sm font-semibold ${disabled ? "text-zinc-600" : "text-zinc-100"}`}
                >
                  {ch.name}
                </h3>
                {disabled && (
                  <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                    Soon
                  </span>
                )}
              </div>
              <p
                className={`mt-1 text-xs leading-relaxed ${disabled ? "text-zinc-700" : "text-zinc-500"}`}
              >
                {ch.description}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
