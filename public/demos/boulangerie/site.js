/* Maison Levain : date du jour, statut d'ouverture, fournées en direct, jour courant dans les horaires. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const now = new Date();
  const day = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  const dateEl = $('#dl-date');
  if (dateEl) dateEl.textContent = now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

  const hours = day === 0 ? [420, 780] : day === 1 ? null : [390, 1170];
  const openEl = $('#dl-open');
  if (openEl) {
    const isOpen = hours && mins >= hours[0] && mins < hours[1];
    openEl.textContent = !hours ? 'Fermé le lundi' : isOpen ? 'Ouvert · fermeture ' + (day === 0 ? '13h' : '19h30') : 'Fermé pour le moment';
  }

  const items = [...document.querySelectorAll('.batch')];
  const note = $('#batch-note');
  const set = (el, cls, txt) => { el.classList.remove('done', 'next', 'live'); if (cls) el.classList.add(cls); el.querySelector('.chip').textContent = txt; };
  if (items.length) {
    if (day === 1) {
      note.textContent = 'Fermé le lundi. Prochaine fournée demain à 6h30.';
      items.forEach((i) => set(i, '', 'Demain'));
    } else {
      let nextFound = false;
      items.forEach((el) => {
        const [h, m] = el.dataset.time.split(':').map(Number);
        const t = h * 60 + m;
        if (mins >= t + 120) set(el, 'done', 'Sorti');
        else if (mins >= t) set(el, 'live', 'Sorti du four');
        else if (!nextFound) { nextFound = true; set(el, 'next', 'Prochaine fournée'); }
        else set(el, '', 'À venir');
      });
      note.textContent = nextFound ? 'Statut mis à jour selon l’heure actuelle.' : 'Toutes les fournées sont sorties. Rendez-vous demain à 6h30.';
    }
  }

  document.querySelectorAll('#hours tr').forEach((tr) => { if (tr.dataset.days.split(',').includes(String(day))) tr.classList.add('today'); });
  const d = $('#date'); if (d) d.min = now.toISOString().slice(0, 10);
  const n = $('#slip-n'); if (n) n.textContent = String(1000 + Math.floor(Math.random() * 8999));
})();
