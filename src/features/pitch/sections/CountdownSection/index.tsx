import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FlipClock, type ClockUnit } from "./components/FlipClock";

gsap.registerPlugin(ScrollTrigger);

export const CountdownSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(() => {
    return 300 - (Math.floor(Date.now() / 1000) % 300);
  });

  const getUnits = (secs: number): ClockUnit[] => {
    const pad = (n: number) => Math.max(0, n).toString().padStart(2, "0");
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return [
      { value: "00", label: "Days (Banks: 30)" },
      { value: "00", label: "Hours Delay" },
      { value: pad(mins), label: "Minutes" },
      { value: pad(s), label: "Seconds" },
    ];
  };

  const [units, setUnits] = useState<ClockUnit[]>(() => getUnits(secondsRemaining));

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        const next = prev <= 1 ? 300 : prev - 1;
        setUnits(getUnits(next));
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleResetSimulation = () => {
    setSecondsRemaining(300);
    setUnits(getUnits(300));
  };

  // ScrollTrigger entrance and valley parallax
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // Stagger entrance on headings and clock
      gsap.from([".cd-motif", ".cd-heading", ".cd-plaque-block", ".cd-plaque-sub", ".cd-clock-reveal"], {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // Parallax on valley background image
      gsap.to(".cd-valley-img", {
        y: "12%",
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.4,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  // Compute active telemetry stage based on elapsed time (300 - secondsRemaining)
  const elapsed = 300 - secondsRemaining;
  const currentStage = elapsed < 45 ? 1 : elapsed < 120 ? 2 : elapsed < 220 ? 3 : 4;

  return (
    <section
      id="countdown"
      ref={sectionRef}
      aria-label="5-Minute Autonomous Underwriting Speed"
      className="cd relative w-full bg-transparent text-[#111a12] pt-[clamp(3.5rem,8vh,6.5rem)] pb-[clamp(4rem,9vw,7rem)] overflow-hidden z-[1]"
    >
      <div className="cd-inner relative max-w-[104rem] mx-auto px-4 md:px-8 text-center flex flex-col items-center z-[1]">
        {/* Ornament */}
        <div className="cd-ornament-wrap flex justify-center mb-[clamp(1.2rem,2.4vh,1.8rem)]">
          <img
            src="/images/assets/artifact.png"
            alt=""
            aria-hidden="true"
            draggable="false"
            className="cd-motif block w-[clamp(114px,56.87px+15.87vw,260px)] h-auto opacity-[0.88] select-none pointer-events-none"
          />
        </div>

        {/* Heading */}
        <div className="cd-head-wrap w-full text-center">
          <h2 className="cd-heading font-headingNow font-medium text-[clamp(2.4rem,5.2vw,4.4rem)] leading-[1.1] tracking-[-0.035em] text-[#111a12]">
            Scored in Under 5 Minutes
          </h2>
        </div>

        {/* Plaque Block */}
        <div className="cd-plaque-block mt-[clamp(1.2rem,2.5vh,2rem)] flex justify-center w-full">
          <div className="cd-plaque flex items-center justify-center gap-3 md:gap-4 max-w-full">
            <span className="cd-plaque-rule cd-plaque-rule-l w-12 md:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#5C8C3A]/50" aria-hidden="true" />

            <span className="cd-plaque-core inline-flex items-center gap-2 md:gap-3 px-4 py-1.5 rounded-full bg-[#182a14]/5 border border-[#5C8C3A]/25 backdrop-blur-sm shadow-sm text-xs md:text-sm font-geist_mono text-[#244626]">
              <span className="cd-plaque-eyebrow inline-flex items-center gap-1.5 font-semibold text-[#2F5527]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Live Underwriting Cycle
              </span>

              <span className="text-[#5C8C3A]/50">·</span>

              <span className="font-semibold text-emerald-800">
                05:00 Decision Window
              </span>
            </span>

            <span className="cd-plaque-rule cd-plaque-rule-r w-12 md:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#5C8C3A]/50" aria-hidden="true" />
          </div>
        </div>

        {/* Subtitle Details */}
        <p className="cd-plaque-sub mt-3 max-w-2xl text-xs md:text-sm font-dm_sans text-[#2d4d29]/90 font-medium leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        {/* Split-Flap Flip Clock */}
        <div className="cd-clock-reveal mt-[clamp(2rem,4.5vh,3.8rem)] w-full">
          <div className="cd-clock-wrapper w-full flex justify-center">
            <FlipClock units={units} />
          </div>
        </div>

        {/* Real-time Telemetry Pipeline Stages */}
        <div className="mt-8 max-w-4xl w-full grid grid-cols-2 md:grid-cols-4 gap-2.5 px-2">
          <div className={`p-3 rounded-xl border text-left transition-all duration-300 ${currentStage >= 1 ? "bg-[#142813]/90 border-emerald-500/50 shadow-md text-white" : "bg-white/40 border-stone-300/40 text-stone-600"}`}>
            <div className="flex items-center justify-between text-[10px] font-geist_mono mb-1">
              <span className={currentStage >= 1 ? "text-lime-400 font-bold" : "text-stone-500"}>STAGE 01</span>
              <span>00:45</span>
            </div>
            <p className="text-xs font-dm_sans font-semibold leading-tight m-0">Consent & KYC</p>
            <span className="text-[10px] opacity-75 font-geist_mono block mt-1">DPDP Verified</span>
          </div>

          <div className={`p-3 rounded-xl border text-left transition-all duration-300 ${currentStage >= 2 ? "bg-[#142813]/90 border-emerald-500/50 shadow-md text-white" : "bg-white/40 border-stone-300/40 text-stone-600"}`}>
            <div className="flex items-center justify-between text-[10px] font-geist_mono mb-1">
              <span className={currentStage >= 2 ? "text-lime-400 font-bold" : "text-stone-500"}>STAGE 02</span>
              <span>01:30</span>
            </div>
            <p className="text-xs font-dm_sans font-semibold leading-tight m-0">Cashflow Ingestion</p>
            <span className="text-[10px] opacity-75 font-geist_mono block mt-1">UPI & Mandi Ledgers</span>
          </div>

          <div className={`p-3 rounded-xl border text-left transition-all duration-300 ${currentStage >= 3 ? "bg-[#142813]/90 border-emerald-500/50 shadow-md text-white" : "bg-white/40 border-stone-300/40 text-stone-600"}`}>
            <div className="flex items-center justify-between text-[10px] font-geist_mono mb-1">
              <span className={currentStage >= 3 ? "text-lime-400 font-bold" : "text-stone-500"}>STAGE 03</span>
              <span>03:15</span>
            </div>
            <p className="text-xs font-dm_sans font-semibold leading-tight m-0">Neural Risk Score</p>
            <span className="text-[10px] opacity-75 font-geist_mono block mt-1">ZK Proof Computed</span>
          </div>

          <div className={`p-3 rounded-xl border text-left transition-all duration-300 ${currentStage >= 4 ? "bg-[#142813]/90 border-emerald-500/50 shadow-md text-white" : "bg-white/40 border-stone-300/40 text-stone-600"}`}>
            <div className="flex items-center justify-between text-[10px] font-geist_mono mb-1">
              <span className={currentStage >= 4 ? "text-lime-400 font-bold" : "text-stone-500"}>STAGE 04</span>
              <span>04:55</span>
            </div>
            <p className="text-xs font-dm_sans font-semibold leading-tight m-0">Capital Sanction</p>
            <span className="text-[10px] opacity-75 font-geist_mono block mt-1">Disbursal Ready</span>
          </div>
        </div>

        {/* Simulation Reset & Quick Action */}
        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            onClick={handleResetSimulation}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/70 hover:bg-white text-stone-800 text-[11px] font-geist_mono border border-stone-300/60 shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            <svg viewBox="0 0 24 24" className="w-3 h-3 text-emerald-700" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M1 4v6h6M23 20v-6h-6" />
              <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" />
            </svg>
            <span>Restart 5-Min Cycle</span>
          </button>
          <a
            href="#themes"
            className="inline-flex items-center gap-1 text-[11px] font-geist_mono text-[#244626] font-semibold hover:underline"
          >
            <span>Explore Underwriting Pillars →</span>
          </a>
        </div>
      </div>

      {/* Valley Background */}
      <div className="cd-valley absolute bottom-0 left-0 right-0 w-full pointer-events-none select-none z-0" aria-hidden="true">
        <img
          src="/images/assets/valley.webp"
          alt=""
          width="2752"
          height="1536"
          className="cd-valley-img w-full h-auto object-cover object-bottom"
          loading="eager"
        />
      </div>
    </section>
  );
};