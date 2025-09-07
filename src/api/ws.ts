type ServerEvent =
  | { type: "ready" }
  | { type: "waiting" }
  | { type: "matched"; roomId: string; peerId: string }
  | { type: "message"; from_: string; text: string; ts: number }
  | { type: "delivered" }
  | { type: "left" }
  | { type: "peer_left" }
  | { type: "pong" }
  | { type: "error"; code: string; message: string };

type Handlers = {
  onReady?: () => void;
  onWaiting?: () => void;
  onMatched?: (roomId: string, peerId: string) => void;
  onMessage?: (from: string, text: string, ts: number) => void;
  onPeerLeft?: () => void;
  onError?: (code: string, message: string) => void;
  onClose?: () => void;
};

const DEFAULT_WS_URL = (() => {
  const loc = window.location;
  const proto = loc.protocol === "https:" ? "wss:" : "ws:";
  return `${proto}//${loc.host}/ws`;
})();

export class ChatSocket {
  private ws?: WebSocket;
  private pingTimer?: number;
  private handlers: Handlers;

  constructor(handlers: Handlers) {
    this.handlers = handlers;
  }

  connect = (sid: string, wsUrl?: string) =>
    new Promise<void>((resolve, reject) => {
      const url = (wsUrl ?? (import.meta as any).env?.VITE_WS_URL ?? DEFAULT_WS_URL) + `?sid=${encodeURIComponent(sid)}`;
      const ws = new WebSocket(url);
      this.ws = ws;

      ws.onopen = () => {
        this.pingTimer = window.setInterval(() => {
          this.sendRaw({ type: "ping" });
        }, 25000);
      };

      ws.onmessage = (ev) => {
        let msg: ServerEvent;
        try {
          msg = JSON.parse(ev.data);
        } catch {
          this.handlers.onError?.("BAD_JSON", "Malformed server message");
          return;
        }
        switch (msg.type) {
          case "ready":
            this.handlers.onReady?.();
            resolve();
            break;
          case "waiting":
            this.handlers.onWaiting?.();
            break;
          case "matched":
            this.handlers.onMatched?.(msg.roomId, msg.peerId);
            break;
          case "message":
            this.handlers.onMessage?.(msg.from_, msg.text, msg.ts);
            break;
          case "peer_left":
            this.handlers.onPeerLeft?.();
            break;
          case "error":
            this.handlers.onError?.(msg.code, msg.message);
            break;
          default:
            break;
        }
      };

      ws.onerror = () => {
        this.handlers.onError?.("WS_ERROR", "WebSocket error");
        reject(new Error("WS error"));
      };
      ws.onclose = () => {
        if (this.pingTimer) window.clearInterval(this.pingTimer);
        this.handlers.onClose?.();
      };
    });

  private sendRaw(payload: object) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
    this.ws.send(JSON.stringify(payload));
  }

  start() { this.sendRaw({ type: "start" }); }
  send(text: string) { this.sendRaw({ type: "send", text }); }
  next() { this.sendRaw({ type: "next" }); }
  leave() { this.sendRaw({ type: "leave" }); }
  close() { this.ws?.close(); if (this.pingTimer) window.clearInterval(this.pingTimer); }
}
