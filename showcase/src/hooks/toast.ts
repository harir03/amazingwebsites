import { createContext, useCallback, useContext, useState } from "react";

export interface ToastItem {
  id: number;
  title: string;
  detail?: string;
}

export const ToastContext = createContext<(title: string, detail?: string) => void>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

/** Copies text, falls back to a hidden textarea, and announces the result with a toast. */
export function useCopy() {
  const toast = useToast();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copy = useCallback(
    async (text: string, label: string, key = label) => {
      let ok = true;
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand("copy");
        ta.remove();
      }
      if (ok) {
        toast(`Copied ${label}`, `${text.length.toLocaleString()} characters on your clipboard`);
        setCopiedKey(key);
        window.setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1600);
      } else {
        toast("Copy failed", "Your browser blocked clipboard access. Select the text and copy it manually.");
      }
    },
    [toast],
  );

  return { copy, copiedKey };
}
