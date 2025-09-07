import React, { useEffect, useRef, useState } from "react";
import { MessageSquare, Send, Shuffle, StopCircle } from "lucide-react";
import ChatBubble from "./ChatBubble";
import type { ChatMsg } from "../types/chat";

export default function ChatUI({
  messages,
  onSend,
  peerLabel,
  onNext,
  onEnd,
}: {
  messages: ChatMsg[];
  onSend: (text: string) => void;
  peerLabel: string;
  onNext: () => void;
  onEnd: () => void;
}) {
  const [input, setInput] = useState("");
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    onSend(text);
    setInput("");
  }

  return (
    <div className="mx-auto flex h-[70vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/60 backdrop-blur">
      <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800 px-4 py-3">
        <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-100">
          <MessageSquare className="h-5 w-5" />
          <span className="font-medium">You × {peerLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onNext}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900/60"
          >
            <Shuffle className="h-4 w-4" /> Next
          </button>
          <button
            onClick={onEnd}
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-3 py-1.5 text-sm hover:opacity-90"
          >
            <StopCircle className="h-4 w-4" /> End
          </button>
        </div>
      </div>

      <div ref={scrollerRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((m) => (
          <ChatBubble key={m.id} msg={m} />
        ))}
      </div>

      <form onSubmit={submit} className="border-t border-zinc-200/80 dark:border-zinc-800 p-3">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message…"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit(e as any);
              }
            }}
            className="min-h-[42px] max-h-40 w-full resize-y rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-[0.95rem] outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700"
          />
          <button
            type="submit"
            className="inline-flex h-[42px] items-center gap-2 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-4 font-medium hover:opacity-95 disabled:opacity-50"
            disabled={!input.trim()}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
