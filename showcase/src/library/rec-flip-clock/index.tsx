import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * Split-Flap Countdown — inspired by Recursive's "5-minute scoring" countdown.
 * Each digit is a card cut in half. On change, the top flap folds down (260ms),
 * the new bottom flap drops in (300ms, starting at 260ms), a shadow is cast over
 * the lower half, and a puff of vapour escapes the seam.
 */
type Props = {
  /** Countdown target. Defaults to a rolling 3 days from mount. */
  target?: Date;
  smoke?: boolean;
};

const CSS = `
.fkc{--w:clamp(2.3rem,8.4cqw,5.4rem);--h:calc(var(--w)*1.42);--r:calc(var(--w)*.14);--ink:#F4F7EC;--face-b:#16240F}
.fkc-cell{position:relative;display:block;width:var(--w);height:var(--h)}
.fkc-digit{position:absolute;inset:0;overflow:hidden;border-radius:var(--r);background:var(--face-b);isolation:isolate;
  box-shadow:0 1px 0 rgba(255,255,255,.34),0 12px 28px -14px rgba(16,32,14,.8),0 2px 6px -2px rgba(16,32,14,.4)}
.fkc-half,.fkc-flap{position:absolute;left:0;right:0;height:50%;overflow:hidden;display:flex;justify-content:center;backface-visibility:hidden}
.fkc-top,.fkc-fold{top:0;align-items:flex-start;border-radius:var(--r) var(--r) 0 0;background:linear-gradient(180deg,#3A5A31 0%,#2A4324 100%);box-shadow:inset 0 1px 0 rgba(214,236,196,.26)}
.fkc-bottom,.fkc-drop{bottom:0;align-items:flex-end;border-radius:0 0 var(--r) var(--r);background:linear-gradient(180deg,#1E3218 0%,var(--face-b) 100%);box-shadow:inset 0 -1px 0 rgba(0,0,0,.5)}
.fkc-digit b{display:block;width:100%;height:var(--h);font:400 calc(var(--w)*1.06)/var(--h) 'Bebas Neue',sans-serif;text-align:center;color:var(--ink);text-shadow:0 1px 0 rgba(0,0,0,.4);font-variant-numeric:tabular-nums}
.fkc-anim{position:absolute;inset:0;perspective:calc(var(--h)*5.2);transform-style:preserve-3d}
.fkc-fold{z-index:3;transform-origin:50% 100%;animation:fkc-fold 260ms cubic-bezier(.4,0,.7,1) forwards}
.fkc-drop{z-index:4;transform-origin:50% 0%;opacity:0;animation:fkc-drop 300ms cubic-bezier(.16,.95,.3,1) 260ms forwards}
.fkc-cast{position:absolute;left:0;right:0;bottom:0;height:50%;z-index:2;border-radius:0 0 var(--r) var(--r);background:linear-gradient(180deg,rgba(0,0,0,.65),rgba(0,0,0,0) 78%);animation:fkc-cast 560ms cubic-bezier(.33,0,.2,1) forwards}
.fkc-seam{position:absolute;left:0;right:0;top:50%;height:1px;z-index:5;background:rgba(0,0,0,.55)}
.fkc-gloss{position:absolute;inset:0;z-index:5;pointer-events:none;background:linear-gradient(180deg,rgba(255,255,255,.08),transparent 45%)}
.fkc-smoke{position:absolute;left:50%;top:50%;width:1px;height:1px;z-index:6;pointer-events:none}
.fkc-smoke i{position:absolute;left:0;top:0;width:calc(var(--w)*.95);aspect-ratio:1;border-radius:50%;opacity:0;transform:translate(-50%,-50%) scale(.16);
  background:radial-gradient(circle at 50% 58%,rgba(246,250,240,.72) 0%,rgba(224,238,212,.3) 44%,rgba(210,228,198,0) 74%);filter:blur(calc(var(--w)*.13));
  animation:fkc-puff 800ms cubic-bezier(.2,.6,.28,1) var(--d) forwards}
@keyframes fkc-fold{0%{transform:rotateX(0);opacity:1}99%{opacity:1}100%{transform:rotateX(-90deg);opacity:0}}
@keyframes fkc-drop{0%{transform:rotateX(90deg);opacity:0}1%{opacity:1}100%{transform:rotateX(0);opacity:1}}
@keyframes fkc-cast{0%{opacity:.9}45%{opacity:.65}100%{opacity:0}}
@keyframes fkc-puff{0%{opacity:0;transform:translate(-50%,-50%) scale(.16)}20%{opacity:.42}50%{opacity:.24}100%{opacity:0;transform:translate(var(--x),var(--y)) scale(var(--sc))}}
@media (prefers-reduced-motion:reduce){.fkc-anim,.fkc-smoke{display:none}}
`;

