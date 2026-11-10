import { useEffect, useRef, useState } from "react";

/**
 * Two-Step Eye Navigation — inspired by The Design Society Lyon.
 * A floating bar with a pixel eye that follows the cursor and blinks.
 * "Menu" opens the drawer in two steps (width, then height); links scramble on hover.
 */
type Link = { label: string; href: string };
type Props = { links?: Link[] };

const EASE = "cubic-bezier(0.625, 0.05, 0, 1)";
const GLYPHS = "!<>-_\\/[]{}=+*^?#█▓▒░";
const DEFAULT_LINKS: Link[] = [
  { label: "Événements", href: "#events" },
  { label: "À propos", href: "#about" },
  { label: "Les membres", href: "#team" },
  { label: "Contact", href: "#contact" },
];

function ScrambleLink({ label, href, onNavigate }: Link & { onNavigate: () => void }) {
  const [text, setText] = useState(label);
  const raf = useRef(0);

  const scramble = () => {
    cancelAnimationFrame(raf.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const settleAt = label.length * 1.6;
    const step = () => {
      frame++;
      setText(
        label
          .split("")
          .map((ch, i) => (ch === " " || i < frame / 1.6 ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join(""),
      );
      if (frame < settleAt) raf.current = requestAnimationFrame(step);
      else setText(label);
    };
    raf.current = requestAnimationFrame(step);
  };

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return (
    <a
      href={href}
      onClick={onNavigate}
      onMouseEnter={scramble}
      onFocus={scramble}
      aria-label={label}
      className="block border-b border-black/10 py-2 text-[clamp(22px,4cqw,40px)] leading-none uppercase transition-colors hover:text-[#350aff] focus-visible:text-[#350aff] focus-visible:outline-none"
      style={{ fontFamily: "'Silkscreen', 'VT323', monospace" }}
    >
      <span aria-hidden="true">{text}</span>
    </a>
  );
}

function TrackingEye() {
  const eyeRef = useRef<SVGSVGElement>(null);
  const pupilRef = useRef<SVGGElement>(null);
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    const R = 5; // max pupil travel in SVG units
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const r = eyeRef.current?.getBoundingClientRect();
      if (!r) return;
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(d / 12, R) / d;
      target.x = dx * k;
      target.y = dy * k;
    };
    const loop = () => {
      pos.x += (target.x - pos.x) * 0.15;
      pos.y += (target.y - pos.y) * 0.15;
      pupilRef.current?.setAttribute("transform", `translate(${pos.x.toFixed(2)} ${pos.y.toFixed(2)})`);
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(loop);

    const blinker = window.setInterval(() => {
      setBlink(true);
      window.setTimeout(() => setBlink(false), 140);
    }, 3800);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      clearInterval(blinker);
    };
  }, []);

  return (
    <svg ref={eyeRef} viewBox="-16 -10 32 20" className="h-6 w-10" aria-hidden="true" shapeRendering="crispEdges">
      <path d="M-15 0 L-9 -6 H9 L15 0 L9 6 H-9 Z" fill="#fff" stroke="#000" strokeWidth="2" />
      <g ref={pupilRef}>
        <rect x="-4" y="-4" width="8" height="8" fill="#350aff" />
        <rect x="-2" y="-2" width="3" height="3" fill="#bcf015" />
      </g>
      <rect
        x="-16"
        y="-10"
        width="32"
        height="20"
        fill="#000"
        style={{ transformOrigin: "0 -10px", transform: `scaleY(${blink ? 1 : 0})`, transition: "transform 70ms linear" }}
      />
    </svg>
  );
}

export default function EyeNavigation({ links = DEFAULT_LINKS }: Props) {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Keep closed links out of the tab order.
  useEffect(() => {
    if (drawerRef.current) drawerRef.current.inert = !open;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Step 1 = width, step 2 = height. Reverse the delays when closing.
  const widthDelay = open ? "0s" : "0.35s";
  const heightDelay = open ? "0.35s" : "0s";

  return (
    <div className="@container relative h-full min-h-[320px] w-full overflow-hidden bg-[#f2f2f2]">
      <div className="absolute inset-x-0 top-3 flex justify-center px-3">
        <nav
          aria-label="Main"
          className="overflow-hidden rounded-[6px] border-2 border-black bg-white text-black shadow-[4px_4px_0_#000]"
          style={{
            width: open ? "min(560px, 100%)" : "min(360px, 100%)",
            transition: `width 0.5s ${EASE} ${widthDelay}`,
          }}
        >
          <div className="flex h-12 items-center justify-between gap-3 px-3">
            <a href="#top" className="flex items-center gap-2" aria-label="The Design Society, home">
              <span className="grid h-6 w-6 place-items-center bg-black text-[10px] text-[#bcf015]" style={{ fontFamily: "'Silkscreen', monospace" }}>
                DS
              </span>
            </a>
            <TrackingEye />
            <button
              type="button"
              aria-expanded={open}
              aria-controls="ds-drawer"
              onClick={() => setOpen((o) => !o)}
              className="bg-black px-3 py-1.5 text-[11px] tracking-[0.18em] text-white uppercase transition-colors hover:bg-[#350aff]"
              style={{ fontFamily: "'Geist Mono', monospace" }}
            >
              {open ? "Fermer" : "Menu"}
            </button>
          </div>
          <div
            id="ds-drawer"
            className="grid"
            style={{
              gridTemplateRows: open ? "1fr" : "0fr",
              transition: `grid-template-rows 0.55s ${EASE} ${heightDelay}`,
            }}
          >
            <div ref={drawerRef} className="min-h-0 overflow-hidden">
              <div className="border-t-2 border-black px-4 pt-2 pb-4">
                {links.map((l) => (
                  <ScrambleLink key={l.href} {...l} onNavigate={() => setOpen(false)} />
                ))}
                <p className="mt-3 text-[10px] tracking-[0.2em] uppercase opacity-60" style={{ fontFamily: "'Geist Mono', monospace" }}>
                  Lyon · Since 2019 · Hello@tds.fr
                </p>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <p className="absolute inset-x-0 bottom-4 text-center text-[11px] tracking-[0.2em] text-black/50 uppercase" style={{ fontFamily: "'Geist Mono', monospace" }}>
        Move the cursor — the eye follows
      </p>
    </div>
  );
}
