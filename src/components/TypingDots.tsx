export default function TypingDots() {
  return (
    <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-sm">
      <div className="flex items-center gap-1">
        <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.2s]" />
        <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.1s]" />
        <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
      </div>
      Stranger is typing…
    </div>
  );
}
