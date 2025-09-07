const OPENERS = [
  "Hey there 👋 How's your day going?",
  "Yo! What's something cool you learned this week?",
  "Hi! Coffee or tea person?",
  "What's your current obsession?",
];

export function botOpeners() {
  return OPENERS[Math.floor(Math.random() * OPENERS.length)];
}

export function botReply(userText: string): string {
  const t = userText.trim().toLowerCase();
  if (!t) return "Say more! I'm listening.";
  if (/[?]$/.test(t)) return "Good question. What do **you** think?";
  if (t.includes("hello") || t.includes("hi")) return "Hiii! 🫶 Where are you chatting from?";
  if (t.includes("job") || t.includes("work")) return "What do you do for work — or what's your dream gig?";
  if (t.includes("movie") || t.includes("series")) return "Last movie you watched that surprised you?";
  if (t.includes("music")) return "Drop an artist I should check out.";
  if (t.includes("bye")) return "Catch you later! Hit **Next** anytime.";
  const words = t.split(/\s+/).slice(0, 8).join(" ");
  return `Tell me more about "${words}"…`;
}