const PUFFS = [
  { d: "0ms", x: "-58%", y: "-128%", sc: 1.75 },
  { d: "50ms", x: "-40%", y: "-96%", sc: 2.2 },
  { d: "100ms", x: "-64%", y: "-70%", sc: 1.5 },
  { d: "150ms", x: "-46%", y: "-146%", sc: 2.6 },
];

function FlipCard({ digit, smoke }: { digit: string; smoke: boolean }) {
  const prev = useRef(digit);
  const [anim, setAnim] = useState<{ from: string; to: string; k: number } | null>(null);

  useEffect(() => {
    if (prev.current === digit) return;
    const from = prev.current;
    prev.current = digit;
    setAnim((a) => ({ from, to: digit, k: (a?.k ?? 0) + 1 }));
    const t = window.setTimeout(() => setAnim(null), 650);
    return () => clearTimeout(t);
  }, [digit]);

  return (
    <span className="fkc-cell" aria-hidden="true">
      <span className="fkc-digit">
        <span className="fkc-half fkc-top">
          <b>{digit}</b>
        </span>
        <span className="fkc-half fkc-bottom">
          <b>{anim ? anim.from : digit}</b>
        </span>
        {anim && (
          <span className="fkc-anim" key={anim.k}>
            <span className="fkc-flap fkc-fold">
              <b>{anim.from}</b>
            </span>
            <span className="fkc-flap fkc-drop">
              <b>{anim.to}</b>
            </span>
            <span className="fkc-cast" />
          </span>
        )}
        <span className="fkc-seam" />
        <span className="fkc-gloss" />
      </span>
      {anim && smoke && (
        <span className="fkc-smoke" key={`s${anim.k}`}>
          {PUFFS.map((p) => (
            <i key={p.d} style={{ "--d": p.d, "--x": p.x, "--y": p.y, "--sc": p.sc } as CSSProperties} />
          ))}
        </span>
      )}
    </span>
  );
}

function split(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return [
    { label: "Days", value: String(Math.floor(s / 86400)).padStart(2, "0") },
    { label: "Hours", value: String(Math.floor((s % 86400) / 3600)).padStart(2, "0") },
    { label: "Min", value: String(Math.floor((s % 3600) / 60)).padStart(2, "0") },
    { label: "Sec", value: String(s % 60).padStart(2, "0") },
  ];
}

export default function FlipClockCountdown({ target, smoke = true }: Props) {
  const [end] = useState(() => target?.getTime() ?? Date.now() + 3 * 86400_000 + 4 * 3600_000 + 7 * 60_000 + 12_000);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = split(end - now);

  return (
    <section
      className="@container flex h-full min-h-[300px] w-full flex-col items-center justify-center gap-6 bg-[radial-gradient(ellipse_at_top,#DCEAD8,#EEF3EB_60%)] px-4 py-8 text-[#142617]"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      <style>{CSS}</style>
      <div className="text-center">
        <p className="text-[11px] font-semibold tracking-[0.22em] text-[#5C8C3A] uppercase">Applications close in</p>
        <h2 className="mt-1 text-[clamp(22px,4.2cqw,40px)] leading-tight font-bold tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
          5-minute credit scoring
        </h2>
      </div>
      <div
        className="fkc flex flex-wrap justify-center gap-[calc(var(--w)*0.46)]"
        role="timer"
        aria-label={units.map((u) => `${Number(u.value)} ${u.label}`).join(", ")}
      >
        {units.map((u) => (
          <div key={u.label} className="flex flex-col items-center gap-[calc(var(--w)*0.2)]">
            <div className="flex gap-[calc(var(--w)*0.11)]">
              {u.value.split("").map((d, i) => (
                <FlipCard key={i} digit={d} smoke={smoke} />
              ))}
            </div>
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[#4D6D4A] uppercase">{u.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
