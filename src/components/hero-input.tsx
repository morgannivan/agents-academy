"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowRight } from "lucide-react";

const EXAMPLES = [
  "A HIPAA-compliant patient intake agent...",
  "A DevOps agent that triages alerts...",
  "A legal contract review agent...",
  "A real-estate lead qualification agent...",
  "A customer support agent for SaaS...",
  "A financial compliance monitoring agent...",
];

export default function HeroInput() {
  const [exampleIndex, setExampleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [value, setValue] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const current = EXAMPLES[exampleIndex];

    if (!isDeleting && displayed.length < current.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1));
      }, 45);
    } else if (!isDeleting && displayed.length === current.length) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length - 1));
      }, 25);
    } else if (isDeleting && displayed.length === 0) {
      timeoutRef.current = setTimeout(() => {
        setIsDeleting(false);
        setExampleIndex((prev) => (prev + 1) % EXAMPLES.length);
      }, 0);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayed, isDeleting, exampleIndex]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative rounded-[28px] border border-zinc-700 bg-zinc-900 shadow-lg shadow-emerald-500/5 transition-all focus-within:border-emerald-500/50 focus-within:shadow-emerald-500/10">
        <div className="relative">
          <textarea
            rows={3}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className="min-h-[120px] w-full resize-none bg-transparent px-5 py-5 pr-20 text-lg text-zinc-100 placeholder-transparent outline-none"
            aria-label="Describe the agent you need"
          />
          {value.length === 0 ? (
            <span
              className="pointer-events-none absolute left-5 top-5 flex items-start text-left text-lg text-zinc-500"
              aria-hidden="true"
            >
              {displayed}
              <span className="ml-px mt-1 inline-block h-5 w-[2px] bg-emerald-500 animate-blink" />
            </span>
          ) : null}
        </div>
        <button
          type="button"
          className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-zinc-950 transition-colors hover:bg-emerald-400"
          aria-label="Start building"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
      <p className="mt-3 text-center text-sm text-zinc-500">
        Describe your agent in plain English — we handle the rest.
      </p>
    </div>
  );
}
