import './styles/fonts.css';
import './styles/webflow.css';
import './styles/custom.css';
import './styles/crt.css';

import { initCRTOverlay } from './components/CRTOverlay.js';
import { renderLoader, initLoaderAnimation } from './components/Loader.js';
import { renderNavigation, initNavigation } from './components/Navigation.js';
import { renderHeroSection, initHeroAnimations } from './components/HeroSection.js';
import { renderAboutSection, initAboutAnimations } from './components/AboutSection.js';
import { renderEventsSection, initEventsAnimations } from './components/EventsSection.js';
import { renderTeamSection, initTeamAnimations } from './components/TeamSection.js';
import { renderFooterSection, initFooterAnimations } from './components/FooterSection.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (!app) return;

  // 1. Register GreenSock Plugins
  if (window.gsap) {
    const plugins = [
      window.CustomEase,
      window.ScrollTrigger,
      window.SplitText,
      window.ScrambleTextPlugin,
      window.Draggable,
      window.Observer,
      window.InertiaPlugin
    ].filter(Boolean);
    window.gsap.registerPlugin(...plugins);
    if (window.ScrollTrigger) {
      window.ScrollTrigger.config({ ignoreMobileResize: true });
    }
  }

  // 2. Initialize Lenis Smooth Scrolling
  let lenis = null;
  if (typeof window.Lenis !== 'undefined') {
    lenis = new window.Lenis({ lerp: 0.05, wheelMultiplier: 1 });
    if (window.ScrollTrigger) {
      lenis.on('scroll', window.ScrollTrigger.update);
    }
    if (window.gsap) {
      window.gsap.ticker.add((time) => lenis.raf(time * 1000));
      window.gsap.ticker.lagSmoothing(0);
    }
    window.__lenis = lenis;
  }

  // 3. Mount CRT Monitor Shader Effect
  initCRTOverlay(true);

  // 4. Render All Official 1:1 Sections into DOM
  app.innerHTML = `
    ${renderLoader()}
    ${renderNavigation()}
    <main class="main-wrapper">
      ${renderHeroSection()}
      ${renderAboutSection()}
      ${renderEventsSection()}
      ${renderTeamSection()}
    </main>
    ${renderFooterSection()}
  `;

  // 5. Initialize Controllers & Micro-Animations Section by Section
  initLoaderAnimation();
  initNavigation();
  initHeroAnimations();
  initAboutAnimations();
  initEventsAnimations();
  initTeamAnimations();
  initFooterAnimations();

  if (window.ScrollTrigger) {
    window.ScrollTrigger.refresh();
  }

  console.log('The Design Society — Full Forensic 1:1 Recreation Active 🚀');
});
