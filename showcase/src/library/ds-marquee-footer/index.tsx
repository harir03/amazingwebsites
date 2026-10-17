import { useEffect, useRef, useState } from "react";

/**
 * Kinetic Marquee Footer — inspired by The Design Society Lyon.
 * Giant wordmark that tilts in 3D toward the cursor, an infinite lime marquee,
 * tilted sticker links, and a click-to-copy email with inline feedback.
 */
type Props = {
  email?: string;
  marquee?: string[];
};

const EASE = "cubic-bezier(0.625, 0.05, 0, 1)";

export default function MarqueeFooter({
  email = "hello@thedesignsociety.fr",
  marquee = ["Bienvenue", "Welcome", "Willkommen", "Benvenuti", "Bienvenidos"],
}: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLHeadingElement>(null);
  const [copied, setCopied] = useState(false);

  // Wordmark tilt: pointer position -> rotateX/rotateY, smoothed with a 0.08 lerp.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };
    const tick = () => {
      cur.x += (target.x - cur.x) * 0.08;
      cur.y += (target.y - cur.y) * 0.08;
      if (wordRef.current) {
        wordRef.current.style.transform = `perspective(700px) rotateY(${cur.x * 14}deg) rotateX(${-cur.y * 18}deg) skewX(${cur.x * -6}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      /* clipboard can be blocked in iframes; the feedback still shows the address */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const strip = [...marquee, ...marquee];

  return (
    <footer ref={rootRef} className="@container relative flex h-full min-h-[320px] w-full flex-col justify-end overflow-hidden bg-black text-white">
      <style>{`
        @keyframes ds-marquee { to { transform: translate3d(-50%,0,0); } }
        @media (prefers-reduced-motion: reduce) { .ds-marquee-track { animation: none !important; } }
      `}</style>

      {/* Sticker links */}
      <div className="absolute top-5 left-5 flex flex-wrap gap-3">
        {[
          { label: "Instagram", rot: -6, bg: "#bcf015", fg: "#000" },
          { label: "LinkedIn", rot: 4, bg: "#350aff", fg: "#fff" },
          { label: "Meetup", rot: -2, bg: "#fff", fg: "#000" },
        ].map((s) => (
          <a
            key={s.label}
            href="#"
            className="border-2 border-black px-3 py-1.5 text-[11px] tracking-[0.15em] uppercase shadow-[3px_3px_0_#fff3] transition-transform duration-300 hover:-translate-y-1 hover:rotate-0"
            style={{ background: s.bg, color: s.fg, rotate: `${s.rot}deg`, fontFamily: "'Geist Mono', monospace" }}
          >
            {s.label} ↗
          </a>
        ))}
      </div>

      <button
        type="button"
        onClick={copy}
        className="absolute top-5 right-5 flex items-center gap-2 border border-white/30 px-3 py-1.5 text-[11px] tracking-[0.12em] transition-colors hover:border-[#bcf015] hover:text-[#bcf015]"
        style={{ fontFamily: "'Geist Mono', monospace" }}
        aria-live="polite"
      >
        <span className="relative inline-grid overflow-hidden">
          <span className="col-start-1 row-start-1 transition-transform duration-500" style={{ transitionTimingFunction: EASE, transform: copied ? "translateY(-110%)" : "none" }}>
            {email}
          </span>
          <span className="col-start-1 row-start-1 text-[#bcf015] transition-transform duration-500" style={{ transitionTimingFunction: EASE, transform: copied ? "none" : "translateY(110%)" }}>
            Copied ✓
          </span>
        </span>
      </button>

      <div className="px-4 pb-3 [perspective:700px]">
        <h2
          ref={wordRef}
          className="origin-bottom text-center text-[clamp(34px,11.5cqw,150px)] leading-[0.85] tracking-tight uppercase will-change-transform"
          style={{ fontFamily: "'Silkscreen', 'VT323', monospace" }}
        >
          The Design
          <br />
          Society
        </h2>
      </div>

      <div className="relative -rotate-2 border-y-2 border-black bg-[#bcf015] py-2 text-black" aria-label={marquee.join(", ")}>
        <div
          className="ds-marquee-track flex w-max gap-8 whitespace-nowrap"
          style={{ animation: "ds-marquee 18s linear infinite" }}
          aria-hidden="true"
        >
          {strip.map((m, i) => (
            <span key={i} className="flex items-center gap-8 text-[clamp(16px,2.4cqw,26px)] uppercase" style={{ fontFamily: "'Silkscreen', monospace" }}>
              {m} <span className="text-[#350aff]">✦</span>
            </span>
          ))}
        </div>
      </div>
      <div className="flex justify-between px-5 py-3 text-[10px] tracking-[0.2em] text-white/50 uppercase" style={{ fontFamily: "'Geist Mono', monospace" }}>
        <span>© TDS Lyon</span>
        <span>Association loi 1901</span>
      </div>
    </footer>
  );
}
