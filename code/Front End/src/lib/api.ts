import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
});

API.interceptors.request.use((config) => {
  const lang = localStorage.getItem("language") || "ar";
  const locale = lang === "ar" ? "ar-AE" : "en-US";

  // header (nice to have)
  config.headers = config.headers || {};
  config.headers["Accept-Language"] = locale;

  // query param (ensures all endpoints see it)
  const url = new URL(config.url!, config.baseURL);
  if (!url.searchParams.has("locale")) url.searchParams.set("locale", locale);
  config.url = url.pathname + url.search;

  return config;
});
