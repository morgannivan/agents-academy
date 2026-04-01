import { Search } from "lucide-react";
import AgentCard from "@/components/ui/AgentCard";

const filters = [
  "All",
  "Healthcare",
  "Finance",
  "Legal",
  "DevOps",
  "Security",
  "Education",
];

const agents = [
  { name: "MedAssist Pro", domain: "Healthcare", rating: 4.8, price: "$29/mo" },
  { name: "FinBot Elite", domain: "Finance", rating: 4.6, price: "$49/mo" },
  { name: "LegalEagle", domain: "Legal", rating: 4.5, price: "$39/mo" },
  { name: "DeployMaster", domain: "DevOps", rating: 4.9, price: "$59/mo" },
  {
    name: "SecureGuard",
    domain: "Security",
    rating: 4.7,
    price: "$69/mo",
  },
  {
    name: "DataSage",
    domain: "Data Science",
    rating: 4.4,
    price: "$34/mo",
  },
];

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-2 text-4xl font-bold tracking-tight">
            Agent Marketplace
          </h1>
          <p className="text-lg text-zinc-400">Coming Soon</p>
        </div>

        {/* Search Bar */}
        <div className="mx-auto mb-8 max-w-2xl">
          <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
            <Search className="h-5 w-5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search agents by name, domain, or capability…"
              disabled
              className="w-full bg-transparent text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Filter Chips */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              disabled
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                f === "All"
                  ? "bg-emerald-500 text-zinc-950"
                  : "border border-zinc-800 bg-zinc-900 text-zinc-400"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Agent Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <AgentCard key={agent.name} {...agent} />
          ))}
        </div>
      </div>
    </div>
  );
}
