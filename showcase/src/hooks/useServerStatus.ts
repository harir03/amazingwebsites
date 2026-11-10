import { useEffect, useState } from "react";

export type ServerStatus = "checking" | "online" | "offline";

const cache = new Map<string, Promise<ServerStatus>>();

/** Probes a local dev server. An opaque no-cors response still means "something is listening". */
function probe(url: string): Promise<ServerStatus> {
  if (!cache.has(url)) {
    const ctrl = new AbortController();
    const timer = window.setTimeout(() => ctrl.abort(), 1500);
    cache.set(
      url,
      fetch(url, { mode: "no-cors", signal: ctrl.signal, cache: "no-store" })
        .then(() => "online" as const)
        .catch(() => "offline" as const)
        .finally(() => clearTimeout(timer)),
    );
  }
  return cache.get(url)!;
}

export function useServerStatus(url: string): ServerStatus {
  const [status, setStatus] = useState<ServerStatus>("checking");
  useEffect(() => {
    let alive = true;
    probe(url).then((s) => alive && setStatus(s));
    return () => {
      alive = false;
    };
  }, [url]);
  return status;
}
