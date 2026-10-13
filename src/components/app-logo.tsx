import React from 'react';

export interface AppLogoProps {
  variant?: 'hero' | 'nav' | 'footer' | 'badge';
  theme?: 'dark' | 'light' | 'forest';
  className?: string;
  showSublabel?: boolean;
  sublabelText?: string;
}

/**
 * Creative LOREM IPSUM Logo Component
 */
export const AppLogo: React.FC<AppLogoProps> = ({
  variant = 'nav',
  theme = 'light',
  className = '',
  showSublabel = true,
  sublabelText = 'LOREM IPSUM DOLOR',
}) => {
  const isDark = theme === 'dark' || theme === 'forest';

  const navTextColor = isDark ? 'text-[#F4F0E8]' : 'text-[#121A12]';
  const navStarColor = isDark ? 'text-[#8FC45A]' : 'text-[#121A12]';
  const navSubColor = isDark ? 'text-[#8FC45A]' : 'text-[#2F5527]';

  if (variant === 'nav') {
    return (
      <div className={`inline-flex flex-col items-start select-none ${className}`}>
        <div className="flex items-center">
          <span className={`font-headingNow font-black text-[20px] md:text-[24px] tracking-[-0.04em] uppercase ${navTextColor} leading-none inline-flex items-center`}>
            <span>LOREM</span>
            <svg
              className={`w-3.5 h-3.5 ${navStarColor} mx-0.5 animate-pulse`}
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0C12 7 7 12 0 12C7 12 12 17 12 24C12 17 17 12 24 12C17 12 12 7 12 0Z" />
            </svg>
            <span>IPSUM</span>
          </span>
        </div>
        {showSublabel && (
          <span className={`text-[7px] font-mono uppercase tracking-[0.24em] ${navSubColor} font-semibold mt-0.5`}>
            {sublabelText}
          </span>
        )}
      </div>
    );
  }

  if (variant === 'hero') {
    const isHeroDark = isDark;
    const heroTextColor = isHeroDark ? '#FFFFFF' : '#0B160D';
    const heroStarColor = isHeroDark ? '#8FC45A' : '#5C8C3A';
    const heroSubColor = isHeroDark ? '#8FC45A' : '#1A3816';
    const heroRuleColor = isHeroDark ? 'bg-[#8FC45A]/50' : 'bg-[#2A5223]/35';

    return (
      <div className={`flex flex-col items-center justify-center select-none w-full max-w-full ${className}`}>
        <div className="relative inline-flex items-center justify-center">
          <div
            className="font-headingNow font-black text-[clamp(3.2rem,11.5vw,8.8rem)] tracking-[-0.04em] leading-[0.86] uppercase select-none text-center flex items-center justify-center"
            style={{
              color: heroTextColor,
              textShadow: isHeroDark
                ? '0 0 32px rgba(143,196,90,0.45)'
                : '0 2px 24px rgba(255,255,255,0.85), 0 6px 28px rgba(11,22,13,0.18)',
            }}
          >
            <span style={{ color: heroTextColor }}>LOREM</span>
            <span className="relative inline-flex items-center justify-center mx-[0.035em]">
              <svg
                className="w-[0.52em] h-[0.52em]"
                viewBox="0 0 24 24"
                fill={heroStarColor}
                aria-hidden="true"
                style={{
                  filter: isHeroDark
                    ? 'drop-shadow(0 0 14px rgba(143,196,90,0.7))'
                    : 'drop-shadow(0 2px 10px rgba(92,140,58,0.45))',
                }}
              >
                <path d="M12 0C12 7 7 12 0 12C7 12 12 17 12 24C12 17 17 12 24 12C17 12 12 7 12 0Z" />
              </svg>
            </span>
            <span style={{ color: heroTextColor }}>IPSUM</span>
          </div>
        </div>

        {showSublabel && (
          <div className="mt-3 md:mt-4 flex items-center justify-center gap-3">
            <span className={`h-px w-8 md:w-16 ${heroRuleColor}`} />
            <span
              className={`text-[11px] md:text-xs font-mono uppercase tracking-[0.32em] font-bold text-center`}
              style={{
                color: heroSubColor,
                textShadow: isHeroDark ? '0 0 12px rgba(143,196,90,0.5)' : '0 1px 8px rgba(255,255,255,0.8)',
              }}
            >
              {sublabelText}
            </span>
            <span className={`h-px w-8 md:w-16 ${heroRuleColor}`} />
          </div>
        )}
      </div>
    );
  }

  if (variant === 'footer') {
    const isFooterDark = isDark;
    const footerTextColor = isFooterDark ? '#FFFFFF' : '#0B160D';
    const footerStarColor = isFooterDark ? '#8FC45A' : '#5C8C3A';

    return (
      <div className={`flex flex-col items-center justify-center select-none w-full ${className}`}>
        <div
          className="font-headingNow font-black text-[min(clamp(7.5rem,34vw,42rem),60vh)] tracking-[-0.04em] leading-[0.80] uppercase select-none flex items-center justify-center"
          style={{
            color: footerTextColor,
            textShadow: isFooterDark
              ? '0 0 44px rgba(143,196,90,0.45)'
              : '0 2px 28px rgba(255,255,255,0.7), 0 6px 28px rgba(11,22,13,0.18)',
          }}
        >
          <span style={{ color: footerTextColor }}>LOREM</span>
          <span className="relative inline-flex items-center justify-center mx-[0.035em]">
            <svg
              className="w-[0.48em] h-[0.48em]"
              viewBox="0 0 24 24"
              fill={footerStarColor}
              aria-hidden="true"
              style={{
                filter: isFooterDark
                  ? 'drop-shadow(0 0 16px rgba(143,196,90,0.7))'
                  : 'drop-shadow(0 2px 12px rgba(92,140,58,0.45))',
              }}
            >
              <path d="M12 0C12 7 7 12 0 12C7 12 12 17 12 24C12 17 17 12 24 12C17 12 12 7 12 0Z" />
            </svg>
          </span>
          <span style={{ color: footerTextColor }}>IPSUM</span>
        </div>
      </div>
    );
  }

  // Badge / Compact
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 shadow-xs ${
        isDark
          ? 'border-[#8fc45a]/40 bg-[#121A12] text-[#F4F0E8]'
          : 'border-[#8fc45a]/30 bg-[#e8efe2]/90 text-[#121A12]'
      } ${className}`}
    >
      <svg
        className={`w-3 h-3 ${isDark ? 'text-[#8fc45a]' : 'text-[#121A12]'}`}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 0C12 7 7 12 0 12C7 12 12 17 12 24C12 17 17 12 24 12C17 12 12 7 12 0Z" />
      </svg>
      <span className="font-headingNow font-bold text-sm tracking-tight uppercase">
        LOREM IPSUM
      </span>
    </div>
  );
};

export const LoremLogo = AppLogo;
