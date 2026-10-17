import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * Rotating Type Hero — inspired by Hello Monday.
 * "We make [Experiences]" — the last word rolls out letter by letter and the next rolls
 * in, while its slot eases to the new word's width. A doodled face watches the cursor.
 */
type Props = { words?: string[]; interval?: number };

const SERIF = "'Zilla Slab', 'Clarendon', Georgia, serif";
const SANS = "'Inter', 'Helvetica Neue', Arial, sans-serif";
const EASE_IN = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
const EASE_OUT = "cubic-bezier(0.6, 0.2, 0, 0.8)";
const STAGGER = 0.025;

function Face() {
  const ref = useRef<SVGGElement>(null);
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const svg = ref.current?.ownerSVGElement;
      if (!svg || !ref.current) return;
      const r = svg.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(6, d / 30) / d;
      ref.current.style.transform = `translate(${dx * k}px, ${dy * k}px)`;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
      <style>{`@keyframes hm-blink{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}`}</style>
      <path d="M60 8c30 0 52 20 52 52s-22 52-52 52S8 92 8 60 30 8 60 8Z" fill="#ffd25a" stroke="#191919" strokeWidth="3" />
      <g ref={ref} style={{ transition: "transform .25s cubic-bezier(0.25,0.46,0.45,0.94)" }}>
        <g style={{ transformOrigin: "60px 52px", animation: "hm-blink 4s infinite" }}>
          <circle cx="44" cy="52" r="6" fill="#191919" />
          <circle cx="76" cy="52" r="6" fill="#191919" />
        </g>
        <path d="M44 78c8 8 24 8 32 0" fill="none" stroke="#191919" strokeWidth="3.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export default function RotatingTypeHero({ words = ["Experiences", "Branding", "Products", "Campaigns"], interval = 2400 }: Props) {
  const [{ index, prev }, setSlot] = useState<{ index: number; prev: number | null }>({ index: 0, prev: null });
  const [width, setWidth] = useState<number | undefined>(undefined);
  const measureRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setSlot((s) => ({ prev: s.index, index: (s.index + 1) % words.length }));
    }, interval);
    return () => clearInterval(id);
  }, [interval, words.length]);

  // Measure the incoming word so the slot can ease to its width.
  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const measure = () => setWidth(el.offsetWidth);
    measure();
    document.fonts?.ready.then(measure);
  }, [index]);

  const renderWord = (w: string, state: "in" | "out", key: string) => (
    <span key={key} className="absolute top-0 left-0 flex whitespace-nowrap" aria-hidden="true">
      {w.split("").map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em]">
          <span
            className="inline-block"
            style={{
              animation: `${state === "in" ? "hm-roll-in" : "hm-roll-out"} ${state === "in" ? 0.6 : 0.45}s ${state === "in" ? EASE_IN : EASE_OUT} ${i * STAGGER}s both`,
            }}
          >
            {ch}
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <section className="@container relative flex h-full min-h-[320px] w-full flex-col justify-between overflow-hidden bg-[#f8f6f5] p-6 text-[#191919]" style={{ fontFamily: SANS }}>
      <style>{`
        @keyframes hm-roll-in { from { transform: translateY(105%); } to { transform: none; } }
        @keyframes hm-roll-out { from { transform: none; } to { transform: translateY(-105%); } }
      `}</style>
      <div className="flex items-center justify-between text-[13px]">
        <span className="text-[20px] font-light" style={{ fontFamily: SERIF }}>
          Hello Monday
        </span>
        <span className="rounded-full border border-[#191919]/20 px-3 py-1 text-[11px]">Part of DEPT®</span>
      </div>

      <div className="flex items-end justify-between gap-4">
        <h1 className="text-[clamp(36px,9cqw,112px)] leading-[0.95] font-light tracking-[-0.02em]" style={{ fontFamily: SERIF }}>
          We make
          <br />
          <span className="sr-only">{words[index]}</span>
          <span
            className="relative inline-block h-[1.08em] align-bottom"
            style={{ width, transition: `width 0.6s ${EASE_IN}` }}
          >
            {prev !== null && renderWord(words[prev], "out", `o-${prev}-${index}`)}
            {renderWord(words[index], "in", `i-${index}`)}
          </span>
          <span className="text-[#c6c5c5]">.</span>
        </h1>
        <div className="hidden h-[clamp(80px,18cqw,180px)] w-[clamp(80px,18cqw,180px)] shrink-0 @xl:block">
          <Face />
        </div>
      </div>

      {/* Invisible copy of the current word, used only to measure its width */}
      <span
        ref={measureRef}
        aria-hidden="true"
        className="pointer-events-none invisible absolute top-0 left-0 text-[clamp(36px,9cqw,112px)] font-light tracking-[-0.02em] whitespace-nowrap"
        style={{ fontFamily: SERIF }}
      >
        {words[index]}
      </span>
    </section>
  );
}
