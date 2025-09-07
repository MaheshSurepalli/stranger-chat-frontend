const QUOTES = [
  "Every stranger is just a friend you haven't chatted with yet.",
  "Small talk, big connections.",
  "Two dots on a map. One conversation.",
  "Less scroll. More soul.",
  "Say hi. The universe might echo back.",
];

export const randomQuote = () => QUOTES[Math.floor(Math.random() * QUOTES.length)];
