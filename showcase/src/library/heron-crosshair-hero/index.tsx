import { useEffect, useRef, useState } from "react";

/**
 * Crosshair Drafting Hero — inspired by Heron AI.
 * Drafting grid with rulers, an orange crosshair that trails the cursor (lerp 0.12)
 * with a live coordinate tag, and an elevation drawing that plots itself on load.
 * When the pointer is away, the crosshair drifts on a slow Lissajous path.
 */
type Props = { title?: string; subtitle?: string };

const MONO = "'Geist Mono', ui-monospace, monospace";
const DRAW_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const ELEVATION = [
  "M40 230 H360",
  "M90 230 V70 H250 V230",
  "M250 230 V120 H320 V230",
  "M90 70 L170 30 L250 70",
  "M110 100 H150 V140 H110 Z",
  "M190 100 H230 V140 H190 Z",
  "M110 165 H150 V205 H110 Z",
  "M190 165 H230 V230",
  "M270 140 H300 V170 H270 Z",
  "M60 230 V250 M340 230 V250 M60 244 H340",
];

export default function CrosshairHero({
  title = "Works inside your design tools",
  subtitle = "AI review for CAD & BIM — clash checks, code compliance and quantities, right in your model.",
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const vRef = useRef<HTMLDivElement>(null);
  const hRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let inside = false;
    let raf = 0;
    const t0 = performance.now();

    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      // getBoundingClientRect is in screen pixels; offsetWidth is layout pixels (differs under CSS scale).
      const sx = root.offsetWidth / r.width;
      const sy = root.offsetHeight / r.height;
      target.x = (e.clientX - r.left) * sx;
      target.y = (e.clientY - r.top) * sy;
      inside = true;
    };
    const onLeave = () => (inside = false);

    const tick = (now: number) => {
      const w = root.offsetWidth;
      const h = root.offsetHeight;
      if (!inside) {
        const t = (now - t0) / 1000;
        target.x = w * (0.5 + 0.32 * Math.sin(t * 0.45));
        target.y = h * (0.5 + 0.28 * Math.sin(t * 0.7 + 1));
      }
      const k = reduce ? 1 : 0.12;
      pos.x += (target.x - pos.x) * k;
      pos.y += (target.y - pos.y) * k;
      if (vRef.current) vRef.current.style.transform = `translate3d(${pos.x}px,0,0)`;
      if (hRef.current) hRef.current.style.transform = `translate3d(0,${pos.y}px,0)`;
      if (tagRef.current) {
        tagRef.current.style.transform = `translate3d(${pos.x + 10}px,${pos.y + 10}px,0)`;
        tagRef.current.textContent = `X ${(pos.x * 10).toFixed(0).padStart(5, "0")}  Y ${(pos.y * 10).toFixed(0).padStart(5, "0")} mm`;
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

  return (
    <section
      ref={rootRef}
      className="@container relative h-full min-h-[360px] w-full cursor-crosshair overflow-hidden bg-[#fafafa] text-[#282828]"
      style={{
        backgroundImage:
          "linear-gradient(#b3b3af55 1px, transparent 1px), linear-gradient(90deg, #b3b3af55 1px, transparent 1px), linear-gradient(#b3b3af22 1px, transparent 1px), linear-gradient(90deg, #b3b3af22 1px, transparent 1px)",
        backgroundSize: "120px 120px, 120px 120px, 24px 24px, 24px 24px",
        fontFamily: "'Space Grotesk', Arial, sans-serif",
      }}
    >
      {/* Rulers */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-4 border-b border-[#b3b3af] bg-[#fafafa]"
        style={{
          backgroundImage: "linear-gradient(90deg, #72726f 1px, transparent 1px), linear-gradient(90deg, #b3b3af 1px, transparent 1px)",
          backgroundSize: "40px 100%, 8px 40%",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "16px 0, 16px 100%",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-4 border-r border-[#b3b3af] bg-[#fafafa]"
        style={{
          backgroundImage: "linear-gradient(#72726f 1px, transparent 1px), linear-gradient(#b3b3af 1px, transparent 1px)",
          backgroundSize: "100% 40px, 40% 8px",
          backgroundRepeat: "repeat-y",
          backgroundPosition: "0 16px, 100% 16px",
        }}
      />

      <div className="relative grid h-full grid-cols-1 items-center gap-6 py-10 pr-6 pl-10 @3xl:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="mb-3 text-[11px] tracking-[0.18em] text-[#fa3600] uppercase" style={{ fontFamily: MONO }}>
            [00] — Heron / AI for AEC
          </p>
          <h1 className="text-[clamp(30px,6.4cqw,76px)] leading-[0.92] font-bold tracking-[-0.03em] uppercase">{title}</h1>
          <p className="mt-4 max-w-[46ch] text-[14px] leading-relaxed text-[#414140]">{subtitle}</p>
          <div className="mt-6 flex flex-wrap gap-3" style={{ fontFamily: MONO }}>
            <a href="#demo" className="bg-[#282828] px-4 py-2.5 text-[12px] tracking-[0.08em] text-white uppercase transition-colors hover:bg-[#fa3600]">
              Book a demo →
            </a>
            <a href="#how" className="border border-[#282828] px-4 py-2.5 text-[12px] tracking-[0.08em] uppercase">
              How it works
            </a>
          </div>
        </div>

        <svg viewBox="0 0 400 270" className="hidden w-full @3xl:block" fill="none" stroke="#282828" strokeWidth="1.2" aria-label="Elevation drawing">
          {ELEVATION.map((d, i) => (
            <path
              key={d}
              d={d}
              pathLength={1}
              strokeDasharray="1"
              style={{
                strokeDashoffset: drawn ? 0 : 1,
                transition: `stroke-dashoffset 1.6s ${DRAW_EASE} ${0.15 + i * 0.12}s`,
              }}
            />
          ))}
          <circle cx="330" cy="50" r="22" stroke="#fa3600" pathLength={1} strokeDasharray="1" style={{ strokeDashoffset: drawn ? 0 : 1, transition: `stroke-dashoffset 1.4s ${DRAW_EASE} 1.4s` }} />
          <text x="200" y="264" textAnchor="middle" fill="#72726f" stroke="none" fontSize="9" fontFamily="Geist Mono, monospace">
            12 400 mm
          </text>
        </svg>
      </div>

      {/* Crosshair */}
      <div ref={vRef} aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-px bg-[#fa3600]/70" />
      <div ref={hRef} aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#fa3600]/70" />
      <div
        ref={tagRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 bg-[#282828] px-1.5 py-0.5 text-[10px] whitespace-pre text-[#fafafa]"
        style={{ fontFamily: MONO }}
      />
    </section>
  );
}
