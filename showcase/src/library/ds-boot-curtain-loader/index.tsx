import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Boot Curtain Loader — inspired by The Design Society Lyon.
 * A black boot screen counts to 100, the wordmark rises letter by letter,
 * then a grid of electric-blue pixels pops away in random order to reveal the page.
 */
type Props = {
  /** Replay the sequence forever (useful for demos). */
  loop?: boolean;
  onComplete?: () => void;
  cols?: number;
  rows?: number;
  title?: string;
};

const EASE = "cubic-bezier(0.625, 0.05, 0, 1)";
const COUNT_MS = 2400;
const CURTAIN_MS = 900;

function shuffledIndices(n: number) {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function BootCurtainLoader({
  loop = false,
  onComplete,
  cols = 14,
  rows = 9,
  title = "THE DESIGN SOCIETY",
}: Props) {
  const [run, setRun] = useState(0);
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"boot" | "pixels">("boot");
  const doneRef = useRef(onComplete);
  const loopRef = useRef(loop);
  doneRef.current = onComplete;
  loopRef.current = loop;

  const total = cols * rows;
  // A fresh pop-out order on every run.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const order = useMemo(() => shuffledIndices(total), [total, run]);

  useEffect(() => {
    const timers: number[] = [];
    let raf = 0;
    setPhase("boot");
    setCount(0);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(100);
      setPhase("pixels");
      doneRef.current?.();
      return;
    }

    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / COUNT_MS, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 4)) * 100)); // easeOutQuart
      if (p < 1) {
        raf = requestAnimationFrame(tick);
        return;
      }
      timers.push(window.setTimeout(() => setPhase("pixels"), 350));
      timers.push(
        window.setTimeout(() => {
          doneRef.current?.();
          if (loopRef.current) timers.push(window.setTimeout(() => setRun((r) => r + 1), 2200));
        }, 350 + CURTAIN_MS),
      );
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, [run]);

  const booting = phase === "boot";
  const titleIn = count > 4;

  return (
    <div className="@container relative h-full min-h-[280px] w-full overflow-hidden bg-white text-black" aria-busy={booting}>
      {/* Revealed page */}
      <div className="absolute inset-0 grid place-items-center p-6 text-center">
        <div>
          <p className="mb-3 text-[11px] tracking-[0.3em] uppercase" style={{ fontFamily: "'Geist Mono', monospace" }}>
            Lyon — Société secrète
          </p>
          <h2
            className="text-[clamp(28px,7cqw,72px)] leading-[0.9] text-[#350aff]"
            style={{ fontFamily: "'Silkscreen', 'VT323', monospace" }}
          >
            BIENVENUE
          </h2>
        </div>
      </div>

      {/* Pixel curtain: every cell disappears instantly, at its own delay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 grid"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}
      >
        {order.map((rank, i) => (
          <span
            key={`${run}-${i}`}
            className="bg-[#350aff]"
            style={{
              opacity: booting ? 1 : 0,
              transition: booting ? "none" : `opacity 0s linear ${((rank / total) * CURTAIN_MS) / 1000}s`,
            }}
          />
        ))}
      </div>

      {/* Boot screen */}
      <div
        role="status"
        aria-live="polite"
        className="absolute inset-0 flex flex-col justify-between bg-black p-5 text-white"
        style={{ visibility: booting ? "visible" : "hidden" }}
      >
        <div className="flex justify-between text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: "'Geist Mono', monospace" }}>
          <span>Booting_</span>
          <span>{String(count).padStart(3, "0")}%</span>
        </div>

        <h1
          aria-label={title}
          className="flex flex-wrap justify-center overflow-hidden text-center text-[clamp(22px,5.5cqw,56px)] leading-none"
          style={{ fontFamily: "'Silkscreen', 'VT323', monospace" }}
        >
          {title.split("").map((ch, i) => (
            <span key={i} className="inline-block overflow-hidden" aria-hidden="true">
              <span
                className="inline-block"
                style={{
                  transform: titleIn ? "translateY(0)" : "translateY(110%)",
                  transition: `transform 0.6s ${EASE} ${i * 0.02}s`,
                }}
              >
                {ch === " " ? " " : ch}
              </span>
            </span>
          ))}
        </h1>

        <div className="h-[3px] w-full bg-white/15">
          <div className="h-full origin-left bg-[#bcf015]" style={{ transform: `scaleX(${count / 100})` }} />
        </div>
      </div>
    </div>
  );
}
