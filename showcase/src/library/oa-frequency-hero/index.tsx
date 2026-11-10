import { useEffect, useRef, useState } from "react";

/**
 * Harmonic Frequency Spectrum Hero — Overworld Audio
 * Live Web Audio API harmonic oscillator with interactive canvas waveform
 * and frequency readout node control.
 */
export default function FrequencySpectrumHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [playing, setPlaying] = useState(false);
  const [freq, setFreq] = useState(440);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.connect(ctx.destination);

      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.connect(gain);
      osc.start();

      audioCtxRef.current = ctx;
      gainRef.current = gain;
      oscRef.current = osc;
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  };

  const toggleSound = () => {
    initAudio();
    if (!audioCtxRef.current || !gainRef.current) return;
    const next = !playing;
    setPlaying(next);
    if (next) {
      gainRef.current.gain.setTargetAtTime(0.08, audioCtxRef.current.currentTime, 0.05);
    } else {
      gainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.05);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newFreq = Math.round(110 + x * 770);
    setFreq(newFreq);
    if (oscRef.current && audioCtxRef.current) {
      oscRef.current.frequency.setTargetAtTime(newFreq, audioCtxRef.current.currentTime, 0.03);
    }
  };

  // Canvas Waveform Render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const cy = h / 2;

      ctx.beginPath();
      ctx.strokeStyle = playing ? "#A3E635" : "rgba(163, 230, 53, 0.4)";
      ctx.lineWidth = 2.5;

      const cycles = freq / 90;
      for (let x = 0; x < w; x++) {
        const t = x / w;
        const amp = playing ? 35 : 14;
        const y = cy + Math.sin(t * Math.PI * 2 * cycles + phase) * amp * Math.sin(t * Math.PI);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      phase += playing ? 0.08 : 0.02;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [freq, playing]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="w-full bg-[#08080A] text-[#E9ECEE] p-6 sm:p-10 font-sans rounded-3xl border border-white/10 shadow-2xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#A3E635]">
            <span className="h-2 w-2 rounded-full bg-[#A3E635] animate-ping"></span>
            <span>DSP HARMONIC SYNTHESIS</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold mt-1 tracking-tight">Sonic Frequency Visualizer</h3>
        </div>

        <button
          type="button"
          onClick={toggleSound}
          className={`rounded-full px-5 py-2 text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 border ${
            playing
              ? "bg-[#A3E635] text-[#08080A] border-[#A3E635] shadow-lg"
              : "border-[#A3E635]/40 text-[#A3E635] hover:bg-[#A3E635]/10"
          }`}
        >
          <span>{playing ? "◼" : "▶"}</span>
          <span>{playing ? "Mute Sine Wave" : "Synthesize Sound"}</span>
        </button>
      </div>

      <div className="mt-6 rounded-2xl bg-[#13151F] border border-white/10 p-5 relative">
        <div className="flex justify-between items-center text-xs font-mono text-[#6E8799] mb-3">
          <span>REAL-TIME HARMONIC SPECTRUM</span>
          <span className="text-[#A3E635] font-bold">{freq}.0 Hz · PURE SINE</span>
        </div>

        <canvas
          ref={canvasRef}
          width={800}
          height={180}
          onMouseMove={handleMouseMove}
          onClick={() => !playing && toggleSound()}
          className="w-full h-36 rounded-xl bg-[#08080A] cursor-ew-resize border border-white/5"
        />

        <div className="mt-3 flex justify-between text-[11px] font-mono text-[#6E8799]">
          <span>110 Hz (Sub Bass)</span>
          <span className="hidden sm:inline text-white/40">← Slide cursor horizontally across waveform →</span>
          <span>880 Hz (Air / Treble)</span>
        </div>
      </div>
    </div>
  );
}
