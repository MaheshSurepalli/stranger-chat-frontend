import type { ChatMsg } from "../types/chat";

export default function ChatBubble({ msg }: { msg: ChatMsg }) {
  const mine = msg.who === "you";
  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 text-[0.95rem] leading-relaxed shadow-sm ${
          mine
            ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
            : "bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 border border-zinc-200/80 dark:border-zinc-800"
        }`}
        title={new Date(msg.ts).toLocaleTimeString()}
      >
        {msg.text}
      </div>
    </div>
  );
}
