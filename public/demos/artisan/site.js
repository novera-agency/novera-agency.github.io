/* Maison Duret Rénovation : filtres de chantiers, estimateur de budget (indicatif), horaires du jour. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  $$('#hours tr').forEach((tr) => { if (tr.dataset.days.split(',').includes(String(new Date().getDay()))) tr.classList.add('today'); });

  const fb = $$('.filters button');
  fb.forEach((b) => b.addEventListener('click', () => {
    fb.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    $$('#gal .it').forEach((it) => it.classList.toggle('off', b.dataset.f !== 'all' && it.dataset.cat !== b.dataset.f));
  }));

  const out = $('#e-out');
  if (out) {
    const P = [[900, 1300], [1100, 1800], [1400, 2200], [35, 70]]; // € / m² (fourchettes d'exemple)
    const fmt = (n) => (Math.round(n / 500) * 500 || 500).toLocaleString('fr-FR') + ' €';
    const fmtS = (n) => (Math.round(n / 50) * 50).toLocaleString('fr-FR') + ' €';
    const calc = () => {
      const t = +$('#e-type').value, s = Math.min(+$('#e-surf').value, [200, 30, 20, 200][+$('#e-type').value]), k = +$('input[name="lvl"]:checked').value;
      const MAX = [200, 30, 20, 200], sl = $('#e-surf');
      if (sl.max != MAX[t]) { sl.max = MAX[t]; if (+sl.value > MAX[t]) sl.value = MAX[t]; }
      const s2 = +sl.value; $('#e-surf-v').textContent = s2;
      const lo = P[t][0] * s * k, hi = P[t][1] * s * k, f = t === 3 ? fmtS : fmt;
      out.textContent = 'Entre ' + f(lo) + ' et ' + f(hi);
    };
    ['#e-type', '#e-surf', '#e-lvl'].forEach((s) => $(s).addEventListener('input', calc));
    calc();
  }
})();
