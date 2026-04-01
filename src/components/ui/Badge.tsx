import type { ReactNode } from "react";

type BadgeVariant = "default" | "success" | "warning" | "info" | "premium";

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-zinc-800 text-zinc-300",
  success: "bg-emerald-950 text-emerald-400",
  warning: "bg-amber-950 text-amber-400",
  info: "bg-sky-950 text-sky-400",
  premium: "bg-purple-950 text-purple-400",
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}: {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
