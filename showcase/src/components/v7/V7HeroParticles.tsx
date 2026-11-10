import { useEffect, useRef } from "react";

export function V7HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    // Particle streaks converging toward horizontal center
    const particleCount = 42;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: height * 0.2 + Math.random() * height * 0.6,
      vx: (Math.random() * 0.8 + 0.3) * (Math.random() > 0.5 ? 1 : 1),
      vy: (Math.random() - 0.5) * 0.2,
      length: Math.random() * 28 + 12,
      alpha: Math.random() * 0.45 + 0.15,
      thickness: Math.random() * 1.5 + 0.5,
      color: Math.random() > 0.3 ? "#ff5b24" : "#f59e0b",
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const targetY = height * 0.52;

      for (const p of particles) {
        p.x += p.vx;
        // Gently steer toward vertical center stream (V7 funnel effect)
        p.y += (targetY - p.y) * 0.005 + p.vy;

        if (p.x > width + 50) {
          p.x = -50;
          p.y = height * 0.15 + Math.random() * height * 0.7;
        }

        ctx.beginPath();
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.lineWidth = p.thickness;
        ctx.lineCap = "round";

        // Draw horizontal streamline streak
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.length, p.y + p.vy * 4);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-65 dark:opacity-45"
    />
  );
}
