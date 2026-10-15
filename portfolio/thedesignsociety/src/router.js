/**
 * The Design Society Lyon — Official Client Router with Pixel Dissolve Transition
 */
import { renderHomePage, initHomePage } from './pages/HomePage.js';
import { renderEventsPage, initEventsPage } from './pages/EventsPage.js';
import { renderAboutPage, initAboutPage } from './pages/AboutPage.js';
import { renderContactPage, initContactPage } from './pages/ContactPage.js';
import { playPixelTransition } from './components/PageTransition.js';

const routes = {
  home: {
    title: 'The Design Society Lyon — la communauté des designers',
    render: renderHomePage,
    init: initHomePage
  },
  events: {
    title: 'Événements design à Lyon : talks et apéros designers',
    render: renderEventsPage,
    init: initEventsPage
  },
  about: {
    title: 'Qui sommes-nous — The Design Society Lyon',
    render: renderAboutPage,
    init: initAboutPage
  },
  contact: {
    title: 'Contact — The Design Society Lyon',
    render: renderContactPage,
    init: initContactPage
  }
};

export function resolveRoute(path = window.location.pathname) {
  const clean = path.replace(/\/$/, '') || '/';
  if (clean === '/' || clean === '/index.html') return 'home';
  if (clean === '/evenements') return 'events';
  if (clean === '/a-propos') return 'about';
  if (clean === '/contact') return 'contact';
  return 'home';
}

export function updateNavState(currentPath) {
  const norm = (p) => (p.replace(/\/$/, '') || '/');
  const targetPath = norm(currentPath);

  document.querySelectorAll('.twostep-nav__link').forEach(link => {
    const href = norm(link.getAttribute('href') || '');
    if (href === targetPath) {
      link.classList.add('w--current');
      link.setAttribute('aria-current', 'page');
    } else if (href.startsWith('/')) {
      link.classList.remove('w--current');
      link.removeAttribute('aria-current');
    }
  });
}

export function navigateTo(path, pushState = true) {
  const routeKey = resolveRoute(path);
  const route = routes[routeKey] || routes.home;

  // 1. Close navigation drawer
  const navStatus = document.querySelector('[data-nav-status]');
  if (navStatus) {
    navStatus.setAttribute('data-nav-status', 'not-active');
  }

  // 2. Execute pixel dissolve transition
  playPixelTransition({
    onCovered: () => {
      // Clean up previous ScrollTriggers
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach(t => t.kill());
      }

      // Mount new page container
      const container = document.getElementById('router-view');
      if (container) {
        container.innerHTML = route.render();
      }

      // Update URL and document title
      if (pushState && window.location.pathname !== path) {
        window.history.pushState({}, '', path);
      }
      document.title = route.title;

      // Reset scroll position
      window.scrollTo(0, 0);
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
        window.__lenis.resize();
      }

      // Update active class on nav
      updateNavState(path);
    },
    onComplete: () => {
      // Initialize new page scripts
      const container = document.getElementById('router-view');
      route.init(container);

      if (window.ScrollTrigger) {
        window.ScrollTrigger.refresh();
      }
    }
  });
}

export function initRouter() {
  // 1. Handle link clicks
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Check if it's an external link or special scheme
    if (
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('#') ||
      link.getAttribute('target') === '_blank'
    ) {
      return;
    }

    // It's an internal route link
    if (href.startsWith('/') || href === '') {
      e.preventDefault();
      navigateTo(href);
    }
  });

  // 2. Handle browser back / forward
  window.addEventListener('popstate', () => {
    navigateTo(window.location.pathname, false);
  });

  // 3. Mount initial route
  const initialRouteKey = resolveRoute(window.location.pathname);
  const initialRoute = routes[initialRouteKey] || routes.home;
  document.title = initialRoute.title;
  updateNavState(window.location.pathname);

  const container = document.getElementById('router-view');
  if (container) {
    container.innerHTML = initialRoute.render();
    initialRoute.init(container);
  }
}
