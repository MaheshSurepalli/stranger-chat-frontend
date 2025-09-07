import { useLayoutEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("strangerchat:theme");
    if (saved === "light" || saved === "dark") return saved;
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  });

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    (root as any).style.colorScheme = theme;
    localStorage.setItem("strangerchat:theme", theme);
  }, [theme]);

  return { theme, setTheme };
}
