/**
 * Consentement aux cookies de mesure d'audience.
 * Actif uniquement si un identifiant Google Analytics est configuré.
 * Le choix est conservé 6 mois (recommandation CNIL : 13 mois max).
 */
const KEY = 'cookie-consent';
const MAX_AGE = 1000 * 60 * 60 * 24 * 182;

type Choice = 'accept' | 'refuse';

function read(): Choice | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const { choice, at } = JSON.parse(raw);
    if (Date.now() - at > MAX_AGE) return null;
    return choice;
  } catch { return null; }
}
function write(choice: Choice) {
  try { localStorage.setItem(KEY, JSON.stringify({ choice, at: Date.now() })); } catch { /* stockage indisponible */ }
}

function loadAnalytics(id: string) {
  if (document.getElementById('ga-script')) return;
  const s = document.createElement('script');
  s.id = 'ga-script';
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
  const w = window as unknown as { dataLayer: unknown[]; gtag: (...a: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() { w.dataLayer.push(arguments); };
  w.gtag('js', new Date());
  w.gtag('config', id, { anonymize_ip: true });
}

export function initConsent() {
  const banner = document.querySelector<HTMLElement>('[data-cookie-banner]');
  if (!banner) return;
  const id = banner.dataset.gaId ?? '';
  const choice = read();
  if (choice === 'accept') loadAnalytics(id);
  if (!choice) banner.hidden = false;

  banner.querySelectorAll<HTMLButtonElement>('[data-cookie-choice]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const c = btn.dataset.cookieChoice as Choice;
      write(c);
      banner.hidden = true;
      if (c === 'accept') loadAnalytics(id);
      else if (document.getElementById('ga-script')) location.reload(); // retrait du consentement
    }),
  );
  document.querySelectorAll('[data-cookie-open]').forEach((b) => b.addEventListener('click', () => { banner.hidden = false; }));
}
