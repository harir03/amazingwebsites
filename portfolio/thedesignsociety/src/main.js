import './styles/fonts.css';
import './styles/theme.css';
import './styles/crt.css';
import './styles/nav.css';
import './styles/loader.css';
import './styles/hero.css';
import './styles/about.css';
import './styles/events.css';
import './styles/team.css';
import './styles/footer.css';

import { initCRTOverlay } from './components/CRTOverlay.js';
import { renderNavigation, initNavigation } from './components/Navigation.js';
import { renderLoader, initLoader } from './components/Loader.js';
import { renderHeroSection, initHeroInteractions } from './components/HeroSection.js';
import { renderAboutSection, initAboutScrollAnimation } from './components/AboutSection.js';
import { renderEventsSection, initEventsInteractions } from './components/EventsSection.js';
import { renderTeamSection } from './components/TeamSection.js';
import { renderFooterSection, initFooterInteractions } from './components/FooterSection.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (!app) return;

  // 1. Mount CRT Retro Monitor Display Shaders
  initCRTOverlay(true);

  // 2. Mount Loader Sequence
  const loader = renderLoader();
  document.body.appendChild(loader);

  // 3. Mount Two-step Navigation
  const nav = renderNavigation();
  document.body.prepend(nav);

  // 4. Mount Main Sections
  app.appendChild(renderHeroSection());
  app.appendChild(renderAboutSection());
  app.appendChild(renderEventsSection());
  app.appendChild(renderTeamSection());
  app.appendChild(renderFooterSection());

  // 5. Initialize Interactive Controllers
  initNavigation();
  initHeroInteractions();
  initAboutScrollAnimation();
  initEventsInteractions();
  initFooterInteractions();

  // 6. Complete Boot Sequence
  initLoader(() => {
    console.log('The Design Society — Secret Protocol Initialized');
  });
});
