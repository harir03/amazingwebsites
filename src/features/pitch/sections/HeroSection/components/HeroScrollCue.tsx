export const HeroScrollCue = () => {
  return (
    <div className="hero-cue">
      <img
        src="/images/assets/icon-4.svg"
        alt=""
        aria-hidden="true"
        draggable="false"
        className="hero-cue-arrow"
      />

      <a
        href="#about"
        aria-label="Scroll to learn about the chair"
        className="hero-cue-text-block"
      >
        <p className="hero-cue-line">
          The white chair of Bharat commerce.
          <br />
          Everyday tea stalls, mandis and kiranas.
        </p>

        <span className="hero-cue-hint">
          Explore our credit thesis ↓
        </span>
      </a>

      <style>{`
        .hero-cue {
          display: flex;
          align-items: center;
          gap: clamp(0.25rem, 0.55vw, 0.55rem);
        }

        .hero-cue-arrow {
          width: clamp(22px, 6vw, 96px);
          height: auto;
          flex-shrink: 0;
          pointer-events: none;
          user-select: none;
          filter: drop-shadow(0 2px 4px rgba(18, 38, 18, 0.15));
        }

        .hero-cue-text-block {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          text-decoration: none;
          color: #0C180E;
          min-width: 0;
          background: rgba(247, 244, 237, 0.78);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          padding: clamp(0.3rem, 0.6vw, 0.45rem) clamp(0.5rem, 1vw, 0.8rem);
          border-radius: 12px;
          border: 1px solid rgba(47, 85, 39, 0.18);
          box-shadow: 0 4px 16px rgba(18, 38, 22, 0.08);
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .hero-cue-text-block:hover {
          background: rgba(247, 244, 237, 0.95);
          transform: translateY(-1px);
        }

        .hero-cue-line {
          margin: 0;
          font-family: var(--font-dm-sans), system-ui, sans-serif;
          font-size: clamp(0.52rem, 1.1vw, 0.9rem);
          font-weight: 600;
          letter-spacing: -0.015em;
          line-height: 1.2;
          color: #0C180E;
          word-break: break-word;
        }

        .hero-cue-hint {
          display: block;
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: clamp(0.42rem, 0.85vw, 0.7rem);
          font-weight: 700;
          letter-spacing: -0.01em;
          line-height: 1.4;
          color: #2F5527;
        }

        @media (max-width: 860px) {
          .hero-cue-arrow {
            width: clamp(18px, 5vw, 40px);
          }
        }

        @media (max-width: 600px) {
          .hero-cue-arrow {
            width: clamp(16px, 4.5vw, 28px);
            margin-top: -2px;
          }
          .hero-cue-line {
            font-size: clamp(0.46rem, 1.8vw, 0.56rem);
          }
          .hero-cue-hint {
            font-size: clamp(0.36rem, 1.5vw, 0.46rem);
          }
        }
      `}</style>
    </div>
  );
};