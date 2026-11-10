import { useState } from "react";

/**
 * Multi-Stem Audio Reel Deck — Overworld Audio
 * Game audio mixing console with 4 independent stem channels,
 * mute/solo state management, and live simulated dB level meters.
 */
interface Stem {
  id: string;
  name: string;
  type: string;
  db: string;
}

const STEMS: Stem[] = [
  { id: "sub", name: "CH 01 · SUB BASS", type: "60Hz Drone Oscillator", db: "−6.2 dB" },
  { id: "perc", name: "CH 02 · PERCUSSION", type: "Glitch Poly-Rhythm", db: "−3.4 dB" },
  { id: "lead", name: "CH 03 · SYNTH LEAD", type: "Analog Filtered Arp", db: "−4.8 dB" },
  { id: "sfx", name: "CH 04 · FOLEY / SFX", type: "Mechanical UI Servos", db: "−8.1 dB" },
];

export default function AudioReelDeck() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState<Record<string, boolean>>({});
  const [soloed, setSoloed] = useState<Record<string, boolean>>({});

  const toggleMute = (id: string) => {
    setMuted((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSolo = (id: string) => {
    setSoloed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full bg-[#08080A] text-[#E9ECEE] p-6 sm:p-8 font-sans rounded-3xl border border-white/10 shadow-2xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <span className="text-xs font-mono uppercase text-[#A3E635] tracking-widest">Multi-Stem Mixing Console</span>
          <h3 className="text-2xl font-extrabold mt-1 tracking-tight">Game Audio Reel Deck</h3>
        </div>

        <button
          type="button"
          onClick={() => setPlaying(!playing)}
          className={`rounded-xl px-5 py-2.5 text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 ${
            playing ? "bg-white text-[#08080A]" : "bg-[#A3E635] text-[#08080A] hover:bg-white"
          }`}
        >
          <span>{playing ? "⏸" : "▶"}</span>
          <span>{playing ? "Pause Stems" : "Play All Stems"}</span>
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEMS.map((s) => {
          const isMute = !!muted[s.id];
          const isSolo = !!soloed[s.id];

          return (
            <div key={s.id} className="rounded-2xl border border-white/10 bg-[#13151F] p-5 space-y-4 shadow-lg">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white font-bold">{s.name}</span>
                <span className={`text-[11px] ${isMute ? "text-red-400" : "text-[#A3E635]"}`}>
                  {isMute ? "MUTED" : s.db}
                </span>
              </div>

              {/* Waveform Strip */}
              <div className="h-14 rounded-lg bg-[#08080A] flex items-center px-3 gap-1 overflow-hidden relative">
                <div
                  className={`h-6 w-full rounded flex items-center justify-center text-[10px] font-mono transition-opacity ${
                    isMute ? "opacity-20 bg-red-400/20 text-red-400" : isSolo ? "bg-[#A3E635] text-[#08080A] font-bold" : "bg-[#A3E635]/25 text-[#A3E635]"
                  } ${playing && !isMute ? "animate-pulse" : ""}`}
                >
                  {s.type}
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => toggleMute(s.id)}
                  className={`flex-1 rounded-lg border py-1.5 text-xs font-mono transition-colors ${
                    isMute ? "bg-red-500/20 border-red-500 text-red-400" : "border-white/10 text-white/80 hover:bg-white/10"
                  }`}
                >
                  {isMute ? "Muted" : "Mute"}
                </button>
                <button
                  type="button"
                  onClick={() => toggleSolo(s.id)}
                  className={`flex-1 rounded-lg border py-1.5 text-xs font-mono transition-colors ${
                    isSolo ? "bg-[#A3E635] text-[#08080A] border-[#A3E635] font-bold" : "border-white/10 text-white/80 hover:bg-[#A3E635]/20 hover:text-[#A3E635]"
                  }`}
                >
                  {isSolo ? "Soloed" : "Solo"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
