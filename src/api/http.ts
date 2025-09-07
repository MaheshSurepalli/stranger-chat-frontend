const API_BASE =
  (import.meta as any).env?.VITE_API_BASE_URL?.toString() ?? "";

export async function createSession(): Promise<string> {
  const res = await fetch(`${API_BASE}/session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`Session failed: ${res.status}`);
  const json = await res.json();
  return json.session_id as string;
}
