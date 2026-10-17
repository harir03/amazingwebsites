import { useEffect, useRef, useState } from "react";

/**
 * Morphing Particle Field — inspired by Emotion Agency's particle "e".
 * Thousands of particles spring toward a target shape (the serif "e", a rotating
 * sphere, a ring, a cube) and morph every few seconds. The cursor pushes them away.
 * Simulation uses flat Float32Arrays so the loop can move into a Web Worker with
 * OffscreenCanvas unchanged; here it runs on the main thread for portability.
 */
type Props = { count?: number; interval?: number };

const SHAPES = ["e", "sphere", "ring", "cube"] as const;
type Shape = (typeof SHAPES)[number];
const STIFFNESS = 0.055;
const DAMPING = 0.86;
const REPEL_RADIUS = 90;

function sampleGlyph(n: number): Float32Array {
  const size = 220;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d");
  const out = new Float32Array(n * 3);
  if (!g) return out;
  g.fillStyle = "#fff";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.font = "italic 300 260px 'Cormorant Garamond', 'Emotion Serif', Georgia, serif";
  g.fillText("e", size / 2, size / 2 - 18);
  const data = g.getImageData(0, 0, size, size).data;
  const pts: number[] = [];
  for (let y = 0; y < size; y += 2) for (let x = 0; x < size; x += 2) if (data[(y * size + x) * 4 + 3] > 128) pts.push(x, y);
  for (let i = 0; i < n; i++) {
    const j = (Math.floor(Math.random() * (pts.length / 2)) * 2) | 0;
    out[i * 3] = ((pts[j] ?? size / 2) / size - 0.5) * 2.2 + (Math.random() - 0.5) * 0.012;
    out[i * 3 + 1] = ((pts[j + 1] ?? size / 2) / size - 0.5) * 2.2 + (Math.random() - 0.5) * 0.012;
    out[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
  }
  return out;
}

function buildShape(shape: Shape, n: number): Float32Array {
  if (shape === "e") return sampleGlyph(n);
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    let x = 0;
    let y = 0;
    let z = 0;
    if (shape === "sphere") {
      // Fibonacci sphere: evenly spread points
      const t = (i + 0.5) / n;
      const phi = Math.acos(1 - 2 * t);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      x = Math.cos(theta) * Math.sin(phi);
      y = Math.sin(theta) * Math.sin(phi);
      z = Math.cos(phi);
    } else if (shape === "ring") {
      const a = Math.random() * Math.PI * 2;
      const b = Math.random() * Math.PI * 2;
      const r = 0.22 * Math.sqrt(Math.random());
      x = (0.85 + r * Math.cos(b)) * Math.cos(a);
      y = (0.85 + r * Math.cos(b)) * Math.sin(a);
      z = r * Math.sin(b);
    } else {
      // Points along the 12 edges of a cube
      const edge = Math.floor(Math.random() * 12);
      const t = Math.random() * 2 - 1;
      const s = [-0.7, 0.7];
      const a = s[edge & 1];
      const b = s[(edge >> 1) & 1];
      const axis = Math.floor(edge / 4);
      [x, y, z] = axis === 0 ? [t * 0.7, a, b] : axis === 1 ? [a, t * 0.7, b] : [a, b, t * 0.7];
    }
    out[i * 3] = x;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = z;
  }
  return out;
}

