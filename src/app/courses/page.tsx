import { Bot, GitBranch, Container, Layers } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Badge from "@/components/ui/Badge";

interface Course {
  title: string;
  description: string;
  icon: LucideIcon;
  level: string;
  lessons: number;
  duration: string;
  color: string;
  variant: "success" | "info" | "warning" | "premium";
}

const courses: Course[] = [
  {
    title: "Build Your First Agent",
    description:
      "Go from zero to a working AI agent. Covers prompts, tool use, memory, and deployment basics.",
    icon: Bot,
    level: "Beginner",
    lessons: 12,
    duration: "4 hours",
    color: "text-emerald-400",
    variant: "success",
  },
  {
    title: "Agent Orchestration Patterns",
    description:
      "Master multi-agent systems, delegation, consensus, and complex workflow coordination.",
    icon: GitBranch,
    level: "Intermediate",
    lessons: 8,
    duration: "6 hours",
    color: "text-sky-400",
    variant: "info",
  },
  {
    title: "DevOps for AI Agents",
    description:
      "CI/CD pipelines, monitoring, scaling, and production reliability for agent deployments.",
    icon: Container,
    level: "Intermediate",
    lessons: 10,
    duration: "5 hours",
    color: "text-amber-400",
    variant: "warning",
  },
  {
    title: "Domain Specialist Track",
    description:
      "Build agents tailored to healthcare, finance, and legal domains with compliance awareness.",
    icon: Layers,
    level: "Advanced",
    lessons: 16,
    duration: "10 hours",
    color: "text-purple-400",
    variant: "premium",
  },
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-5xl px-6 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-2 text-4xl font-bold tracking-tight">
            Academy Courses
          </h1>
          <p className="text-lg text-zinc-400">Coming Soon</p>
        </div>

        {/* Course Cards */}
        <div className="grid gap-6 sm:grid-cols-2">
          {courses.map((course) => {
            const Icon = course.icon;
            return (
              <div
                key={course.title}
                className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-zinc-700"
              >
                <div className="mb-4 flex items-start justify-between">
                  <Icon className={`h-8 w-8 ${course.color}`} />
                  <Badge variant={course.variant}>{course.level}</Badge>
                </div>

                <h3 className="mb-2 text-lg font-semibold text-zinc-100">
                  {course.title}
                </h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-zinc-400">
                  {course.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <span>{course.lessons} lessons</span>
                  <span className="h-1 w-1 rounded-full bg-zinc-700" />
                  <span>{course.duration}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
