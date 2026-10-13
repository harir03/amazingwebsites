export type DesktopMentorCardProps = {
  ariaLabel: string;
  primaryIconSrc: string;
  secondaryIconSrc: string;
  seatLabel: string;
  title: string;
  status: string;
  category: string;
  subtitle: string;
  groupLabel: string;
  description: string;
  firstMetricValue: string;
  firstMetricLabel: string;
  secondMetricValue: string;
  secondMetricLabel: string;
  imageSrc?: string;
};

export const DesktopMentorCard = (props: DesktopMentorCardProps) => {
  return (
    <div
      aria-label={props.ariaLabel}
      className="group relative aspect-[4/5] rounded-[22px] bg-gradient-to-b from-[#112413]/95 via-[#09140a] to-[#040804] border border-[#5C8C3A]/35 p-6 flex flex-col justify-between shadow-[0_16px_48px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(143,196,90,0.2)] overflow-hidden transition-all duration-300 hover:border-[#8FC45A]/60 hover:shadow-[0_20px_60px_rgba(14,35,16,0.4)] text-left select-none"
    >
      {/* Background Image */}
      {props.imageSrc && (
        <div className="absolute inset-0 z-0 overflow-hidden rounded-[22px]">
          <img
            src={props.imageSrc}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-all duration-500 scale-100 group-hover:scale-105 filter brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e2011]/70 via-[#09140a]/80 to-[#030704]/95" />
        </div>
      )}

      {/* Subtle Background Glow */}
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#8FC45A]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#8FC45A]/15 transition-all duration-500" />

      {/* Top Header: Seat & Status */}
      <div className="flex items-center justify-between z-10">
        <span className="font-geist_mono text-xs uppercase tracking-wider text-lime-400 font-semibold">
          {props.seatLabel}
        </span>
        <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-[10px] font-geist_mono uppercase tracking-wider font-semibold shadow-[0_0_12px_rgba(16,185,129,0.15)]">
          {props.status}
        </span>
      </div>

      {/* Center Visual */}
      <div className="my-auto py-2 flex flex-col items-center justify-center z-10">
        <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-lime-900/40 to-black/80 border border-lime-500/30 shadow-[0_0_24px_rgba(92,140,58,0.2)] group-hover:scale-105 group-hover:border-lime-400/50 transition-all duration-300 backdrop-blur-sm">
          <img
            src={props.secondaryIconSrc}
            alt=""
            aria-hidden="true"
            className="w-7 h-7 object-contain filter drop-shadow-[0_2px_8px_rgba(143,196,90,0.4)]"
          />
        </div>
        <span className="mt-3 text-[10px] font-geist_mono uppercase tracking-widest text-lime-400/70">
          PLANNED HORIZON
        </span>
      </div>

      {/* Bottom Content: Domain & Focus */}
      <div className="z-10 pt-3 border-t border-lime-900/30">
        <span className="text-[10px] font-geist_mono uppercase tracking-widest text-lime-400 block font-medium">
          {props.category}
        </span>

        <h4 className="text-base md:text-lg font-bold font-headingNow text-lime-50 leading-snug mt-1 group-hover:text-white transition-colors">
          {props.title}
        </h4>

        <p className="text-xs text-stone-300/80 font-dm_sans mt-1 line-clamp-3 leading-relaxed">
          {props.description}
        </p>

        {/* Metrics Strip */}
        <div className="mt-3 flex items-center gap-3 text-[11px] font-geist_mono text-lime-300/90 pt-2 border-t border-white/5">
          <span className="inline-flex items-center gap-1">
            <b className="font-bold text-lime-200">{props.firstMetricValue}</b>
            <span className="text-stone-400 text-[10px] uppercase">{props.firstMetricLabel}</span>
          </span>
          <span className="text-stone-600">·</span>
          <span className="inline-flex items-center gap-1">
            <b className="font-bold text-lime-200">{props.secondMetricValue}</b>
            <span className="text-stone-400 text-[10px] uppercase">{props.secondMetricLabel}</span>
          </span>
        </div>
      </div>
    </div>
  );
};