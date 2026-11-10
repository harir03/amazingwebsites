import { useState, useRef } from "react";

/**
 * Tactical Telemetry Interceptor Hero — ZIRKA (ZRK Technology)
 * Military aerospace defense HUD with interactive cursor targeting crosshairs,
 * live azimuth/range telemetry calculations, and radar sweep.
 */
export default function TelemetryInterceptorHero() {
  const radarRef = useRef<HTMLDivElement>(null);
  const [reticle, setReticle] = useState({ x: 200, y: 150, azm: 142, rng: "3.2" });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const radar = radarRef.current;
    if (!radar) return;
    const rect = radar.getBoundingClientRect();
    const x = Math.max(10, Math.min(rect.width - 10, e.clientX - rect.left));
    const y = Math.max(10, Math.min(rect.height - 10, e.clientY - rect.top));

    const azm = Math.round((x / rect.width) * 360);
    const rng = ((1 - y / rect.height) * 8).toFixed(1);

    setReticle({ x, y, azm, rng });
  };

  return (
    <div className="w-full bg-[#0A0C0E] text-white p-8 sm:p-12 rounded-3xl border border-[#1C242C] relative overflow-hidden select-none">
      {/* HUD Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, #1C242C 1px, transparent 1px), linear-gradient(to bottom, #1C242C 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top Telemetry Header */}
      <div className="relative z-10 flex flex-wrap justify-between items-center gap-4 pb-6 border-b border-[#1C242C]">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full border border-[#FF5500] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF5500]" />
          </div>
          <span className="font-mono font-bold tracking-widest text-sm text-white">
            ZIRKA // ZRK TECH
          </span>
        </div>

        <div className="flex items-center gap-4 font-mono text-xs text-[#00F0FF]">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
            TELEMETRY LINK ACTIVE
          </span>
          <span className="text-[#7B8B9B]">433.92 MHz</span>
          <span className="text-[#FF5500] font-bold">ARMED</span>
        </div>
      </div>

      {/* Hero Content Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center my-8">
        <div>
          <div className="font-mono text-xs font-bold text-[#FF5500] uppercase tracking-widest mb-3">
            [ SHAHED-CLASS THREAT RESPONSE ]
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95]">
            Destroy drones using{" "}
            <span className="text-[#FF5500]">drones</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#7B8B9B] max-w-md leading-relaxed">
            All Ukrainian combat interception experience in one autonomous platform. High-velocity auto-guidance engineered against nightly saturation attacks.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="bg-[#FF5500] text-black font-mono font-black text-xs px-4 py-2.5 rounded tracking-wider uppercase">
              RADAR LOCK ENGAGED
            </div>
            <span className="font-mono text-xs text-[#7B8B9B]">
              COORDS: 48.4647°N, 35.0462°E
            </span>
          </div>
        </div>

        {/* Interactive Radar Box */}
        <div
          ref={radarRef}
          onPointerMove={handlePointerMove}
          className="relative h-72 sm:h-80 bg-[#11151A] border border-[#1C242C] rounded-2xl overflow-hidden cursor-crosshair shadow-inner"
        >
          {/* Conic Radar Sweep */}
          <div
            className="absolute -inset-1/2 rounded-full animate-spin [animation-duration:6s] pointer-events-none"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, rgba(0, 240, 255, 0.15) 60deg, transparent 61deg)",
            }}
          />

          {/* Radar Circles */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-24 h-24 border border-dashed border-[#1C242C] rounded-full" />
            <div className="absolute w-44 h-44 border border-dashed border-[#1C242C] rounded-full" />
            <div className="absolute w-64 h-64 border border-dashed border-[#1C242C] rounded-full" />
          </div>

          {/* Mock Threat Blip */}
          <div className="absolute top-[35%] left-[65%] w-2 h-2 rounded-full bg-[#FF5500] shadow-[0_0_12px_#FF5500]">
            <span className="absolute left-3 -top-1.5 font-mono text-[9px] text-[#FF5500] font-bold">
              UAS #04
            </span>
          </div>

          {/* Interactive Targeting Reticle */}
          <div
            className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2"
            style={{ left: reticle.x, top: reticle.y }}
          >
            <div className="w-10 h-10 border border-[#00F0FF] rounded-full flex items-center justify-center relative">
              <div className="w-full h-[1px] bg-[#00F0FF] absolute" />
              <div className="h-full w-[1px] bg-[#00F0FF] absolute" />
              <div className="absolute -top-6 left-8 font-mono text-[10px] bg-[#0A0C0E]/90 text-[#00F0FF] px-2 py-0.5 rounded border border-[#1C242C] whitespace-nowrap">
                AZM: {reticle.azm}° · RNG: {reticle.rng}KM · LOCK 99%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Telemetry Footer Row */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#1C242C]">
        <div>
          <div className="font-mono text-xs text-[#7B8B9B]">INTERCEPT VELOCITY</div>
          <div className="font-mono text-2xl font-black text-white mt-1">240+ km/h</div>
        </div>
        <div>
          <div className="font-mono text-xs text-[#7B8B9B]">CEILING ALTITUDE</div>
          <div className="font-mono text-2xl font-black text-white mt-1">4,000 m</div>
        </div>
        <div>
          <div className="font-mono text-xs text-[#7B8B9B]">TERMINAL SEEKER</div>
          <div className="font-mono text-2xl font-black text-[#00F0FF] mt-1">AI OPTICAL</div>
        </div>
        <div>
          <div className="font-mono text-xs text-[#7B8B9B]">ENGAGEMENT COST</div>
          <div className="font-mono text-2xl font-black text-[#00FF66] mt-1">&lt; 5% MISSILE</div>
        </div>
      </div>
    </div>
  );
}

