import { useEffect, useRef, useState } from "react";
import type { ChatMsg, Status } from "../types/chat";
import { botOpeners, botReply } from "../lib/bot";

export function useBotChat() {
  const [status, setStatus] = useState<Status>("idle");
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [strangerTyping, setStrangerTyping] = useState(false);
  const openerTimer = useRef<number | null>(null);
  const startTimer = useRef<number | null>(null);

  function clearTimers() {
    if (openerTimer.current) {
      window.clearTimeout(openerTimer.current);
      openerTimer.current = null;
    }
    if (startTimer.current) {
      window.clearTimeout(startTimer.current);
      startTimer.current = null;
    }
  }

  function startSearching() {
    clearTimers();
    setMessages([]);
    setStrangerTyping(false);
    setStatus("searching");
    startTimer.current = window.setTimeout(() => {
      setStatus("chat");
      setStrangerTyping(true);
      const open = botOpeners();
      openerTimer.current = window.setTimeout(() => {
        setMessages((m) => [
          ...m,
          { id: crypto.randomUUID(), who: "stranger", text: open, ts: Date.now() },
        ]);
        setStrangerTyping(false);
      }, 700 + Math.random() * 900);
    }, 800);
  }

  function endChat() {
    clearTimers();
    setStatus("idle");
    setMessages([]);
    setStrangerTyping(false);
  }

  function nextChat() {
    endChat();
    setTimeout(() => startSearching(), 150);
  }

  function send(text: string) {
    const t = text.trim();
    if (!t) return;
    const now = Date.now();
    setMessages((m) => [...m, { id: crypto.randomUUID(), who: "you", text: t, ts: now }]);
    setStrangerTyping(true);
    const reply = botReply(t);
    window.setTimeout(() => {
      setMessages((m) => [...m, { id: crypto.randomUUID(), who: "stranger", text: reply, ts: Date.now() }]);
      setStrangerTyping(false);
    }, 600 + Math.random() * 900);
  }

  useEffect(() => {
    return () => clearTimers();
  }, []);

  return {
    status,
    messages,
    strangerTyping,
    startSearching,
    endChat,
    nextChat,
    send,
    peerKind: "bot" as const,
  };
}
