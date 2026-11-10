import { useEffect, useRef, useState } from "react";

/**
 * Glassmorphic Floating Dock — inspired by Emotion Agency.
 * A frosted capsule pinned to the bottom: brand mark, links with a hover pill,
 * a live equalizer sound toggle, and a settings button that grows into a rounded
 * panel with an overshooting spring. The theme switch inside recolours the page.
 */
type Props = {
  links?: string[];
  /** Demo mode: open the settings and flip the theme on a timer until the user interacts. */
  loop?: boolean;
};

const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const EXPO = "cubic-bezier(0.16, 1, 0.3, 1)";
const SANS = "'Inter Tight', 'PP Neue Montreal', 'Helvetica Neue', sans-serif";
const MONO = "'IBM Plex Mono', monospace";

const THEMES = {
  light: { bg: "#f5efff", fg: "#2a1647", muted: "#64698b", glass: "rgba(255,255,255,0.55)", border: "rgba(255,255,255,0.75)", card: "#ffffff" },
  dark: { bg: "#121212", fg: "#ffffff", muted: "#a3a6c1", glass: "rgba(24,24,24,0.55)", border: "rgba(255,255,255,0.12)", card: "#181818" },
};

function Toggle({ label, on, onChange, fg }: { label: string; on: boolean; onChange: (v: boolean) => void; fg: string }) {
  return (
    <button type="button" role="switch" aria-checked={on} onClick={() => onChange(!on)} className="flex w-full items-center justify-between gap-4 py-1.5 text-[13px]" style={{ color: fg }}>
      {label}
      <span className="relative h-5 w-9 rounded-full transition-colors duration-300" style={{ background: on ? "#9047ff" : "rgba(127,127,140,0.35)" }}>
        <span className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-300" style={{ transform: on ? "translateX(16px)" : "none", transitionTimingFunction: SPRING }} />
      </span>
    </button>
  );
}

