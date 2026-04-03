"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Sparkles } from "lucide-react";
import ChatMessage, { type Message } from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import { templates } from "@/lib/templates";

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Welcome to agents.academy. Describe the agent you want to build and I will create it for you.",
};

const QUICK_START_DOMAINS = [
  { label: "Healthcare", emoji: "🏥" },
  { label: "Finance", emoji: "💰" },
  { label: "Legal", emoji: "⚖️" },
  { label: "Real Estate", emoji: "🏠" },
  { label: "DevOps", emoji: "🚨" },
  { label: "Customer Support", emoji: "🎧" },
];

export default function BuildPage() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [showQuickStart, setShowQuickStart] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = useCallback(
    (content: string) => {
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content,
      };

      setMessages((prev) => [...prev, userMessage]);
      setShowQuickStart(false);

      // Find a matching template based on the message content
      const lowerContent = content.toLowerCase();
      const matched = templates.find(
        (t) =>
          lowerContent.includes(t.domain) ||
          lowerContent.includes(t.name.toLowerCase()),
      );

      // Simulate assistant response
      setTimeout(() => {
        const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: matched
            ? `Great choice! I found a template for that: **${matched.emoji} ${matched.name}** — ${matched.description}.\n\nThis agent comes pre-configured with tools like ${matched.defaultConfig.tools.join(", ")} and follows ${matched.defaultConfig.standards.join(", ")} standards.\n\nWould you like me to customize it further, or shall we proceed with the default configuration?`
            : `Interesting! Let me help you design a custom agent for that. To get started, I need a few details:\n\n1. What is the primary task this agent should handle?\n2. Which channel will it operate on (web, Slack, SMS, etc.)?\n3. Are there any compliance standards or regulations it needs to follow?\n\nFeel free to be as specific as you like — I will tailor everything to your needs.`,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }, 800);
    },
    [],
  );

  const handleQuickStart = (domain: string) => {
    handleSend(`I want to build a ${domain} agent`);
  };

  return (
    <div className="flex h-screen flex-col bg-zinc-950">
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-zinc-800 px-6 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20">
          <Sparkles className="h-5 w-5 text-emerald-400" />
        </div>
        <div>
          <h1 className="text-base font-semibold text-zinc-100">
            agents.academy
          </h1>
          <p className="text-xs text-zinc-500">Chat Builder</p>
        </div>
      </header>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}

          {/* Quick-start domain buttons */}
          {showQuickStart && (
            <div className="flex flex-wrap gap-2 pl-11">
              {QUICK_START_DOMAINS.map(({ label, emoji }) => (
                <button
                  key={label}
                  onClick={() => handleQuickStart(label.toLowerCase())}
                  className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-emerald-500 hover:bg-zinc-800 hover:text-emerald-400"
                >
                  <span className="mr-1.5">{emoji}</span>
                  {label}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-zinc-800 px-4 py-4">
        <div className="mx-auto max-w-2xl">
          <ChatInput onSend={handleSend} />
          <p className="mt-2 text-center text-xs text-zinc-600">
            Press Enter to send &middot; Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
