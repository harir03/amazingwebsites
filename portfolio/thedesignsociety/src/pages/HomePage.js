import { renderHeroSection, initHeroAnimations } from '../components/HeroSection.js';
import { renderAboutSection, initAboutAnimations } from '../components/AboutSection.js';
import { renderEventsSection, initEventsAnimations } from '../components/EventsSection.js';
import { renderTeamSection, initTeamAnimations } from '../components/TeamSection.js';
import { renderFooterSection, initFooterAnimations } from '../components/FooterSection.js';

export function renderHomePage() {
  return `
    <div data-barba="container" class="div-block-home">
      <main class="main-wrapper">
        ${renderHeroSection()}
        ${renderAboutSection()}
        ${renderEventsSection()}
        ${renderTeamSection()}
      </main>
      ${renderFooterSection()}
    </div>
  `;
}

export function initHomePage(container = document) {
  initHeroAnimations();
  initAboutAnimations();
  initEventsAnimations();
  initTeamAnimations();
  initFooterAnimations();
}