export default function GlassDock({ links = ["Work", "About", "Contact"], loop = false }: Props) {
  const [dark, setDark] = useState(false);
  const [sound, setSound] = useState(true);
  const [motion, setMotion] = useState(true);
  const [panel, setPanel] = useState(false);
  const [hover, setHover] = useState<number | null>(null);
  const [pill, setPill] = useState({ left: 0, width: 0 });
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const [demo, setDemo] = useState(loop);
  const t = dark ? THEMES.dark : THEMES.light;

  useEffect(() => {
    if (!demo) return;
    let step = 0;
    const id = window.setInterval(() => {
      step++;
      setPanel(step % 2 === 1);
      if (step % 4 === 2) setDark((d) => !d);
    }, 2200);
    return () => clearInterval(id);
  }, [demo]);

  useEffect(() => {
    const el = hover === null ? null : linkRefs.current[hover];
    if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth });
  }, [hover]);

  useEffect(() => {
    if (panelRef.current) panelRef.current.inert = !panel;
    if (!panel) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPanel(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panel]);

  const glass = {
    background: t.glass,
    backdropFilter: "blur(20px) saturate(160%)",
    WebkitBackdropFilter: "blur(20px) saturate(160%)",
    border: `1px solid ${t.border}`,
    boxShadow: "0 20px 50px -20px rgba(42,22,71,0.45), inset 0 1px 0 rgba(255,255,255,0.35)",
  };

  return (
    <div
      onPointerDown={() => setDemo(false)}
      onKeyDown={() => setDemo(false)}
      className="@container relative h-full min-h-[340px] w-full overflow-hidden transition-colors duration-700"
      style={{ background: t.bg, color: t.fg, fontFamily: SANS }}
    >
      <style>{`
        @keyframes emo-eq { 0%,100% { transform: scaleY(.3); } 50% { transform: scaleY(1); } }
        @keyframes emo-float { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(0,-14px,0); } }
        @media (prefers-reduced-motion: reduce) { .emo-anim { animation: none !important; } }
      `}</style>

      {/* Page behind the glass */}
      <div aria-hidden="true" className="emo-anim absolute top-[12%] left-[12%] h-40 w-40 rounded-full bg-[#9047ff] opacity-60 blur-3xl" style={{ animation: motion ? "emo-float 6s ease-in-out infinite" : "none" }} />
      <div aria-hidden="true" className="emo-anim absolute top-[30%] right-[10%] h-48 w-48 rounded-full bg-[#ff9ad5] opacity-40 blur-3xl" style={{ animation: motion ? "emo-float 8s ease-in-out infinite reverse" : "none" }} />
      <div className="relative px-6 pt-8">
        <p className="text-[11px] tracking-[0.14em] uppercase" style={{ fontFamily: MONO, color: t.muted }}>
          Digital agency — since 2016
        </p>
        <h2 className="mt-2 max-w-[14ch] text-[clamp(30px,6.5cqw,72px)] leading-[0.95] font-light italic" style={{ fontFamily: "'Cormorant Garamond', 'Emotion Serif', serif" }}>
          We design feelings people remember.
        </h2>
      </div>

      {/* Settings panel: grows out of the gear button */}
      <div
        ref={panelRef}
        id="emo-settings"
        role="dialog"
        aria-label="Settings"
        className="absolute bottom-[84px] left-1/2 z-20 w-[min(280px,calc(100%-32px))] origin-bottom-right overflow-hidden p-4"
        style={{
          ...glass,
          background: dark ? "rgba(24,24,24,0.8)" : "rgba(255,255,255,0.78)",
          borderRadius: panel ? 24 : 999,
          transform: `translateX(-30%) scale(${panel ? 1 : 0.2})`,
          opacity: panel ? 1 : 0,
          transition: `transform 0.55s ${SPRING}, opacity 0.3s ${EXPO}, border-radius 0.55s ${EXPO}`,
        }}
      >
        <p className="mb-2 text-[11px] tracking-[0.14em] uppercase" style={{ fontFamily: MONO, color: t.muted }}>
          Settings
        </p>
        <Toggle label="Dark mode" on={dark} onChange={setDark} fg={t.fg} />
        <Toggle label="Sound" on={sound} onChange={setSound} fg={t.fg} />
        <Toggle label="Motion" on={motion} onChange={setMotion} fg={t.fg} />
      </div>

      {/* Dock */}
      <nav aria-label="Main" className="absolute inset-x-0 bottom-5 z-30 flex justify-center px-3">
        <div className="flex items-center gap-1 rounded-full p-1.5" style={glass}>
          <a href="#top" aria-label="Emotion, home" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#9047ff] text-[22px] leading-none text-white italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            e
          </a>
          <ul className="relative hidden items-center @md:flex" onMouseLeave={() => setHover(null)}>
            <li
              aria-hidden="true"
              className="absolute inset-y-0 rounded-full"
              style={{
                left: pill.left,
                width: pill.width,
                background: dark ? "rgba(255,255,255,0.1)" : "rgba(144,71,255,0.12)",
                opacity: hover === null ? 0 : 1,
                transition: `left .45s ${EXPO}, width .45s ${EXPO}, opacity .25s`,
              }}
            />
            {links.map((l, i) => (
              <li key={l} className="relative">
                <a
                  ref={(el) => {
                    linkRefs.current[i] = el;
                  }}
                  href="#"
                  onMouseEnter={() => setHover(i)}
                  onFocus={() => setHover(i)}
                  className="block rounded-full px-4 py-2.5 text-[14px] font-medium"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            aria-pressed={sound}
            aria-label={sound ? "Mute sound" : "Unmute sound"}
            onClick={() => setSound((s) => !s)}
            className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-[#9047ff]/10"
          >
            <span className="flex h-4 items-end gap-[2px]" aria-hidden="true">
              {[0.9, 0.6, 1.1, 0.75].map((d, i) => (
                <span
                  key={i}
                  className="emo-anim block h-full w-[3px] origin-bottom rounded-full"
                  style={{
                    background: t.fg,
                    transform: sound ? undefined : "scaleY(0.25)",
                    animation: sound && motion ? `emo-eq ${d}s ease-in-out ${i * 0.12}s infinite` : "none",
                  }}
                />
              ))}
            </span>
          </button>
          <button
            type="button"
            aria-expanded={panel}
            aria-controls="emo-settings"
            aria-label="Settings"
            onClick={() => setPanel((p) => !p)}
            className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-[#9047ff]/10"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" style={{ transform: panel ? "rotate(90deg)" : "none", transition: `transform .55s ${SPRING}` }}>
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" strokeLinecap="round" />
            </svg>
          </button>
          <a href="#contact" className="ml-1 hidden rounded-full bg-[#9047ff] px-4 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#7114ff] @lg:block">
            Let&apos;s talk
          </a>
        </div>
      </nav>
    </div>
  );
}
