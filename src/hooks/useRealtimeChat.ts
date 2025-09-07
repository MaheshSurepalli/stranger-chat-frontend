import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatMsg, Status } from "../types/chat";
import { createSession } from "../api/http";
import { ChatSocket } from "../api/ws";

export function useRealtimeChat() {
  const [status, setStatus] = useState<Status>("idle");
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [peerId, setPeerId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sidRef = useRef<string | null>(null);
  const socketRef = useRef<ChatSocket | null>(null);
  const readyRef = useRef(false);
  const pendingStartRef = useRef(false);

  const ensureConnected = useCallback(async () => {
    if (socketRef.current && readyRef.current) return;
    if (!sidRef.current) sidRef.current = await createSession();
    const sock = new ChatSocket({
      onReady: () => {
        readyRef.current = true;
        if (pendingStartRef.current) {
          sock.start();
          pendingStartRef.current = false;
        }
      },
      onWaiting: () => setStatus("searching"),
      onMatched: (rid, pid) => {
        setRoomId(rid);
        setPeerId(pid);
        setStatus("chat");
      },
      onMessage: (_from, text, ts) => {
        setMessages((m) => [...m, { id: crypto.randomUUID(), who: "stranger", text, ts }]);
      },
      onPeerLeft: () => {
        setStatus("idle");
        setRoomId(null);
        setPeerId(null);
      },
      onError: (_c, msg) => setError(msg),
      onClose: () => {
        readyRef.current = false;
      },
    });
    socketRef.current = sock;
    await sock.connect(sidRef.current!);
  }, []);

  const startChat = useCallback(async () => {
    setMessages([]);
    setError(null);
    if (!socketRef.current || !readyRef.current) {
      pendingStartRef.current = true;
      await ensureConnected();
      return;
    }
    socketRef.current.start();
  }, [ensureConnected]);

  const send = useCallback((text: string) => {
    if (!text.trim()) return;
    const ts = Date.now();
    setMessages((m) => [...m, { id: crypto.randomUUID(), who: "you", text, ts }]);
    socketRef.current?.send(text);
  }, []);

  const nextChat = useCallback(() => {
    setMessages([]);
    setRoomId(null);
    setPeerId(null);
    setStatus("searching");
    socketRef.current?.next();
  }, []);

  const endChat = useCallback(() => {
    setStatus("idle");
    setMessages([]);
    setRoomId(null);
    setPeerId(null);
    socketRef.current?.leave();
  }, []);

  useEffect(() => {
    return () => {
      socketRef.current?.close();
    };
  }, []);

  return {
    status,
    messages,
    error,
    roomId,
    peerId,
    startChat,
    send,
    nextChat,
    endChat,
  };
}