export default function ParticleMorph({ count, interval = 3600 }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shapeIdx, setShapeIdx] = useState(0);
  const shapeRef = useRef(0);

  useEffect(() => {
    const id = window.setInterval(() => setShapeIdx((i) => (i + 1) % SHAPES.length), interval);
    return () => clearInterval(id);
  }, [interval]);
  useEffect(() => {
    shapeRef.current = shapeIdx;
  }, [shapeIdx]);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = root.offsetWidth;
      h = root.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(root);

    const n = count ?? Math.round(Math.min(7000, Math.max(1800, (w * h) / 70)));
    const pos = new Float32Array(n * 2);
    const vel = new Float32Array(n * 2);
    for (let i = 0; i < n; i++) {
      pos[i * 2] = Math.random() * w;
      pos[i * 2 + 1] = Math.random() * h;
    }
    let targets: Float32Array[] = SHAPES.map((s) => buildShape(s, n));
    // Re-sample the glyph once the web font is ready.
    document.fonts?.ready.then(() => (targets = [buildShape("e", n), ...targets.slice(1)]));

    const mouse = { x: -9999, y: -9999 };
    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      mouse.x = ((e.clientX - r.left) * w) / r.width;
      mouse.y = ((e.clientY - r.top) * h) / r.height;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);

    let raf = 0;
    let t = 0;
    const frame = () => {
      t += 0.008;
      const tgt = targets[shapeRef.current];
      const scale = Math.min(w, h) * 0.36;
      const cx = w / 2;
      const cy = h / 2 - h * 0.03;
      const ry = reduce ? 0.4 : t; // spin around Y
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const tilt = 0.35;
      const cosX = Math.cos(tilt);
      const sinX = Math.sin(tilt);
      const flat = SHAPES[shapeRef.current] === "e";

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(18,18,18,0.32)"; // motion trails
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      for (let b = 0; b < 3; b++) {
        ctx.fillStyle = b === 0 ? "rgba(113,20,255,0.55)" : b === 1 ? "rgba(144,71,255,0.75)" : "rgba(226,214,255,0.9)";
        for (let i = b; i < n; i += 3) {
          let x = tgt[i * 3];
          let y = tgt[i * 3 + 1];
          let z = tgt[i * 3 + 2];
          if (!flat) {
            const x1 = x * cosY - z * sinY;
            const z1 = x * sinY + z * cosY;
            const y1 = y * cosX - z1 * sinX;
            z = y * sinX + z1 * cosX;
            x = x1;
            y = y1;
          } else {
            x += Math.sin(t * 3 + i) * 0.004;
          }
          const persp = 1 / (1.9 - z * 0.45);
          const tx = cx + x * scale * persp * 1.5;
          const ty = cy + y * scale * persp * 1.5;

          const pi = i * 2;
          let ax = (tx - pos[pi]) * STIFFNESS;
          let ay = (ty - pos[pi + 1]) * STIFFNESS;
          const dx = pos[pi] - mouse.x;
          const dy = pos[pi + 1] - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < REPEL_RADIUS * REPEL_RADIUS) {
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / REPEL_RADIUS) * 6;
            ax += (dx / d) * f;
            ay += (dy / d) * f;
          }
          vel[pi] = (vel[pi] + ax) * DAMPING;
          vel[pi + 1] = (vel[pi + 1] + ay) * DAMPING;
          pos[pi] += vel[pi];
          pos[pi + 1] += vel[pi + 1];
          const s = 0.8 + persp * 0.9;
          ctx.fillRect(pos[pi], pos[pi + 1], s, s);
        }
      }
      raf = requestAnimationFrame(frame);
    };
    ctx.fillStyle = "#121212";
    ctx.fillRect(0, 0, w, h);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, [count]);

  return (
    <div
      ref={rootRef}
      className="@container relative h-full min-h-[320px] w-full cursor-pointer overflow-hidden bg-[#121212]"
      onClick={() => setShapeIdx((i) => (i + 1) % SHAPES.length)}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-5 bottom-4 flex items-end justify-between text-[#a3a6c1]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        <span className="text-[11px] tracking-[0.12em] uppercase">
          Shape {String(shapeIdx + 1).padStart(2, "0")}/{String(SHAPES.length).padStart(2, "0")} — {SHAPES[shapeIdx]}
        </span>
        <span className="text-[11px]">click to morph</span>
      </div>
      <p className="pointer-events-none absolute top-4 left-5 text-[clamp(18px,3cqw,26px)] text-white/90 italic" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
        emotion
      </p>
    </div>
  );
}
