/**
 * AboutSection (mwg005) Component
 * Features:
 * - Dynamic scroll-activated kinetic typography
 * - Word-by-word reveal effect
 * - Interactive metadata pills
 */

export function renderAboutSection() {
  const section = document.createElement('section');
  section.className = 'mwg005';
  section.id = 'about';

  const rawText = "Née de l'envie de 5 designers, The Design Society organise des évènements pour rassembler les designers de Lyon. Entre les talks pour partager le savoir et les apéros pour l'oublier, on poursuit un but qu'on garde presque secret : créer les occasions qui manquaient de se rencontrer.";

  // Split into words with highlighting logic
  const wordsHtml = rawText.split(' ').map(word => {
    let extraClass = '';
    const cleanWord = word.toLowerCase().replace(/[^a-z0-9éèêàù]/g, '');
    if (cleanWord === '5' || cleanWord === 'designers') extraClass = 'highlight-green';
    if (cleanWord === 'lyon' || cleanWord === 'talks' || cleanWord === 'apros') extraClass = 'highlight-blue';
    return `<span class="word ${extraClass}">${word}</span>`;
  }).join(' ');

  section.innerHTML = `
    <div class="mwg005-container">
      <div class="about-header">
        <span>[ A PROPOS // NOTRE HISTOIRE ]</span>
        <span>RNA: W691112617 — LYON, FR</span>
      </div>

      <div class="about-text-wrapper">
        <p class="about-large-text">
          ${wordsHtml}
        </p>
      </div>

      <div class="about-badges-grid">
        <div class="about-pill">
          <span class="about-pill-dot"></span>
          <span>Association Loi 1901</span>
        </div>
        <div class="about-pill">
          <span class="about-pill-dot"></span>
          <span>5 Fondateurs Bénévoles</span>
        </div>
        <div class="about-pill">
          <span class="about-pill-dot"></span>
          <span>0 Privilège, 100% Inclusif</span>
        </div>
        <div class="about-pill">
          <span class="about-pill-dot"></span>
          <span>Indépendant & Non-Lucratif</span>
        </div>
      </div>
    </div>
  `;

  return section;
}

export function initAboutScrollAnimation() {
  const aboutSection = document.getElementById('about');
  if (!aboutSection) return;

  const words = aboutSection.querySelectorAll('.about-large-text .word');

  const onScroll = () => {
    const rect = aboutSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate progression through the section
    const start = windowHeight * 0.8;
    const end = -rect.height * 0.2;
    const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));

    const activeCount = Math.floor(progress * words.length);

    words.forEach((word, index) => {
      if (index <= activeCount) {
        word.classList.add('is-active');
      } else {
        word.classList.remove('is-active');
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
