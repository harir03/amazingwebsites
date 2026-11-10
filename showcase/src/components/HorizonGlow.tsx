import { motion } from "framer-motion";

interface HorizonGlowProps {
  className?: string;
  withAperture?: boolean;
  apertureLabel?: string;
}

export function HorizonGlow({ className = "", withAperture = false, apertureLabel }: HorizonGlowProps) {
  return (
    <div className={`relative w-full overflow-visible py-8 pointer-events-none select-none ${className}`}>
      {/* Ambient Radial Bloom */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-44 bg-gradient-to-r from-transparent via-amber-500/25 to-transparent blur-[70px] opacity-70 dark:opacity-85" />
      
      {/* Secondary Warm Copper Diffused Flare */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-2xl h-24 bg-gradient-to-r from-transparent via-orange-500/40 to-transparent blur-[36px]" />

      {/* Razor Thin Horizon Line with Bright Center Core */}
      <div className="relative mx-auto w-full max-w-5xl h-[2px]">
        {/* Diffused outer line glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/70 to-transparent blur-xs" />
        
        {/* Crisp intense 1px center laser line */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400 via-amber-200 via-white to-transparent shadow-[0_0_16px_2px_rgba(255,140,40,0.85)]" />
      </div>

      {/* Optional Illuminated Center Aperture Emblem */}
      {withAperture && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="group relative flex items-center justify-center"
          >
            {/* Aperture Ring & Glow */}
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-orange-500/40 via-amber-400/60 to-orange-500/40 blur-md opacity-75 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-amber-400/50 bg-[#120d0a] shadow-[0_0_24px_rgba(255,107,0,0.5)]">
              {/* Geometric Delta Symbol */}
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-amber-300 drop-shadow-[0_0_6px_rgba(255,200,100,0.8)]" fill="currentColor">
                <path d="M12 3L2 21h20L12 3zm0 4.2L18.4 19H5.6L12 7.2z" />
              </svg>
            </div>
            {apertureLabel && (
              <span className="absolute -bottom-6 text-[11px] font-mono tracking-wider uppercase text-amber-300/80 whitespace-nowrap">
                {apertureLabel}
              </span>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
