import { useEffect, useRef } from "react";

/**
 * Fluid Dot Field — inspired by Hello Monday's interactive background renderer.
 * A canvas grid of dots on springs. The cursor drags dots along its velocity, clicks
 * send out a ring-shaped shockwave, and displaced dots grow and darken.
 * When idle, a ghost cursor keeps the surface moving.
 */
type Props = { spacing?: number; background?: string };

const SPRING = 0.045;
const DAMPING = 0.88;
const RADIUS = 110;
const SHADES = ["#cbcac9", "#a9a8a8", "#6b6a6a", "#191919"];

export default function FluidDotField({ spacing = 22, background = "#f8f6f5" }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let n = 0;
    let x0 = new Float32Array(0);
    let y0 = x0;
    let dx = x0;
    let dy = x0;
    let vx = x0;
    let vy = x0;

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = root.offsetWidth;
      h = root.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / spacing) + 1;
      n = cols * rows;
      x0 = new Float32Array(n);
      y0 = new Float32Array(n);
      dx = new Float32Array(n);
      dy = new Float32Array(n);
      vx = new Float32Array(n);
      vy = new Float32Array(n);
      const ox = (w - (cols - 1) * spacing) / 2;
      const oy = (h - (rows - 1) * spacing) / 2;
      for (let r = 0, i = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++, i++) {
          x0[i] = ox + c * spacing;
          y0[i] = oy + r * spacing;
        }
      }
    };
    build();
    const ro = new ResizeObserver(build);
    ro.observe(root);

    const pointer = { x: -999, y: -999, vx: 0, vy: 0, last: 0 };
    const ripples: { x: number; y: number; r: number }[] = [];

    // Map client coordinates to layout pixels, so it still works inside a CSS-scaled preview.
    const local = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      return { x: ((e.clientX - rect.left) * w) / rect.width, y: ((e.clientY - rect.top) * h) / rect.height };
    };
    const onMove = (e: PointerEvent) => {
      const p = local(e);
      if (pointer.last) {
        pointer.vx = p.x - pointer.x;
        pointer.vy = p.y - pointer.y;
      }
      pointer.x = p.x;
      pointer.y = p.y;
      pointer.last = performance.now();
    };
    const onDown = (e: PointerEvent) => {
      const p = local(e);
      ripples.push({ x: p.x, y: p.y, r: 0 });
    };
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerdown", onDown);

    const buckets: number[][] = SHADES.map(() => []);
    let raf = 0;
    let t = 0;

    const frame = () => {
      t += 1 / 60;
      // Ghost cursor: a slow figure-eight when the real pointer has been still for 1.2s.
      if (!reduce && performance.now() - pointer.last > 1200) {
        const gx = w * (0.5 + 0.34 * Math.sin(t * 0.8));
        const gy = h * (0.5 + 0.26 * Math.sin(t * 1.6));
        pointer.vx = gx - pointer.x;
        pointer.vy = gy - pointer.y;
        if (pointer.x < -900) pointer.vx = pointer.vy = 0;
        pointer.x = gx;
        pointer.y = gy;
      }

      for (const rp of ripples) rp.r += 7;
      while (ripples.length && ripples[0].r > Math.hypot(w, h)) ripples.shift();

      const pv = Math.min(40, Math.hypot(pointer.vx, pointer.vy));
      for (let i = 0; i < n; i++) {
        const px = x0[i] + dx[i];
        const py = y0[i] + dy[i];
        if (!reduce && pv > 0.2) {
          const ddx = px - pointer.x;
          const ddy = py - pointer.y;
          const d = Math.hypot(ddx, ddy);
          if (d < RADIUS) {
            const f = (1 - d / RADIUS) ** 2;
            vx[i] += pointer.vx * f * 0.32;
            vy[i] += pointer.vy * f * 0.32;
          }
        }
        for (const rp of ripples) {
          const ddx = x0[i] - rp.x;
          const ddy = y0[i] - rp.y;
          const d = Math.hypot(ddx, ddy) || 1;
          const band = Math.abs(d - rp.r);
          if (band < 18) {
            const f = (1 - band / 18) * 2.2 * Math.max(0, 1 - rp.r / 700);
            vx[i] += (ddx / d) * f;
            vy[i] += (ddy / d) * f;
          }
        }
        vx[i] = (vx[i] - dx[i] * SPRING) * DAMPING;
        vy[i] = (vy[i] - dy[i] * SPRING) * DAMPING;
        dx[i] += vx[i];
        dy[i] += vy[i];
      }
      pointer.vx *= 0.6;
      pointer.vy *= 0.6;

      ctx.fillStyle = background;
      ctx.fillRect(0, 0, w, h);
      buckets.forEach((b) => (b.length = 0));
      for (let i = 0; i < n; i++) {
        const mag = Math.hypot(dx[i], dy[i]);
        buckets[Math.min(SHADES.length - 1, Math.floor(mag / 5))].push(i);
      }
      buckets.forEach((b, s) => {
        if (!b.length) return;
        ctx.fillStyle = SHADES[s];
        ctx.beginPath();
        const rad = 1.3 + s * 0.9;
        for (const i of b) {
          const x = x0[i] + dx[i];
          const y = y0[i] + dy[i];
          ctx.moveTo(x + rad, y);
          ctx.arc(x, y, rad, 0, Math.PI * 2);
        }
        ctx.fill();
      });
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerdown", onDown);
    };
  }, [spacing, background]);

  return (
    <div ref={rootRef} className="@container relative h-full min-h-[300px] w-full cursor-pointer overflow-hidden" style={{ background }}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-5 left-5 text-[#191919]">
        <p className="text-[clamp(26px,5.5cqw,56px)] leading-none font-light" style={{ fontFamily: "'Zilla Slab', Georgia, serif" }}>
          Make waves.
        </p>
        <p className="mt-2 text-[12px] text-[#6b6a6a]" style={{ fontFamily: "'Inter', sans-serif" }}>
          Move to drag the surface · click to drop a ripple
        </p>
      </div>
    </div>
  );
}
