import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useCallback, useRef, useState, type ReactNode } from "react";
import { ToastContext, type ToastItem } from "../hooks/toast";

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const nextId = useRef(1);

  const push = useCallback((title: string, detail?: string) => {
    const id = nextId.current++;
    setItems((list) => [...list.slice(-2), { id, title, detail }]);
    window.setTimeout(() => setItems((list) => list.filter((t) => t.id !== id)), 2600);
  }, []);

  return (
    <ToastContext.Provider value={push}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4">
        <AnimatePresence initial={false}>
          {items.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98, transition: { duration: 0.18 } }}
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
              className="pointer-events-auto flex max-w-sm items-start gap-3 rounded-md bg-ink px-4 py-3 text-sheet shadow-[0_10px_30px_-12px_rgb(27_39_66_/_0.6)]"
              role="status"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-grid-major" aria-hidden="true" />
              <div>
                <p className="text-[15px] font-medium">{t.title}</p>
                {t.detail && <p className="mt-0.5 text-[13px] text-rule">{t.detail}</p>}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
