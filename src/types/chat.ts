export type Status = "idle" | "searching" | "chat";

export type ChatMsg = {
  id: string;
  who: "you" | "stranger";
  text: string;
  ts: number;
};
