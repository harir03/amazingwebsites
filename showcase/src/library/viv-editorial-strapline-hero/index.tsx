import { useState, useEffect } from "react";

/**
 * Minimalist Editorial Strapline Hero — ViV MGMT
 * High-fashion agency hero featuring oversized serif typography,
 * live multi-city studio clocks (NYC, LDN, LA), and architectural borders.
 */
export default function EditorialStraplineHero() {
  const [times, setTimes] = useState({ nyc: "12:00 PM", ldn: "5:00 PM", la: "9:00 AM" });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const opts: Intl.DateTimeFormatOptions = { hour: "numeric", minute: "2-digit", hour12: true };
      setTimes({
        nyc: new Intl.DateTimeFormat("en-US", { ...opts, timeZone: "America/New_York" }).format(now),
        ldn: new Intl.DateTimeFormat("en-GB", { ...opts, timeZone: "Europe/London" }).format(now),
        la: new Intl.DateTimeFormat("en-US", { ...opts, timeZone: "America/Los_Angeles" }).format(now),
      });
    };
    update();
    const interval = setInterval(update, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-white text-black p-8 sm:p-14 rounded-3xl border border-zinc-200 select-none overflow-hidden relative">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-zinc-200">
        <div className="flex items-center gap-6">
          <span className="font-serif text-3xl tracking-tight">ViV</span>
          <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase hidden sm:inline">
            ARTIST MANAGEMENT + PRODUCTION
          </span>
        </div>

        {/* Live Studio Clocks */}
        <div className="flex items-center gap-5 font-mono text-[11px] text-zinc-500">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              NYC <strong className="text-black font-semibold">{times.nyc}</strong>
            </span>
          </div>
          <div>
            LDN <strong className="text-black font-semibold">{times.ldn}</strong>
          </div>
          <div>
            LA <strong className="text-black font-semibold">{times.la}</strong>
          </div>
        </div>
      </div>

      {/* Main Headline */}
      <div className="my-12 max-w-4xl">
        <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest uppercase text-zinc-400 mb-4">
          <span className="w-5 h-[1px] bg-black" />
          <span>REPRESENTING VISIONARY DIRECTORS &amp; CREATIVES</span>
        </div>

        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.02] tracking-tight">
          ViV is an artist management &amp; commercial{" "}
          <span className="italic font-light">photo production</span> company.
        </h2>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-end pt-6 border-t border-zinc-100">
          <p className="md:col-span-8 text-sm sm:text-base text-zinc-600 leading-relaxed">
            Representing commercial photographers, directors, and creatives while providing full-service
            photo and video production for brands nationwide.
          </p>

          <div className="md:col-span-4 flex md:justify-end">
            <a
              href="#artists"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-[11px] font-mono tracking-widest uppercase hover:bg-zinc-800 transition-colors"
            >
              <span>DISCOVER ROSTER</span>
              <span>↓</span>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="pt-6 border-t border-zinc-200 grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono text-xs">
        <div>
          <div className="text-[10px] text-zinc-400 uppercase">REPRESENTATION</div>
          <div className="text-lg font-bold text-black mt-0.5">8 ARTISTS</div>
        </div>
        <div>
          <div className="text-[10px] text-zinc-400 uppercase">OFFICES</div>
          <div className="text-lg font-bold text-black mt-0.5">NYC · LA · LDN</div>
        </div>
        <div>
          <div className="text-[10px] text-zinc-400 uppercase">DISCIPLINES</div>
          <div className="text-lg font-bold text-black mt-0.5">PHOTO &amp; MOTION</div>
        </div>
        <div>
          <div className="text-[10px] text-zinc-400 uppercase">AWARD</div>
          <div className="text-lg font-bold text-black mt-0.5">SOTD &amp; DEV</div>
        </div>
      </div>
    </div>
  );
}
