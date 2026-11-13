/* La Table d'Aurèle : onglets de la carte, repères de chapitres. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const tabs = $$('[role="tab"]');
  const select = (tab, focus) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      $('#' + t.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tab.focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', (e) => {
      const k = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (k) { e.preventDefault(); select(tabs[(i + k + tabs.length) % tabs.length], true); }
    });
  });

  const links = $$('.chapters a');
  const targets = links.map((a) => $(a.getAttribute('href')));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) links.forEach((a, i) => a.setAttribute('aria-current', String(targets[i] === e.target)));
      });
    }, { rootMargin: '-40% 0px -50% 0px' });
    targets.forEach((t) => t && io.observe(t));
  }

  const d = $('#date');
  if (d) d.min = new Date().toISOString().slice(0, 10);
})();
