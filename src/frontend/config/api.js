const getBaseURL = () => {
  if (process.env.REACT_APP_API_URL) return process.env.REACT_APP_API_URL;
  if (window.location.hostname.includes("csb.app")) {
    return window.location.origin.replace("-3000.csb.app", "-8080.csb.app");
  }
  return "http://localhost:8080";
};

export const API_BASE = getBaseURL();

export function authFetch(url, options = {}) {
  const token = localStorage.getItem("token");
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
}
