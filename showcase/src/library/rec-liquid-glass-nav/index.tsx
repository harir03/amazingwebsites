import { useEffect, useRef, useState } from "react";

/**
 * Liquid Glass Pill Navbar — inspired by Recursive.
 * A floating capsule of frosted glass (blur 34px, saturate 190%) with a screen-blended
 * sheen, inset highlights, and a 2-bar hamburger that morphs into an X and opens a
 * glass sheet with staggered links.
 */
type Props = { links?: string[]; brand?: string };

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const DEFAULT_LINKS = ["The Thesis", "5-Min Scoring", "Scoring Pillars", "Future Scope", "Partners", "FAQ"];

export default function LiquidGlassNav({ links = DEFAULT_LINKS, brand = "Recursive" }: Props) {
  const [open, setOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sheetRef.current) sheetRef.current.inert = !open;
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div
      className="@container relative h-full min-h-[340px] w-full overflow-hidden bg-[#EEF3EB] text-[#142617]"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      <style>{`
        @keyframes rec-drift { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(8%, 6%, 0) scale(1.12); } }
        @media (prefers-reduced-motion: reduce) { .rec-blob { animation: none !important; } }
      `}</style>
      {/* Colour behind the glass so the blur has something to bend */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="rec-blob absolute -top-10 left-[8%] h-48 w-48 rounded-full bg-[#8FC45A] blur-2xl" style={{ animation: "rec-drift 9s ease-in-out infinite" }} />
        <div className="rec-blob absolute top-6 right-[12%] h-40 w-56 rounded-full bg-[#E2B93B]/80 blur-2xl" style={{ animation: "rec-drift 11s ease-in-out infinite reverse" }} />
        <div className="rec-blob absolute top-1/2 left-1/3 h-56 w-72 rounded-full bg-[#5C8C3A]/60 blur-3xl" style={{ animation: "rec-drift 13s ease-in-out infinite" }} />
      </div>

      <nav aria-label="Main" className="absolute inset-x-0 top-4 z-20 flex justify-center px-4">
        <div
          className="relative isolate w-full max-w-[860px] overflow-hidden"
          style={{
            borderRadius: 999,
            background: "rgba(255,255,255,0.42)",
            backdropFilter: "blur(34px) saturate(190%)",
            WebkitBackdropFilter: "blur(34px) saturate(190%)",
            boxShadow: "0 14px 44px rgba(14,30,16,0.24), inset 0 1px 1px rgba(255,255,255,0.7), inset 0 -1px 2px rgba(47,85,39,0.08)",
            borderTop: "1px solid rgba(255,255,255,0.7)",
            borderBottom: "1px solid rgba(47,85,39,0.06)",
          }}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              borderRadius: "inherit",
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.06) 32%, rgba(255,255,255,0) 60%, rgba(143,196,90,0.12) 100%)",
              mixBlendMode: "screen",
            }}
          />
          <div className="relative z-20 flex h-14 items-center gap-2 pr-2 pl-5">
            <a href="#top" className="mr-auto flex items-center gap-2 text-[17px] font-bold tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              <span aria-hidden="true" className="grid h-7 w-7 place-items-center rounded-full bg-[#1C3320] text-[12px] text-[#B8DB94]">
                ↻
              </span>
              {brand}
            </a>
            <ul className="hidden items-center gap-0.5 @3xl:flex">
              {links.map((l) => (
                <li key={l}>
                  <a href="#" className="rounded-full px-3 py-1.5 text-[13px] font-medium text-[#24472A] transition-colors duration-300 hover:bg-white/60 hover:text-[#142617]">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#apply"
              className="hidden rounded-full bg-[#1C3320] px-4 py-2 text-[13px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-transform duration-300 hover:scale-[1.04] @md:block"
            >
              Apply now
            </a>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="rec-sheet"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
              className="grid h-10 w-10 place-items-center rounded-full bg-white/50 @3xl:hidden"
            >
              <span className="relative block h-3 w-5" aria-hidden="true">
                <span className="absolute inset-x-0 top-0 h-[2px] rounded bg-[#142617]" style={{ transition: `transform 0.45s ${EASE}`, transform: open ? "translateY(5px) rotate(45deg)" : "none" }} />
                <span className="absolute inset-x-0 bottom-0 h-[2px] rounded bg-[#142617]" style={{ transition: `transform 0.45s ${EASE}`, transform: open ? "translateY(-5px) rotate(-45deg)" : "none" }} />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile sheet */}
      <div
        id="rec-sheet"
        ref={sheetRef}
        className="absolute inset-0 z-10 flex flex-col justify-center px-6 pt-20 @3xl:hidden"
        style={{
          background: "rgba(238,243,235,0.55)",
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: `opacity 0.4s ${EASE}`,
        }}
      >
        <ul className="space-y-1">
          {links.map((l, i) => (
            <li
              key={l}
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(14px)",
                transition: `opacity 0.45s ${EASE} ${open ? 0.08 + i * 0.05 : 0}s, transform 0.45s ${EASE} ${open ? 0.08 + i * 0.05 : 0}s`,
              }}
            >
              <a href="#" onClick={() => setOpen(false)} className="block py-1.5 text-[clamp(24px,7cqw,40px)] leading-tight font-semibold tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {l}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute inset-x-0 bottom-6 px-6 text-center">
        <p className="text-[clamp(22px,4.6cqw,48px)] leading-[1.05] font-semibold tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Credit for the next billion.
        </p>
      </div>
    </div>
  );
}
