import { useEffect, useRef, useState } from "react";

/**
 * Elastic Bezier Menu — inspired by Hello Monday.
 * The drawer's leading edge is one cubic bezier. Its bulge is a spring driven by the
 * drawer's own velocity, so the edge bows while it slides and wobbles as it lands.
 * While open, the edge also leans toward the cursor.
 */
type Props = {
  links?: string[];
  /** Demo mode: open and close on a timer until the user clicks. */
  loop?: boolean;
};

const SERIF = "'Zilla Slab', 'Clarendon', Georgia, serif";
const SANS = "'Inter', 'Helvetica Neue', Arial, sans-serif";
const EDGE = 90; // px reserved for the bulge

export default function ElasticMenu({ links = ["Work", "About", "Careers", "Contact"], loop = false }: Props) {
  const [open, setOpen] = useState(false);
  const [demo, setDemo] = useState(loop);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const openRef = useRef(open);
  openRef.current = open;

  useEffect(() => {
    const root = rootRef.current;
    const panel = panelRef.current;
    const path = pathRef.current;
    if (!root || !panel || !path) return;
    if (panel) panel.inert = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const s = { pos: 0, vel: 0, bulge: 0, bVel: 0, pull: 0, cursorY: 0.5 };
    let last = performance.now();
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const r = panel.getBoundingClientRect();
      const rr = root.getBoundingClientRect();
      s.cursorY = (e.clientY - rr.top) / rr.height;
      // Lean toward the cursor when it comes within 160px of the edge.
      const dist = r.left - e.clientX;
      s.pull = openRef.current && dist > -40 && dist < 160 ? Math.max(0, 1 - Math.abs(dist) / 160) * 46 : 0;
    };
    const onLeave = () => (s.pull = 0);

    const tick = (now: number) => {
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      const target = openRef.current ? 1 : 0;
      if (reduce) {
        s.pos = target;
        s.vel = 0;
        s.bulge = 0;
      } else {
        // Drawer: stiff, near-critically damped.
        s.vel += (-120 * (s.pos - target) - 20 * s.vel) * dt;
        s.pos += s.vel * dt;
        // Edge: soft and bouncy, pushed by the drawer's velocity. The SVG paints the whole
        // panel, so a negative bulge cuts a concave bite out of it.
        const bTarget = -s.vel * 70 + s.pull;
        s.bVel += (-260 * (s.bulge - bTarget) - 9 * s.bVel) * dt;
        s.bulge += s.bVel * dt;
      }
      const w = panel.offsetWidth;
      const h = panel.offsetHeight;
      panel.style.transform = `translate3d(${(1 - s.pos) * (w + EDGE)}px,0,0)`;
      const y = Math.min(0.85, Math.max(0.15, s.cursorY)) * h;
      const c = EDGE - s.bulge; // control x; EDGE = flat
      path.setAttribute("d", `M${EDGE},0 C${EDGE},${y * 0.6} ${c},${y - h * 0.18} ${c},${y} S${EDGE},${h} ${EDGE},${h} L${EDGE + w},${h} L${EDGE + w},0 Z`);
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

  useEffect(() => {
    if (!demo) return;
    const id = window.setInterval(() => setOpen((o) => !o), 2400);
    return () => clearInterval(id);
  }, [demo]);

  useEffect(() => {
    if (panelRef.current) panelRef.current.inert = !open;
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div ref={rootRef} className="@container relative h-full min-h-[340px] w-full overflow-hidden bg-[#f8f6f5] text-[#191919]" style={{ fontFamily: SANS }}>
      <header className="relative z-30 flex items-center justify-between p-5">
        <a href="#top" className="text-[20px] font-light" style={{ fontFamily: SERIF }}>
          Hello Monday
        </a>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="hm-menu"
          onClick={() => {
            setDemo(false);
            setOpen((o) => !o);
          }}
          className="flex items-center gap-2 rounded-full bg-[#191919] py-2 pr-4 pl-3 text-[13px] text-[#f8f6f5] transition-transform duration-300 hover:scale-[1.04]"
        >
          <span className="relative block h-3 w-3" aria-hidden="true">
            <span className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-current transition-transform duration-500" style={{ transform: open ? "translate(3px,3px)" : "none" }} />
            <span className="absolute right-0 bottom-0 h-1.5 w-1.5 rounded-full bg-current transition-transform duration-500" style={{ transform: open ? "translate(-3px,-3px)" : "none" }} />
          </span>
          {open ? "Close" : "Menu"}
        </button>
      </header>

      <div className="absolute inset-x-5 bottom-6">
        <p className="max-w-[18ch] text-[clamp(28px,6cqw,64px)] leading-[1.02] font-light" style={{ fontFamily: SERIF }}>
          We help brands do good, better.
        </p>
      </div>

      <div
        id="hm-menu"
        ref={panelRef}
        className="absolute inset-y-0 right-0 z-20 w-[min(380px,82%)] will-change-transform"
        style={{ transform: "translate3d(200%,0,0)" }}
      >
        <svg className="absolute inset-y-0 h-full overflow-visible" style={{ left: -EDGE, width: `calc(100% + ${EDGE}px)` }} aria-hidden="true">
          <path ref={pathRef} fill="#191919" />
        </svg>
        <nav aria-label="Main" className="relative flex h-full flex-col justify-center px-8 text-[#f8f6f5]">
          <ul>
            {links.map((l, i) => (
              <li
                key={l}
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateX(30px)",
                  transition: `opacity .5s cubic-bezier(0.25,0.46,0.45,0.94) ${open ? 0.12 + i * 0.06 : 0}s, transform .6s cubic-bezier(0.25,0.46,0.45,0.94) ${open ? 0.12 + i * 0.06 : 0}s`,
                }}
              >
                <a href="#" className="group block py-1 text-[clamp(32px,6cqw,52px)] leading-tight font-light" style={{ fontFamily: SERIF }}>
                  <span className="bg-gradient-to-r from-current to-current bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                    {l}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[12px] text-[#c6c5c5]">New York · Copenhagen · Aarhus</p>
        </nav>
      </div>
    </div>
  );
}
