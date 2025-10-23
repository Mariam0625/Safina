export async function api(path: string, init: RequestInit = {}) {
  const base = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const lang = localStorage.getItem("language") || "ar";
  const locale = lang === "ar" ? "ar-AE" : "en-US";

  const url = new URL(path, base);
  if (!url.searchParams.has("locale")) url.searchParams.set("locale", locale);

  const headers = new Headers(init.headers || {});
  headers.set("Accept-Language", locale);
  if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json");

  const res = await fetch(url, { ...init, headers });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}
