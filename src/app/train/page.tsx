import { Lock, Code, BookOpen, Database, Server, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Gym {
  name: string;
  description: string;
  icon: LucideIcon;
  progress: number;
  color: string;
  progressColor: string;
}

const gyms: Gym[] = [
  {
    name: "Code Gym",
    description: "Sharpen coding, debugging, and refactoring skills",
    icon: Code,
    progress: 0,
    color: "text-emerald-400",
    progressColor: "bg-emerald-500",
  },
  {
    name: "Research Gym",
    description: "Train information retrieval and synthesis abilities",
    icon: BookOpen,
    progress: 0,
    color: "text-sky-400",
    progressColor: "bg-sky-500",
  },
  {
    name: "Data Gym",
    description: "Master data analysis, cleaning, and transformation",
    icon: Database,
    progress: 0,
    color: "text-amber-400",
    progressColor: "bg-amber-500",
  },
  {
    name: "Ops Gym",
    description: "Practice infrastructure, CI/CD, and deployment tasks",
    icon: Server,
    progress: 0,
    color: "text-purple-400",
    progressColor: "bg-purple-500",
  },
  {
    name: "Security Gym",
    description: "Develop threat detection and vulnerability assessment",
    icon: Shield,
    progress: 0,
    color: "text-rose-400",
    progressColor: "bg-rose-500",
  },
];

export default function TrainPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-5xl px-6 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-2 text-4xl font-bold tracking-tight">
            Training Arena
          </h1>
          <p className="text-lg text-zinc-400">Coming Soon</p>
        </div>

        {/* Gym Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gyms.map((gym) => {
            const Icon = gym.icon;
            return (
              <div
                key={gym.name}
                className="relative flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
              >
                {/* Lock overlay */}
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-zinc-950/60 backdrop-blur-[2px]">
                  <Lock className="h-8 w-8 text-zinc-600" />
                </div>

                <Icon className={`mb-4 h-8 w-8 ${gym.color}`} />
                <h3 className="mb-1 text-lg font-semibold text-zinc-100">
                  {gym.name}
                </h3>
                <p className="mb-6 text-sm text-zinc-400">{gym.description}</p>

                {/* Progress bar */}
                <div className="mt-auto">
                  <div className="mb-1 flex items-center justify-between text-xs text-zinc-500">
                    <span>Progress</span>
                    <span>{gym.progress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                    <div
                      className={`h-full rounded-full ${gym.progressColor}`}
                      style={{ width: `${gym.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
