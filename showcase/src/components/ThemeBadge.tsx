import type { ReactNode } from "react";
import { THEME_BY_ID } from "../data/themes";
import type { ThemeArchetype } from "../data/types";

/** Theme name with its pen colour as a short stroke, the same mark the hero plot uses. */
export function ThemeBadge({ theme, size = "sm", boxed = false }: { theme: ThemeArchetype; size?: "sm" | "md"; boxed?: boolean }) {
  const t = THEME_BY_ID[theme];
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap text-ink-2 ${size === "sm" ? "text-[13px]" : "text-[14px]"} ${boxed ? "rounded-[3px] border border-rule px-1.5 py-0.5 text-[12px]" : ""}`}
      title={t.name}
    >
      <span aria-hidden="true" className="h-[3px] w-3.5 shrink-0 rounded-full" style={{ background: t.accent }} />
      {t.short}
    </span>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center rounded border border-rule px-1.5 py-0.5 text-[12px] text-ink-2">{children}</span>;
}
