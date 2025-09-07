import { useState } from "react";
import { Sparkles } from "lucide-react";
import { randomQuote } from "../lib/quotes";

export default function Landing({ onStart }: { onStart: () => void }) {
  const [quote] = useState(() => randomQuote());
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-100 dark:to-zinc-950" />
      <div className="mx-auto w-full max-w-3xl px-4 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800/80 px-3 py-1 text-xs text-zinc-600 dark:text-zinc-300">
          <Sparkles className="h-3.5 w-3.5" />
          No signup. No history. Just vibes.
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400">
          Talk to a <span className="underline decoration-dotted underline-offset-4">stranger</span>, instantly.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-balance text-zinc-600 dark:text-zinc-300">{quote}</p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={onStart}
            className="rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-6 py-3 font-medium shadow-sm hover:scale-[1.01] active:scale-[0.99] transition"
          >
            Start Chat
          </button>
          <a
            href="#safety"
            className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 px-5 py-3 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition"
          >
            Safety tips
          </a>
        </div>
      </div>
    </div>
  );
}
