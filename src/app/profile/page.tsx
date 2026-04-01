import { User, Star, Download, Award, Bot } from "lucide-react";
import Badge from "@/components/ui/Badge";
import DomainBadge from "@/components/ui/DomainBadge";

const stats = [
  { label: "Agents Built", value: "12", icon: Bot },
  { label: "Total Downloads", value: "3.4k", icon: Download },
  { label: "Avg Rating", value: "4.7", icon: Star },
  { label: "Certifications", value: "3", icon: Award },
];

const badges = [
  { name: "Early Builder", variant: "success" as const },
  { name: "Top Contributor", variant: "premium" as const },
  { name: "Security Expert", variant: "warning" as const },
  { name: "Community Hero", variant: "info" as const },
];

const agents = [
  { name: "MedAssist Pro", domain: "Healthcare", status: "Published" },
  { name: "CodeReviewer", domain: "DevOps", status: "Published" },
  { name: "ComplianceBot", domain: "Legal", status: "Draft" },
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Profile Header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-zinc-800">
            <User className="h-12 w-12 text-zinc-500" />
          </div>
          <h1 className="mb-1 text-3xl font-bold tracking-tight">
            Builder Profile
          </h1>
          <p className="text-zinc-400">@agent-builder</p>
        </div>

        {/* Stats Grid */}
        <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex flex-col items-center rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
              >
                <Icon className="mb-2 h-5 w-5 text-emerald-400" />
                <span className="text-2xl font-bold text-zinc-100">
                  {stat.value}
                </span>
                <span className="text-xs text-zinc-500">{stat.label}</span>
              </div>
            );
          })}
        </div>

        {/* Badges Section */}
        <div className="mb-12">
          <h2 className="mb-4 text-lg font-semibold text-zinc-100">Badges</h2>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge) => (
              <Badge key={badge.name} variant={badge.variant}>
                {badge.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Agents List */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-zinc-100">
            Your Agents
          </h2>
          <div className="space-y-3">
            {agents.map((agent) => (
              <div
                key={agent.name}
                className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-sm font-bold text-emerald-400">
                    {agent.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-zinc-100">{agent.name}</p>
                    <DomainBadge domain={agent.domain} />
                  </div>
                </div>
                <Badge
                  variant={agent.status === "Published" ? "success" : "default"}
                >
                  {agent.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
