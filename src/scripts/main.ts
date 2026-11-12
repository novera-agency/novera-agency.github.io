import { initContactForms } from './form';
import { initConsent } from './consent';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Apparition au défilement ---------- */
function initReveal() {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-split]');
  if (!('IntersectionObserver' in window) || reduceMotion) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  els.forEach((el) => io.observe(el));
}

/* ---------- En-tête : état au défilement ---------- */
function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 20);
    const menuOpen = document.body.classList.contains('menu-open');
    header.classList.toggle('is-hidden', !menuOpen && y > 400 && y > lastY + 4);
    if (y < lastY - 4 || y < 400) header.classList.remove('is-hidden');
    lastY = y;
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  // Révèle l'en-tête lorsqu'un élément y reçoit le focus clavier
  header.addEventListener('focusin', () => header.classList.remove('is-hidden'));
}

/* ---------- Menu mobile ---------- */
function initMobileMenu() {
  const burger = document.querySelector<HTMLButtonElement>('[data-burger]');
  const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');
  if (!burger || !menu) return;
  const setOpen = (open: boolean) => {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    document.body.classList.toggle('menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      menu.hidden = false;
      requestAnimationFrame(() => menu.classList.add('is-open'));
    } else {
      menu.classList.remove('is-open');
      window.setTimeout(() => { if (!menu.classList.contains('is-open')) menu.hidden = true; }, 350);
    }
  };
  burger.addEventListener('click', () => setOpen(burger.getAttribute('aria-expanded') !== 'true'));
  menu.querySelectorAll('[data-menu-link]').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      burger.focus();
    }
  });
  window.matchMedia('(min-width: 921px)').addEventListener('change', (e) => e.matches && setOpen(false));
}

/* ---------- Lien de navigation actif ---------- */
function initActiveNav() {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')];
  const path = location.pathname;
  const pageLink = links.find((a) => !a.hash && a.pathname === path);
  if (pageLink) { pageLink.classList.add('is-active'); pageLink.setAttribute('aria-current', 'page'); return; }
  if (path !== '/') return;
  const sections = links
    .filter((a) => a.hash && a.pathname === '/')
    .map((a) => ({ a, el: document.querySelector<HTMLElement>(a.hash) }))
    .filter((x): x is { a: HTMLAnchorElement; el: HTMLElement } => Boolean(x.el));
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const match = sections.find((s) => s.el === e.target);
        if (match) match.a.classList.toggle('is-active', e.isIntersecting);
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  sections.forEach((s) => io.observe(s.el));
}

/* ---------- Vitrine de l'accueil (diaporama des démos) ---------- */
function initShowcase() {
  const root = document.querySelector<HTMLElement>('[data-showcase]');
  if (!root) return;
  const laptopSlides = root.querySelectorAll<HTMLElement>('.stage__laptop [data-slide]');
  const phoneSlides = root.querySelectorAll<HTMLElement>('.stage__phone [data-slide]');
  const buttons = root.querySelectorAll<HTMLButtonElement>('[data-slide-btn]');
  const url = root.querySelector<HTMLElement>('[data-url]');
  let current = 0;
  let timer: number | undefined;
  const show = (i: number) => {
    current = (i + laptopSlides.length) % laptopSlides.length;
    [laptopSlides, phoneSlides].forEach((list) => list.forEach((s, k) => s.classList.toggle('is-active', k === current)));
    buttons.forEach((b, k) => {
      b.classList.toggle('is-active', k === current);
      b.setAttribute('aria-pressed', String(k === current));
    });
    if (url) url.textContent = laptopSlides[current].dataset.domain ?? '';
  };
  const start = () => {
    if (reduceMotion) return;
    window.clearInterval(timer);
    timer = window.setInterval(() => show(current + 1), 4500);
  };
  buttons.forEach((b) => b.addEventListener('click', () => { show(Number(b.dataset.slideBtn)); start(); }));
  // Pause lorsque la vitrine n'est pas visible
  new IntersectionObserver(([e]) => (e.isIntersecting ? start() : window.clearInterval(timer))).observe(root);

  // Léger effet de parallaxe
  if (reduceMotion) return;
  const layers = root.querySelectorAll<HTMLElement>('[data-parallax]');
  let ticking = false;
  const update = () => {
    const rect = root.getBoundingClientRect();
    const offset = rect.top + rect.height / 2 - window.innerHeight / 2;
    layers.forEach((l) => { l.style.transform = `translate3d(0, ${(offset * Number(l.dataset.parallax)).toFixed(1)}px, 0)`; });
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

/* ---------- Filtres des réalisations ---------- */
function initFilters() {
  document.querySelectorAll<HTMLElement>('[data-filters]').forEach((bar) => {
    const grid = bar.parentElement?.querySelector<HTMLElement>('[data-filter-grid]');
    if (!grid) return;
    const items = grid.querySelectorAll<HTMLElement>('[data-category]');
    const btns = bar.querySelectorAll<HTMLButtonElement>('[data-filter]');
    btns.forEach((btn) =>
      btn.addEventListener('click', () => {
        const f = btn.dataset.filter;
        btns.forEach((b) => {
          b.classList.toggle('is-active', b === btn);
          b.setAttribute('aria-pressed', String(b === btn));
        });
        items.forEach((it) => {
          const show = f === 'all' || it.dataset.category === f;
          it.classList.toggle('is-hidden', !show);
          if (show) {
            it.classList.remove('is-in');
            requestAnimationFrame(() => requestAnimationFrame(() => it.classList.add('is-in')));
          }
        });
      }),
    );
  });
}

/* ---------- Progression de la frise « méthode » ---------- */
function initSteps() {
  const steps = document.querySelector<HTMLElement>('[data-steps]');
  if (!steps) return;
  const update = () => {
    const r = steps.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
    steps.style.setProperty('--p', reduceMotion ? '1' : p.toFixed(3));
  };
  window.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  update();
}

/* ---------- Pré-sélection du type de projet ---------- */
function selectProject(kind: string | null) {
  if (!kind) return;
  const value = kind.startsWith('reno') ? "Rénovation d'un site" : "Création d'un site";
  document.querySelectorAll<HTMLInputElement>('input[name="type_projet"]').forEach((r) => { r.checked = r.value === value; });
}
function initProjectPreselect() {
  selectProject(new URLSearchParams(location.search).get('projet'));
  document.querySelectorAll<HTMLElement>('[data-set-project]').forEach((el) =>
    el.addEventListener('click', () => selectProject(el.dataset.setProject ?? null)),
  );
}

initReveal();
initHeader();
initMobileMenu();
initActiveNav();
initShowcase();
initFilters();
initSteps();
initProjectPreselect();
initContactForms();
initConsent();
