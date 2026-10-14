/**
 * Team Section (mwg008 & section-5) — Les Saints Représentants Component
 * Features:
 * - 5 team cards with pixel SVG emblems (color shifting animation)
 * - Interactive hover portrait transformation (standard to 8-bit pixel art)
 * - Role badges and vernacular metadata
 */

export function renderTeamSection() {
  const section = document.createElement('section');
  section.className = 'section-5';
  section.id = 'team';

  const members = [
    {
      name: 'Samuel Boulery',
      role: 'Président',
      specialty: 'Référent IA Design',
      photo: '/images/sam.png',
      pixelPhoto: '/images/pixel-sam.png',
      svg: `
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="60" height="60" class="anime-couleur" fill="#BCF015"/>
          <path d="M30 30H70V40H30V30ZM30 50H70V60H30V50ZM30 70H70V80H30V70Z" fill="#141418"/>
        </svg>
      `
    },
    {
      name: 'Floriane Julliard',
      role: 'Trésorière',
      specialty: 'Lead Designer',
      photo: '/images/flo.png',
      pixelPhoto: '/images/pixel-flo.png',
      svg: `
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="anime-couleur" d="M50 15L62 38H88L67 54L75 78L50 63L25 78L33 54L12 38H38L50 15Z" fill="#350AFF"/>
        </svg>
      `
    },
    {
      name: 'Daniela Moncada',
      role: 'Communication',
      specialty: 'UX/UI Designer',
      photo: '/images/dani.png',
      pixelPhoto: '/images/pixel-dani.png',
      svg: `
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="35" class="anime-couleur" fill="#BCF015"/>
          <circle cx="50" cy="50" r="18" fill="#141418"/>
        </svg>
      `
    },
    {
      name: 'Loïc Pelletier',
      role: 'Partenariats',
      specialty: 'Lead Designer',
      photo: '/images/loic.png',
      pixelPhoto: '/images/pixel-loic.png',
      svg: `
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,15 85,50 50,85 15,50" class="anime-couleur" fill="#350AFF"/>
          <polygon points="50,30 70,50 50,70 30,50" fill="#141418"/>
        </svg>
      `
    },
    {
      name: 'Léa Maurin',
      role: 'Communication',
      specialty: 'UX/UI Designer',
      photo: '/images/lea.png',
      pixelPhoto: '/images/pixel-lea.png',
      svg: `
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="anime-couleur" d="M50 80C50 80 20 60 20 38C20 26 30 18 42 22C46 23 49 26 50 28C51 26 54 23 58 22C70 18 80 26 80 38C80 60 50 80 50 80Z" fill="#BCF015"/>
        </svg>
      `
    }
  ];

  const cardsHtml = members.map(m => `
    <div class="team-card" data-member="${m.name}">
      <div class="team-jingle-wrap">
        ${m.svg}
      </div>

      <div class="pixelated-image-card">
        <div class="pixelated-image-card__default">
          <img src="${m.photo}" alt="${m.name}" loading="lazy"/>
        </div>
        <div class="pixelated-image-card__active">
          <img src="${m.pixelPhoto}" alt="${m.name} 8-bit" loading="lazy"/>
        </div>
      </div>

      <div class="team-info">
        <h3 class="team-name">${m.name}</h3>
        <div class="team-badges">
          <span class="team-role-badge">${m.role}</span>
          <span class="team-specialty-badge">${m.specialty}</span>
        </div>
      </div>
    </div>
  `).join('');

  section.innerHTML = `
    <div class="team-container">
      <div class="team-header">
        <span class="team-eyebrow">[ COLLECTIF // COLLÈGE DES FONDATEURS ]</span>
        <h2 class="team-h2">Les Saints Représentants</h2>
        <p class="team-desc">
          On vous montre nos têtes, mais évitez de nous reconnaître dans la rue.
        </p>
      </div>

      <div class="team-grid">
        ${cardsHtml}
      </div>
    </div>
  `;

  return section;
}
