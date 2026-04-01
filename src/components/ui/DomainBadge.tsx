const domainColors: Record<string, string> = {
  Healthcare: "bg-rose-950 text-rose-400",
  Finance: "bg-emerald-950 text-emerald-400",
  Legal: "bg-amber-950 text-amber-400",
  DevOps: "bg-sky-950 text-sky-400",
  Security: "bg-purple-950 text-purple-400",
  Education: "bg-indigo-950 text-indigo-400",
  "Data Science": "bg-teal-950 text-teal-400",
  General: "bg-zinc-800 text-zinc-400",
};

export default function DomainBadge({ domain }: { domain: string }) {
  const colors = domainColors[domain] ?? domainColors.General;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors}`}
    >
      {domain}
    </span>
  );
}
