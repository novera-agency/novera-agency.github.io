/* Comportements communs : menu mobile, lien actif, apparition au défilement, formulaires de démonstration. */
(() => {
  const root = document.documentElement;
  root.classList.add('js');
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const header = $('.site-header');
  const toggle = $('.nav-toggle');
  if (header && toggle) {
    const set = (open) => {
      header.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    };
    toggle.addEventListener('click', () => set(!header.classList.contains('nav-open')));
    $$('.nav a', header).forEach((a) => a.addEventListener('click', () => set(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && header.classList.contains('nav-open')) { set(false); toggle.focus(); }
    });
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  const file = location.pathname.split('/').pop() || 'index.html';
  $$('.nav a').forEach((a) => {
    if (a.getAttribute('href') === file) a.setAttribute('aria-current', 'page');
  });

  const items = $$('.reveal');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('in'));
  }

  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  // Formulaires de démonstration : rien n'est envoyé, et la page le dit clairement.
  $$('form[data-demo]').forEach((form) => {
    const status = $('[data-status]', form);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (status) {
        status.hidden = false;
        status.textContent = 'Site de démonstration : ce formulaire n’envoie aucun message. Sur le site final, votre demande serait transmise directement à l’établissement.';
      }
    });
  });
})();
