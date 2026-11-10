import { useEffect, useState } from "react";

/**
 * Musical Strip Accordion — inspired by Alan Menken's "Selected Works".
 * Ten poster strips share one row. Hover or focus a strip and it grows to ~7x its
 * neighbours with the site's CustomEase, swapping its vertical title for a
 * storybook-serif card over a slowly drifting "footage" gradient.
 * Under ~670px wide the row turns into a stack and the same flex-grow drives height.
 */
type Work = { title: string; year: string; role: string; from: string; to: string };
type Props = {
  works?: Work[];
  defaultIndex?: number;
  /** Demo mode: step through the strips until the user hovers. */
  loop?: boolean;
};

const EASE = "cubic-bezier(0.6, 0, 0.1, 1)";
const SERIF = "'Playfair Display', 'Clearface ITC', Georgia, serif";

const WORKS: Work[] = [
  { title: "Pocahontas", year: "1995", role: "Music", from: "#b5532e", to: "#3d1f14" },
  { title: "Little Shop of Horrors", year: "1982", role: "Music", from: "#2f6b3a", to: "#0f2a14" },
  { title: "Aladdin", year: "1992", role: "Music & Score", from: "#2b2f8f", to: "#e6a83a" },
  { title: "The Hunchback of Notre Dame", year: "1996", role: "Music", from: "#6b4f8a", to: "#1d1530" },
  { title: "Hercules", year: "1997", role: "Music", from: "#c99a3b", to: "#3b2a12" },
  { title: "Beauty and the Beast", year: "1991", role: "Music & Score", from: "#d4a72c", to: "#3a1030" },
  { title: "Enchanted", year: "2007", role: "Music", from: "#e88fb1", to: "#4b2a5e" },
  { title: "Newsies", year: "1992", role: "Music", from: "#8a8170", to: "#2a2620" },
  { title: "Tangled", year: "2010", role: "Music & Score", from: "#f2c14e", to: "#5b3a8c" },
  { title: "The Little Mermaid", year: "1989", role: "Music & Score", from: "#2aa6a0", to: "#0d2a4a" },
];

export default function StripAccordion({ works = WORKS, defaultIndex = 2, loop = false }: Props) {
  const [active, setActive] = useState(defaultIndex);
  const [demo, setDemo] = useState(loop);

  useEffect(() => {
    if (!demo) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % works.length), 2200);
    return () => clearInterval(id);
  }, [demo, works.length]);

  return (
    <section className="@container h-full min-h-[360px] w-full bg-[#e7e5df] p-3 text-[#1a1917]" style={{ fontFamily: SERIF }}>
      <style>{`
        @keyframes am-footage { 0% { background-position: 0% 50%; } 100% { background-position: 100% 50%; } }
        @media (prefers-reduced-motion: reduce) { .am-strip, .am-strip * { transition: none !important; animation: none !important; } }
      `}</style>
      <ul className="flex h-full min-h-[340px] flex-col gap-[3px] @2xl:flex-row" onMouseEnter={() => setDemo(false)}
        onFocus={() => setDemo(false)}
        onMouseLeave={() => setActive(defaultIndex)}
      >
        {works.map((w, i) => {
          const on = i === active;
          return (
            <li
              key={w.title}
              className="am-strip relative min-h-[28px] min-w-0 overflow-hidden rounded-[3px] @2xl:min-h-0 @2xl:min-w-[26px]"
              style={{ flexGrow: on ? 7 : 1, flexBasis: 0, transition: `flex-grow 0.8s ${EASE}` }}
            >
              <a
                href="#"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={(e) => e.preventDefault()}
                aria-label={`${w.title}, ${w.year}`}
                className="absolute inset-0 block focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#e7e5df]"
              >
                {/* "Footage": a drifting gradient stands in for the hover video */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(120deg, ${w.from}, ${w.to}, ${w.from})`,
                    backgroundSize: "300% 300%",
                    animation: on ? "am-footage 8s ease-in-out infinite alternate" : "none",
                    filter: on ? "saturate(1.15)" : "saturate(0.55) brightness(0.85)",
                    transition: `filter 0.8s ${EASE}`,
                  }}
                />
                <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />

                {/* Collapsed label */}
                <span
                  className="absolute inset-0 flex items-center justify-between px-3 text-[13px] text-white/90 @2xl:flex-col @2xl:justify-end @2xl:px-0 @2xl:py-3"
                  style={{ opacity: on ? 0 : 1, transition: `opacity 0.4s ${EASE}` }}
                >
                  <span className="truncate italic @2xl:[writing-mode:vertical-rl] @2xl:rotate-180">{w.title}</span>
                  <span className="text-[10px] opacity-70 @2xl:mt-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>

                {/* Expanded card */}
                <span
                  className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4 text-white @2xl:p-6"
                  style={{
                    opacity: on ? 1 : 0,
                    transform: on ? "none" : "translateY(16px)",
                    transition: `opacity 0.5s ${EASE} ${on ? "0.25s" : "0s"}, transform 0.8s ${EASE} ${on ? "0.2s" : "0s"}`,
                  }}
                >
                  <span className="text-[10px] tracking-[0.3em] uppercase opacity-80" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {w.year} · {w.role}
                  </span>
                  <span className="text-[clamp(22px,4.2cqw,52px)] leading-[0.95] whitespace-nowrap italic">{w.title}</span>
                  <span className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-[11px] backdrop-blur-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden="true">
                      <path d="M7 4.5v15l12-7.5z" />
                    </svg>
                    Listen
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
