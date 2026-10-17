export type Bezier = [number, number, number, number];

const NAMED: Record<string, Bezier> = {
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  "ease-in": [0.42, 0, 1, 1],
  "ease-out": [0, 0, 0.58, 1],
  "ease-in-out": [0.42, 0, 0.58, 1],
};

export function parseBezier(input: string): Bezier | null {
  const s = input.trim().toLowerCase();
  if (NAMED[s]) return NAMED[s];
  const m = s.match(/cubic-bezier\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/);
  if (!m) return null;
  const v = m.slice(1).map(Number) as Bezier;
  return v.every(Number.isFinite) ? v : null;
}

/** Point on the curve at parameter t (not time). */
export function bezierPoint([x1, y1, x2, y2]: Bezier, t: number): [number, number] {
  const u = 1 - t;
  const x = 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t;
  const y = 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t;
  return [x, y];
}

/** Progress (y) at time x, solved with bisection on the monotonic x(t). */
export function bezierAt(b: Bezier, x: number): number {
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 30; i++) {
    const mid = (lo + hi) / 2;
    if (bezierPoint(b, mid)[0] < x) lo = mid;
    else hi = mid;
  }
  return bezierPoint(b, (lo + hi) / 2)[1];
}

/** Short human description of a curve's character. */
export function describeBezier([x1, y1, x2, y2]: Bezier): string {
  const parts: string[] = [];
  if (y2 > 1 || y1 > 1) parts.push("overshoots past the target");
  if (y1 < 0 || y2 < 0) parts.push("pulls back before moving");
  if (x1 < 0.3 && y1 > 0.5) parts.push("fast start, long gentle settle");
  else if (x1 > 0.35 && y1 < 0.2 && x2 > 0.6) parts.push("slow start that accelerates (ease-in)");
  else if (x1 > 0.35 && x2 < 0.4) parts.push("slow start, fast middle, soft landing (ease-in-out)");
  return parts.join(", ") || "balanced ease";
}
