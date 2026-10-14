/**
 * Events Section (section-6) Component
 * Features:
 * - Interactive expandable gallery slots with smooth flex-grow
 * - Animated progress indicators for active slot auto-cycle
 * - Speaker showcase with local images
 */

export function renderEventsSection() {
  const section = document.createElement('section');
  section.className = 'section-6';
  section.id = 'events';

  const events = [
    {
      id: 1,
      tag: 'TALK #1 // CONFÉRENCE',
      title: "L'histoire du Design avec Hugo Douchet",
      desc: "Talk sur l'influence des outils (Figma, Penpot, Photoshop, Blender...) sur nos démarches créatives. Hugo met en lumière les évolutions techniques qui ont redéfini nos pratiques de designers.",
      date: '24 OCTOBRE 2025',
      location: 'LYON 7E',
      image: '/images/hugo.png',
      cta: 'RÉSERVER SUR EVENTBRITE'
    },
    {
      id: 2,
      tag: 'APÉRO #1 // DÉCOMPRESSION',
      title: 'Soirée Networking & Échange Libres',
      desc: "Rencontre sans filtre entre directeurs artistiques, UX researchers, UI designers, développeurs front et étudiants. Venez échanger autour d'un verre sans langue de bois.",
      date: '12 NOVEMBRE 2025',
      location: 'PENTES CROIX-ROUSSE',
      image: '/images/julien.png',
      cta: 'ENTRÉE LIBRE'
    },
    {
      id: 3,
      tag: 'TALK #2 // ATELIER',
      title: 'Design Systèmes & Accessibilité avec Salomé',
      desc: 'Comment concilier esthétique radicale, micro-animations immersives et conformité stricte aux critères d’accessibilité RGAA & WCAG dans les produits numériques actuels.',
      date: '05 DÉCEMBRE 2025',
      location: 'PRESQU’ÎLE LYON',
      image: '/images/salome.png',
      cta: 'PLACES LIMITÉES'
    }
  ];

  const slotsHtml = events.map((ev, index) => `
    <div class="gallery-slot ${index === 0 ? 'is-active' : ''}" data-slot-id="${ev.id}">
      <div class="slot-image-wrap">
        <img class="slot-image" src="${ev.image}" alt="${ev.title}" loading="lazy"/>
      </div>
      <div class="slot-content">
        <div>
          <div class="slot-meta">
            <span>${ev.tag}</span>
            <span>${ev.date}</span>
          </div>
          <h3 class="slot-title">${ev.title}</h3>
          <p class="slot-desc">${ev.desc}</p>
        </div>
        <div class="slot-badges">
          <span class="pixel-badge green">${ev.location}</span>
          <a href="https://www.eventbrite.fr/o/the-design-society-110792418841" target="_blank" rel="noopener" class="slot-cta-btn">
            ${ev.cta} ↗
          </a>
        </div>
      </div>
      <div class="slot-progress-container">
        <div class="slot-progress-fill"></div>
      </div>
    </div>
  `).join('');

  section.innerHTML = `
    <div class="events-container">
      <div class="events-header">
        <span class="events-eyebrow">[ AGENDA // SECRET SOCIETY ]</span>
        <h2 class="events-h2">Nos Évènements</h2>
        <p class="events-desc">
          On fait des évènements secrets dans des lieux secrets. L'adresse est sur Eventbrite.
        </p>
      </div>

      <div class="gallery-slots-wrapper">
        ${slotsHtml}
      </div>
    </div>
  `;

  return section;
}

export function initEventsInteractions() {
  const eventsSec = document.getElementById('events');
  if (!eventsSec) return;

  const slots = eventsSec.querySelectorAll('.gallery-slot');
  let activeIndex = 0;
  let progress = 0;
  const cycleDuration = 5500; // 5.5s per slide
  let interval = null;

  const setActiveSlot = (index) => {
    activeIndex = index;
    progress = 0;

    slots.forEach((slot, i) => {
      const fill = slot.querySelector('.slot-progress-fill');
      if (i === activeIndex) {
        slot.classList.add('is-active');
        if (fill) fill.style.width = '0%';
      } else {
        slot.classList.remove('is-active');
        if (fill) fill.style.width = '0%';
      }
    });
  };

  slots.forEach((slot, index) => {
    slot.addEventListener('click', () => {
      setActiveSlot(index);
    });
  });

  // Auto-progress loop
  let lastTime = Date.now();
  const tick = () => {
    const now = Date.now();
    const dt = now - lastTime;
    lastTime = now;

    progress += dt;
    const activeSlot = slots[activeIndex];
    if (activeSlot) {
      const fill = activeSlot.querySelector('.slot-progress-fill');
      if (fill) {
        fill.style.width = `${Math.min(100, (progress / cycleDuration) * 100)}%`;
      }
    }

    if (progress >= cycleDuration) {
      setActiveSlot((activeIndex + 1) % slots.length);
    }
    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}
