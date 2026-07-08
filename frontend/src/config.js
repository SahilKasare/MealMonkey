// Central place for the backend server URL so it isn't hardcoded everywhere.
// Override in production via a Vite env var (VITE_SERVER_URL).
export const SERVER_URL =
  import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

// Build an absolute URL for an image path returned by the backend.
// Handles already-absolute URLs and missing/relative paths gracefully.
export const imageUrl = (path, fallback = "") => {
  if (!path) return fallback;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SERVER_URL}${path.startsWith("/") ? "" : "/"}${path}`;
};
