import { defineComponent } from "../define";
import type { WebsiteEntry } from "../types";

const site = { title: "Overworld Audio", theme: "sonic-interactive" as const };

const SANS = "'Space Grotesk', 'Geist', system-ui, sans-serif";
const MONO = "'JetBrains Mono', 'Geist Mono', monospace";
const ORIGINAL = ["Space Grotesk", "Geist"];
const COLORS = {
  noir: "#08080A",
  slate: "#13151F",
  lime: "#A3E635",
  gray: "#6E8799",
  white: "#E9ECEE",
};
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const EASE_SOURCE = "Procedural Web Audio API oscillator interpolation";

export const overworldAudio: WebsiteEntry = {
  id: "overworldaudio",
  title: site.title,
  theme: site.theme,
  themeDisplayName: "Interactive Sonic & Game Audio Architecture",
  originalUrl: "https://overworldaudio.com/",
  localDevUrl: "http://localhost:3007/",
  repoPath: "media/overworldaudio",
  description:
    "A game audio co-development and sound design studio featuring real-time Web Audio API frequency waveform visualizers, interactive stem mixing consoles, and dark acoustic studio aesthetics.",
  tagline: "48kHz sound architecture, procedural synth visualizers, and stem reels.",
  previewThumbnail: "live:oa-frequency-hero",
  techStack: ["Nuxt", "Vue", "Web Audio API", "HTML5 Canvas", "TailwindCSS"],
  palette: ["#08080A", "#13151F", "#A3E635", "#E9ECEE"],
  components: [
    defineComponent(site, {
      id: "oa-frequency-hero",
      name: "Sonic Frequency Visualizer",
      category: "hero",
      summary: "Live procedural Web Audio oscillator with real-time 60fps canvas waveform and cursor-driven frequency modulation from 110Hz to 880Hz.",
      tags: ["audio", "visualizer", "canvas", "Web Audio", "oscillator", "frequency", "sound design"],
      hasAudio: true,
      motionSpecs: {
        engine: "Web Audio",
        easingCurve: EASE,
        easingSource: EASE_SOURCE,
        duration: "Real-time 60fps canvas loop",
        triggers: "hover",
        notes: "Moving the cursor horizontally across the canvas adjusts oscillator frequency between 110Hz and 880Hz with continuous sine wave recalculation.",
        parameters: { "Frequency Range": "110 Hz → 880 Hz", "Ramp Time": "0.03s linear ramp", "Canvas Phase": "0.08 increment per frame" },
      },
      designTokens: { fontFamilies: [SANS, MONO], originalFonts: ORIGINAL, colors: COLORS, materials: ["studio noir acrylic", "glowing lime phosphor line", "subtle audio grid"] },
      prompt: {
        structure: [
          "Header bar with DSP status indicator, title, and Synthesize/Mute button.",
          "Central dark screen containing real-time frequency telemetry (Hz readout and waveform type).",
          "HTML5 Canvas rendering smooth sine waves with dynamic amplitude and frequency responsive to mouse coordinates.",
          "Sub-bass to treble scale legend along bottom.",
        ],
        fonts: [SANS + " for titles", MONO + " for telemetry readout and frequency labels"],
        colors: "screen #08080A with #A3E635 lime phosphor lines over #13151F dark studio casing",
        entrance: "Waveform animates continuously at 60fps with gentle idle breathing.",
        interaction: "Hovering across canvas modulates wave frequency. Clicking sound button unlocks AudioContext and synthesizes tone.",
        polish: ["Anti-aliased 2.5px canvas stroke", "Smooth volume ramp on mute/unmute to prevent audio clicks"],
        accessibility: ["Keyboard accessible mute control", "Never autoplays audio without user gesture"],
      },
    }),
    defineComponent(site, {
      id: "oa-audio-reel-deck",
      name: "Stem Audio Reel Deck",
      category: "floating-dock",
      summary: "Multi-track audio mixer console with 4 independent stem channels (Sub Bass, Percussion, Synth Lead, Foley SFX), solo/mute buttons, and peak meters.",
      tags: ["mixer", "stems", "audio console", "mute solo", "peak meters", "game audio"],
      hasAudio: true,
      motionSpecs: {
        engine: "CSS",
        easingCurve: EASE,
        easingSource: EASE_SOURCE,
        duration: "0.2s button state switch",
        triggers: "click",
        notes: "Master transport triggers simultaneous playback while individual channel mute and solo buttons toggle track activity.",
        parameters: { "Solo Glow": "box-shadow 0 0 16px rgba(163,230,53,0.4)", "Meter Pulse": "2s breathing opacity" },
      },
      designTokens: { fontFamilies: [SANS, MONO], originalFonts: ORIGINAL, colors: COLORS, materials: ["rack mount chassis", "illuminated LED buttons", "level meters"] },
      prompt: {
        structure: [
          "Master transport control bar with Play All Stems action.",
          "Four-column channel strip grid (Sub Bass, Percussion, Synth Lead, Foley SFX).",
          "Each channel strip features channel number, dB level readout, animated waveform representation, and dedicated Mute/Solo button pair.",
        ],
        fonts: [SANS + " for channel names", MONO + " for decibel values and technical metadata"],
        colors: "chassis #08080A, cards #13151F, active accents #A3E635 and muted red #EF4444",
        entrance: "Channels mount with dark studio elevation.",
        interaction: "Clicking Solo highlights the selected track in lime; clicking Mute attenuates it in red. Master play drives animated waveform activity.",
        polish: ["Subtle pulsing indicator on playing tracks", "Tactile button feedback"],
        accessibility: ["Clear state indicators (Muted / Soloed text)", "Aria pressed states on toggle buttons"],
      },
    }),
  ],
};
