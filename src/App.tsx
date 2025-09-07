import { useTheme } from "./hooks/useTheme";
import { useRealtimeChat } from "./hooks/useRealtimeChat";
import ThemeToggle from "./components/ThemeToggle";
import Landing from "./components/Landing";
import ChatUI from "./components/ChatUI";
import SafetyTips from "./components/SafetyTips";

export default function App() {
  const { theme, setTheme } = useTheme();
  const {
    status, messages, startChat, send, nextChat, endChat, peerId, error
  } = useRealtimeChat();

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-dvh bg-gradient-to-b from-white to-zinc-100 dark:from-zinc-950 dark:to-black text-zinc-900 dark:text-zinc-50">
        <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
              <span className="font-semibold">SC</span>
            </div>
            <div>
              <div className="text-lg font-semibold leading-tight">Stranger Chat</div>
              <div className="text-xs text-zinc-600 dark:text-zinc-400">no login · no storage · just talk</div>
            </div>
          </div>
          <ThemeToggle theme={theme} onToggle={() => setTheme(theme === "dark" ? "light" : "dark")} />
        </header>

        <main className="mx-auto w-full max-w-6xl px-4">
          {status === "idle" && <Landing onStart={startChat} />}

          {status === "searching" && (
            <div className="mx-auto mt-16 flex max-w-xl flex-col items-center gap-4 text-center">
              <div className="h-12 w-12 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-white" />
              <h2 className="text-xl font-semibold">Looking for a stranger…</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                You’ll be matched as soon as someone else joins.
              </p>
            </div>
          )}

          {status === "chat" && (
            <ChatUI
              messages={messages}
              onSend={send}
              peerLabel={peerId ? "Stranger" : "Stranger"}
              onNext={nextChat}
              onEnd={endChat}
            />
          )}

          {error && (
            <div className="mx-auto mt-6 max-w-3xl rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
              {error}
            </div>
          )}

          <SafetyTips />
        </main>

        <footer className="mx-auto mt-20 w-full max-w-6xl px-4 pb-10 text-center text-xs text-zinc-500 dark:text-zinc-400">
          Built with <span className="font-medium">React</span> + <span className="font-medium">TailwindCSS</span>.
        </footer>
      </div>
    </div>
  );
}
