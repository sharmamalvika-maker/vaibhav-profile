"use client";

import { FormEvent, useMemo, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const starterPrompts = [
  "What are Vaibhav's strongest technical skills?",
  "Can you summarize his career journey in 5 bullets?",
  "What kind of SRE impact has he delivered at Google?",
];

export function DigitalTwinChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi, I am Vaibhav's digital twin. Ask me anything about his career, impact, skills, research, or leadership journey.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(
    () => input.trim().length > 0 && !isLoading,
    [input, isLoading],
  );

  async function sendMessage(text: string) {
    const cleaned = text.trim();
    if (!cleaned || isLoading) {
      return;
    }

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: cleaned }];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/digital-twin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = (await response.json()) as { reply?: string; error?: string };
      if (!response.ok || !data.reply) {
        throw new Error(data.error ?? "Failed to get response.");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply as string }]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await sendMessage(input);
  }

  return (
    <section className="rounded-2xl border border-zinc-700 bg-zinc-950/70 p-6 md:p-8">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">Digital Twin AI Chat</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Powered by OpenRouter (`openai/gpt-oss-120b:free`).
          </p>
        </div>
        <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-200">
          Live
        </span>
      </div>

      <div className="max-h-[420px] space-y-3 overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-900/70 p-4">
        {messages.map((message, idx) => (
          <div
            key={`${message.role}-${idx}`}
            className={`max-w-[90%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
              message.role === "user"
                ? "ml-auto bg-cyan-500/15 text-cyan-100"
                : "bg-zinc-800 text-zinc-100"
            }`}
          >
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="max-w-[90%] rounded-xl bg-zinc-800 px-4 py-3 text-sm text-zinc-300">
            Thinking...
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {starterPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => void sendMessage(prompt)}
            className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs text-zinc-300 transition hover:border-cyan-400/50 hover:text-cyan-200 disabled:opacity-60"
            disabled={isLoading}
          >
            {prompt}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about career highlights, leadership, research, or skills..."
          className="h-28 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-cyan-400/70"
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-zinc-500">
            For best answers, ask specific questions about roles, outcomes, or timelines.
          </p>
          <button
            type="submit"
            disabled={!canSubmit}
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>

      {error && (
        <p className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </p>
      )}
    </section>
  );
}
