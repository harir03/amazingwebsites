import { useEffect, useRef, useState } from "react";

/**
 * Audio-Gated Entrance Loader — inspired by Emotion Agency's AppLoader.
 * A mono percentage climbs with a hairline violet bar, then the gate asks how you want
 * to enter: with sound or without. Entering wipes the loader away with a clip-path
 * curtain; "with sound" fades in an ambient pad synthesised with Web Audio.
 */
type Props = {
  muted?: boolean;
  /** Demo mode: enter silently by itself and replay. */
  loop?: boolean;
  onEnter?: (withSound: boolean) => void;
  duration?: number;
};

const CURTAIN = "cubic-bezier(0.65, 0, 0.35, 1)";
const EXPO = "cubic-bezier(0.16, 1, 0.3, 1)";
const MONO = "'IBM Plex Mono', monospace";
const SERIF = "'Cormorant Garamond', 'Emotion Serif', Georgia, serif";

function playPad() {
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return;
  const ctx = new AC();
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 900;
  const master = ctx.createGain();
  const now = ctx.currentTime;
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.12, now + 1.6);
  master.gain.exponentialRampToValueAtTime(0.0001, now + 5.5);
  filter.connect(master).connect(ctx.destination);
  // A2, E3, B3 with gentle detune for a soft, wide pad.
  [110, 164.81, 246.94].forEach((f, i) => {
    [-6, 6].forEach((cents) => {
      const o = ctx.createOscillator();
      o.type = i === 0 ? "sine" : "triangle";
      o.frequency.value = f;
      o.detune.value = cents;
      o.connect(filter);
      o.start(now);
      o.stop(now + 5.6);
    });
  });
  window.setTimeout(() => ctx.close(), 6000);
}

export default function AudioGateLoader({ muted = false, loop = false, onEnter, duration = 2200 }: Props) {
  const [run, setRun] = useState(0);
  const [pct, setPct] = useState(0);
  const [entered, setEntered] = useState(false);
  const loopRef = useRef(loop);
  loopRef.current = loop;
  const firstBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setPct(0);
    setEntered(false);
    const timers: number[] = [];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPct(100);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      // Uneven, "real" feeling progress: fast start, a stall around 70%, then done.
      const eased = p < 0.6 ? (p / 0.6) * 0.7 : 0.7 + Math.pow((p - 0.6) / 0.4, 2) * 0.3;
      setPct(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else if (loopRef.current) {
        timers.push(window.setTimeout(() => setEntered(true), 1600));
        timers.push(window.setTimeout(() => setRun((r) => r + 1), 4800));
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, [run, duration]);

  const ready = pct >= 100;
  useEffect(() => {
    // Move focus to the gate only if nothing else on the page has it.
    if (ready && !loopRef.current && document.activeElement === document.body) firstBtn.current?.focus({ preventScroll: true });
  }, [ready]);

  const enter = (withSound: boolean) => {
    if (withSound && !muted) playPad();
    setEntered(true);
    onEnter?.(withSound);
  };

  return (
    <div className="@container relative h-full min-h-[320px] w-full overflow-hidden bg-[#f5efff] text-[#2a1647]">
      {/* Revealed page */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <p className="text-[11px] tracking-[0.14em] text-[#64698b] uppercase" style={{ fontFamily: MONO }}>
          ( 01 ) — Welcome
        </p>
        <h1
          className="text-[clamp(36px,8cqw,96px)] leading-[0.92] font-light italic"
          style={{
            fontFamily: SERIF,
            transform: entered ? "none" : "translateY(30px)",
            opacity: entered ? 1 : 0,
            transition: `transform 1.2s ${EXPO} 0.5s, opacity 1s ${EXPO} 0.5s`,
          }}
        >
          We craft emotions.
        </h1>
      </div>

      {/* Loader */}
      <div
        role="status"
        aria-live="polite"
        className="absolute inset-0 flex flex-col justify-between bg-[#121212] p-6 text-white"
        style={{ clipPath: entered ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)", transition: `clip-path 1.1s ${CURTAIN}` }}
      >
        <div className="flex items-start justify-between">
          <span className="text-[clamp(22px,3.6cqw,32px)] font-light italic" style={{ fontFamily: SERIF }}>
            emotion
          </span>
          <span className="text-[11px] tracking-[0.12em] text-[#a3a6c1] uppercase" style={{ fontFamily: MONO }}>
            Loading experience
          </span>
        </div>

        <div className="flex flex-col items-center gap-5">
          <span className="text-[clamp(56px,14cqw,140px)] leading-none font-light tabular-nums" style={{ fontFamily: MONO }} aria-label={`${pct} percent loaded`}>
            {String(pct).padStart(3, "0")}
          </span>
          <div
            className="flex flex-wrap justify-center gap-3"
            style={{ opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(10px)", transition: `opacity .6s ${EXPO}, transform .6s ${EXPO}`, pointerEvents: ready ? "auto" : "none" }}
          >
            <button
              ref={firstBtn}
              type="button"
              onClick={() => enter(true)}
              tabIndex={ready ? 0 : -1}
              className="flex items-center gap-2 rounded-full bg-[#9047ff] px-5 py-3 text-[14px] font-medium transition-colors hover:bg-[#7114ff]"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 9v6h4l5 4V5L8 9H4zM16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Enter with sound
            </button>
            <button
              type="button"
              onClick={() => enter(false)}
              tabIndex={ready ? 0 : -1}
              className="rounded-full border border-white/20 px-5 py-3 text-[14px] font-medium text-white/80 transition-colors hover:border-white/50 hover:text-white"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              Enter without sound
            </button>
          </div>
        </div>

        <div>
          <div className="h-px w-full bg-white/15">
            <div className="h-full origin-left bg-[#9047ff]" style={{ transform: `scaleX(${pct / 100})` }} />
          </div>
          <div className="mt-2 flex justify-between text-[10px] tracking-[0.12em] text-[#a3a6c1] uppercase" style={{ fontFamily: MONO }}>
            <span>Headphones recommended</span>
            <span>© 2016—2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
