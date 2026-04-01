"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Copy, Check, XCircle } from "lucide-react";
import type { DeployStatus as DeployStatusType } from "@/lib/deploy/types";
import { DeployChannel } from "@/lib/deploy/types";
import { getEmbedSnippet } from "@/lib/deploy/widget-deploy";

interface DeployStatusProps {
  status: DeployStatusType;
}

export default function DeployStatus({ status }: DeployStatusProps) {
  const [copied, setCopied] = useState(false);

  const isWidget = status.channel === DeployChannel.WEB_WIDGET;
  const copyValue = isWidget
    ? getEmbedSnippet(status.url.split("/").pop() ?? "agent")
    : status.url;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(copyValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex items-center gap-3">
        {status.status === "deploying" && (
          <>
            <Loader2 className="h-5 w-5 animate-spin text-amber-400" />
            <span className="text-sm font-medium text-amber-400">
              Deploying&hellip;
            </span>
          </>
        )}

        {status.status === "live" && (
          <>
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">Live</span>
          </>
        )}

        {status.status === "failed" && (
          <>
            <XCircle className="h-5 w-5 text-red-400" />
            <span className="text-sm font-medium text-red-400">
              Deployment failed
            </span>
          </>
        )}
      </div>

      {status.status === "live" && (
        <div className="mt-4">
          <label className="mb-1.5 block text-xs font-medium text-zinc-500">
            {isWidget ? "Embed Snippet" : "Endpoint URL"}
          </label>
          <div className="flex items-center gap-2">
            <code className="flex-1 overflow-x-auto rounded-lg bg-zinc-950 px-3 py-2 text-xs text-zinc-300">
              {copyValue}
            </code>
            <button
              onClick={handleCopy}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-200"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-400" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
          <p className="mt-2 text-xs text-zinc-600">
            Deployed at{" "}
            {status.createdAt.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}
