/* Clairéo Services : estimateur de budget (fictif), préselection du type de locaux, horaires du jour. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  document.querySelectorAll('#hours tr').forEach((tr) => { if (tr.dataset.days.split(',').includes(String(new Date().getDay()))) tr.classList.add('today'); });

  const RATE = 29;                    // € / heure (exemple)
  const YIELD = [60, 50, 70, 35];     // m² nettoyés par heure selon le type de locaux
  const eur = (n) => (Math.round(n / 10) * 10).toLocaleString('fr-FR') + ' €';

  ['h', 'd'].forEach((p) => {
    const t = $('#' + p + 't'), f = $('#' + p + 'f'), s = $('#' + p + 's'), out = $('#' + p + 'out');
    if (!t) return;
    const calc = () => {
      const type = +t.value, surf = +s.value;
      $('#' + p + 'sv').textContent = surf;
      if (type === 3) { // fin de chantier : intervention unique
        const h = Math.max(4, surf / YIELD[3]);
        out.textContent = eur(h * RATE * 0.92) + ' – ' + eur(h * RATE * 1.12) + ' (unique)';
        return;
      }
      const passes = +f.value * 4.33;
      const hours = Math.max(1, surf / YIELD[type]) * passes;
      out.textContent = eur(hours * RATE * 0.92) + ' – ' + eur(hours * RATE * 1.12);
    };
    [t, f, s].forEach((e) => e.addEventListener('input', calc));
    if (p === 'd') {
      const q = new URLSearchParams(location.search).get('type');
      if (q !== null && t.querySelector(`option[value="${q}"]`)) t.value = q;
    }
    calc();
  });
})();
