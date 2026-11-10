import { useEffect, useRef, useState } from "react";

/**
 * Wealth HUD & Danger Meter — inspired by Don't Look Up.
 * Neo-brutalist top HUD: a money counter that ticks up by the second, a bobbing
 * "+$/s" sticker, a round timer, and a "looking up" meter that creeps toward red.
 * Past 70% an alarm banner drops in and flashes; "Distract" buys the crowd back.
 */
type Props = {
  startWealth?: number;
  ratePerSecond?: number;
  distractCost?: number;
  /** Demo mode: press "Distract" automatically when the meter is nearly full. */
  loop?: boolean;
};

const POP = "cubic-bezier(0.2, 1.5, 0.32, 1)";
const DISPLAY = "'Luckiest Guy', 'Marsipan', cursive";

const money = (n: number) => "$" + Math.floor(n).toLocaleString("en-US");

export default function WealthHud({ startWealth = 1_204_550, ratePerSecond = 12_400, distractCost = 50_000, loop = false }: Props) {
  const [wealth, setWealth] = useState(startWealth);
  const [danger, setDanger] = useState(22);
  const [seconds, setSeconds] = useState(179);
  const [kick, setKick] = useState(0);
  const last = useRef(performance.now());

  useEffect(() => {
    let raf = 0;
    let acc = 0;
    const tick = (now: number) => {
      const dt = (now - last.current) / 1000;
      last.current = now;
      setWealth((w) => w + ratePerSecond * dt);
      setDanger((d) => Math.min(100, d + dt * 7.5)); // crowd slowly gets curious
      acc += dt;
      if (acc >= 1) {
        acc -= 1;
        setSeconds((s) => (s <= 0 ? 179 : s - 1));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ratePerSecond]);

  const distract = () => {
    if (wealth < distractCost) return;
    setWealth((w) => w - distractCost);
    setDanger((d) => Math.max(0, d - 38));
    setKick((k) => k + 1);
  };

  const autoRef = useRef(distract);
  autoRef.current = distract;
  const overdue = loop && danger >= 92;
  useEffect(() => {
    if (!overdue) return;
    const t = window.setTimeout(() => autoRef.current(), 900);
    return () => clearTimeout(t);
  }, [overdue]);

  const warn = danger >= 40;
  const alarm = danger >= 70;
  const status = alarm ? "They're organising!" : warn ? "Getting curious…" : "Nicely distracted";
  const fill = alarm ? "#c0342a" : warn ? "#f2c31a" : "#9abeef";

  return (
    <div className="@container relative h-full min-h-[300px] w-full overflow-hidden bg-[#f4f3ef] text-[#14140f]" style={{ fontFamily: "'Nunito', system-ui, sans-serif" }}>
      <style>{`
        @keyframes dlu-bob { 0%,100% { transform: translateY(0) rotate(-1.1deg); } 50% { transform: translateY(-6px) rotate(-1.1deg); } }
        @keyframes dlu-urgent { 0%,100% { background: #000; border-color: #f4f3ef; } 50% { background: #c0342a; border-color: #fff; } }
        @keyframes dlu-kick { 0% { transform: scale(1); } 30% { transform: scale(1.12) rotate(-2deg); } 100% { transform: scale(1); } }
        @media (prefers-reduced-motion: reduce) { .dlu-anim { animation: none !important; } }
      `}</style>

      {/* Alarm banner */}
      <div
        role="alert"
        aria-hidden={!alarm}
        className="dlu-anim absolute inset-x-3 top-0 z-20 rounded-b-xl border-2 border-t-0 px-4 py-2 text-center text-[clamp(14px,2.6cqw,20px)] tracking-wide text-white uppercase"
        style={{
          fontFamily: DISPLAY,
          transform: alarm ? "translateY(0)" : "translateY(-110%)",
          transition: `transform 0.5s ${POP}`,
          animation: alarm ? "dlu-urgent 900ms ease-in-out infinite" : "none",
          background: "#000",
        }}
      >
        ⚠ They&apos;re looking up! Distract them!
      </div>

      <div className="flex flex-wrap items-stretch gap-2 p-3 pt-12 @xl:flex-nowrap">
        <div className="flex items-center rounded-xl border-2 border-[#14140f] bg-white px-3 py-2 shadow-[2px_3px_0_#14140f]">
          <span className="text-[clamp(16px,2.6cqw,22px)] leading-none text-[#f2c31a]" style={{ fontFamily: DISPLAY, WebkitTextStroke: "1px #14140f" }}>
            DON&apos;T LOOK UP
          </span>
        </div>

        <div className="relative flex flex-1 items-center gap-3 rounded-xl border-2 border-[#14140f] bg-white px-3 py-2 shadow-[2px_3px_0_#14140f]">
          <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-[#14140f] bg-[radial-gradient(circle_at_35%_35%,#f8e08a,#f2c31a_55%,#c98f06)] text-[13px] font-black">
            $
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-extrabold tracking-[0.14em] uppercase opacity-60">Your wealth</p>
            <p className="text-[clamp(18px,3.4cqw,28px)] leading-none tabular-nums" style={{ fontFamily: DISPLAY }} aria-live="off">
              {money(wealth)}
            </p>
          </div>
          <span
            className="dlu-anim absolute -top-3 right-2 rounded-md border-2 border-[#14140f] bg-[#9abeef] px-2 py-0.5 text-[11px] font-black shadow-[2px_3px_0_#14140f]"
            style={{ animation: "dlu-bob 2.3s ease-in-out infinite" }}
          >
            +{money(ratePerSecond)}/s
          </span>
        </div>

        <div className="flex items-center gap-2 rounded-xl border-2 border-[#14140f] bg-white px-3 py-2 shadow-[2px_3px_0_#14140f]">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#14140f" strokeWidth="2.5" aria-hidden="true">
            <circle cx="12" cy="13" r="8" />
            <path d="M12 9v4l2.5 2M9 2h6" strokeLinecap="round" />
          </svg>
          <span className="text-[18px] tabular-nums" style={{ fontFamily: DISPLAY }} aria-label={`${seconds} seconds left`}>
            {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Danger meter */}
      <div className="mx-3 rounded-xl border-2 border-[#14140f] bg-white p-3 shadow-[2px_3px_0_#14140f]">
        <div className="mb-2 flex items-center justify-between text-[11px] font-extrabold tracking-[0.12em] uppercase">
          <span>👀 Looking up</span>
          <span style={{ color: alarm ? "#c0342a" : warn ? "#8a5d02" : "#2b5a9b" }}>{status}</span>
        </div>
        <div
          className="h-5 overflow-hidden rounded-full border-2 border-[#14140f] bg-[#f4f3ef]"
          role="meter"
          aria-label="Crowd looking up"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(danger)}
        >
          <div className="h-full rounded-full border-r-2 border-[#14140f]" style={{ width: `${danger}%`, background: fill, transition: "background 0.4s, width 0.3s ease-out" }} />
        </div>
      </div>

      <div className="flex justify-center p-4">
        <button
          type="button"
          onClick={distract}
          disabled={wealth < distractCost}
          key={kick}
          className="dlu-anim rounded-xl border-2 border-[#14140f] bg-[#f2c31a] px-5 py-2.5 text-[15px] tracking-wide uppercase shadow-[2px_3px_0_#14140f] transition-[transform,box-shadow] duration-150 active:translate-x-[2px] active:translate-y-[3px] active:shadow-none disabled:opacity-50"
          style={{ fontFamily: DISPLAY, animation: kick ? `dlu-kick 0.4s ${POP}` : "none" }}
        >
          📺 Distract them · −{money(distractCost)}
        </button>
      </div>
    </div>
  );
}
