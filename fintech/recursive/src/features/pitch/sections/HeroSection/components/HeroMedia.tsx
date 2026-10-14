import { useEffect, useRef } from "react";

export const HeroMedia = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.play().catch(() => {
          // Autoplay policy fallback
        });
      }
    };

    playVideo();
    window.addEventListener("app-intro-done", playVideo);
    window.addEventListener("pointerdown", playVideo, { once: true });
    window.addEventListener("scroll", playVideo, { once: true });

    return () => {
      window.removeEventListener("app-intro-done", playVideo);
      window.removeEventListener("pointerdown", playVideo);
      window.removeEventListener("scroll", playVideo);
    };
  }, []);

  return (
    <div className="hero-video-wrap">
      <img
        src="/images/assets/hero_poster.jpg"
        alt=""
        aria-hidden="true"
        draggable="false"
        className="hero-video hero-poster"
      />

      <video
        ref={videoRef}
        src="/images/assets/hero_loop.mp4"
        poster="/images/assets/hero_poster.jpg"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="hero-video"
      />

      <style>{`
        .hero-video-wrap {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
        }

        .hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          pointer-events: none;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};