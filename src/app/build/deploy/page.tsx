"use client";

import { useState, useCallback } from "react";
import { Rocket, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ChannelPicker from "@/components/deploy/ChannelPicker";
import DeployStatusPanel from "@/components/deploy/DeployStatus";
import { channels } from "@/lib/deploy/channels";
import { DeployChannel } from "@/lib/deploy/types";
import type { DeployStatus, DeployConfig, ChannelConfig } from "@/lib/deploy/types";
import { deployToAPI } from "@/lib/deploy/api-deploy";
import { deployToWidget } from "@/lib/deploy/widget-deploy";

export default function DeployPage() {
  const [selectedChannel, setSelectedChannel] = useState<DeployChannel | null>(
    null,
  );
  const [configValues, setConfigValues] = useState<Record<string, string>>({});
  const [deployStatus, setDeployStatus] = useState<DeployStatus | null>(null);

  const channelDef = selectedChannel
    ? channels.find((c) => c.id === selectedChannel)
    : null;

  const handleChannelSelect = useCallback((channel: DeployChannel) => {
    setSelectedChannel(channel);
    setConfigValues({});
    setDeployStatus(null);
  }, []);

  const handleConfigChange = useCallback((name: string, value: string) => {
    setConfigValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleDeploy = useCallback(async () => {
    if (!selectedChannel) return;

    const config: DeployConfig = {
      channel: selectedChannel,
      agentId: "my-agent",
      config: { channel: selectedChannel, ...configValues } as ChannelConfig,
    };

    setDeployStatus({
      id: "pending",
      channel: selectedChannel,
      status: "deploying",
      url: "",
      createdAt: new Date(),
    });

    try {
      let result: DeployStatus;
      if (selectedChannel === DeployChannel.API) {
        result = await deployToAPI(config);
      } else {
        result = await deployToWidget(config);
      }
      setDeployStatus(result);
    } catch {
      setDeployStatus({
        id: "error",
        channel: selectedChannel,
        status: "failed",
        url: "",
        createdAt: new Date(),
      });
    }
  }, [selectedChannel, configValues]);

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-800 px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center gap-4">
          <Link
            href="/build"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-200"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20">
              <Rocket className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-zinc-100">
                Deploy Agent
              </h1>
              <p className="text-xs text-zinc-500">
                Choose a channel and go live
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        {/* Step 1 — Channel selection */}
        <section>
          <h2 className="mb-1 text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Step 1
          </h2>
          <p className="mb-6 text-lg font-medium text-zinc-100">
            Select a deploy channel
          </p>
          <ChannelPicker
            selected={selectedChannel}
            onSelect={handleChannelSelect}
          />
        </section>

        {/* Step 2 — Configuration */}
        {channelDef && (
          <section className="mt-12">
            <h2 className="mb-1 text-sm font-semibold uppercase tracking-wider text-zinc-500">
              Step 2
            </h2>
            <p className="mb-6 text-lg font-medium text-zinc-100">
              Configure {channelDef.name}
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {channelDef.configFields.map((field) => (
                <div key={field.name}>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                    {field.label}
                  </label>
                  {field.type === "select" ? (
                    <select
                      value={
                        configValues[field.name] ??
                        (field.defaultValue as string) ??
                        ""
                      }
                      onChange={(e) =>
                        handleConfigChange(field.name, e.target.value)
                      }
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none transition-colors focus:border-emerald-500"
                    >
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={
                        configValues[field.name] ??
                        (field.defaultValue != null
                          ? String(field.defaultValue)
                          : "")
                      }
                      onChange={(e) =>
                        handleConfigChange(field.name, e.target.value)
                      }
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-emerald-500"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Deploy button */}
            <button
              onClick={handleDeploy}
              disabled={deployStatus?.status === "deploying"}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Rocket className="h-4 w-4" />
              {deployStatus?.status === "deploying"
                ? "Deploying…"
                : "Deploy Now"}
            </button>
          </section>
        )}

        {/* Step 3 — Status */}
        {deployStatus && (
          <section className="mt-12">
            <h2 className="mb-1 text-sm font-semibold uppercase tracking-wider text-zinc-500">
              Step 3
            </h2>
            <p className="mb-6 text-lg font-medium text-zinc-100">
              Deployment Status
            </p>
            <DeployStatusPanel status={deployStatus} />
          </section>
        )}
      </main>
    </div>
  );
}
