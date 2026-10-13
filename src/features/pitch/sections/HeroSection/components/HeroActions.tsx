export const HeroActions = () => {
  return (
    <div className="hero-action-dock-split">
      {/* Button 1: Live Simulation */}
      <a
        href="#countdown"
        aria-label="Launch 5-Minute Live Underwriting Simulation"
        className="hero-btn-applicant"
      >
        <svg className="w-4 h-4 text-[#264A22]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0C12 7 7 12 0 12C7 12 12 17 12 24C12 17 17 12 24 12C17 12 12 7 12 0Z" />
        </svg>
        <span>Live Simulation</span>
      </a>

      {/* Button 2: Scoring Pillars */}
      <a
        href="#themes"
        className="hero-btn-officer"
        aria-label="Explore Scoring Pillars"
      >
        <span className="hero-portal-pip" />
        <span>Scoring Pillars</span>
        <span className="hero-portal-arrow">→</span>
      </a>

      <style>{`
        .hero-action-dock-split {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .hero-btn-applicant {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          height: 46px;
          padding: 0 1.4rem;
          border-radius: 8px;
          background: #D2E8B8;
          color: #142813;
          border: 1px solid rgba(47, 85, 39, 0.3);
          font-family: var(--font-dm-sans), system-ui, sans-serif;
          font-size: 0.92rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(47, 85, 39, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.6);
          transition: background 180ms ease, color 180ms ease, border-color 180ms ease, transform 180ms ease, box-shadow 180ms ease;
          white-space: nowrap;
        }

        .hero-btn-applicant:hover {
          background: #C2DEA4;
          border-color: rgba(47, 85, 39, 0.5);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(47, 85, 39, 0.25);
        }

        .hero-btn-applicant:active {
          transform: scale(0.98);
        }

        .hero-btn-officer {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          height: 46px;
          padding: 0 1.35rem;
          border-radius: 8px;
          background: #111A11;
          color: #F4F8F0;
          border: 1px solid rgba(143, 196, 90, 0.35);
          font-family: var(--font-dm-sans), system-ui, sans-serif;
          font-size: 0.92rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(17, 26, 17, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transition: background 180ms ease, color 180ms ease, border-color 180ms ease, transform 180ms ease, box-shadow 180ms ease;
          white-space: nowrap;
        }

        .hero-btn-officer:hover {
          background: #1B2B1C;
          border-color: #8FC45A;
          color: #FFFFFF;
          transform: translateY(-1px);
          box-shadow: 0 6px 22px rgba(143, 196, 90, 0.25);
        }

        .hero-btn-officer:active {
          transform: scale(0.98);
        }

        .hero-portal-pip {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #8FC45A;
          box-shadow: 0 0 8px #8FC45A;
          flex-shrink: 0;
        }

        .hero-portal-arrow {
          font-size: 1rem;
          line-height: 1;
          color: #8FC45A;
          transition: transform 180ms ease;
        }

        .hero-btn-officer:hover .hero-portal-arrow {
          transform: translateX(2px);
        }

        @media (max-width: 720px) {
          .hero-action-dock-split {
            flex-direction: column;
            width: calc(100vw - 2rem);
            max-width: 18rem;
            align-items: stretch;
          }
          .hero-btn-applicant,
          .hero-btn-officer {
            width: 100% !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};