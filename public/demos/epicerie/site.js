/* Comptoir Mirabelle : statut d'ouverture, accueil (saison, rayons), catalogue filtrable avec pagination. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  const day = now.getDay();
  const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const fmt = (n) => n.toFixed(2).replace('.', ',');

  // ---- Statut d'ouverture, horaires du jour, date minimale
  const st = $('#status');
  if (st) {
    const [a, b] = day === 0 ? [540, 780] : [480, 1200];
    const open = mins >= a && mins < b;
    st.classList.toggle('off', !open);
    $('#status-txt').textContent = open ? 'Ouvert · jusqu’à ' + (day === 0 ? '13h' : '20h') : 'Fermé pour le moment';
  }
  $$('#hours tr').forEach((tr) => { if (tr.dataset.days.split(',').includes(String(day))) tr.classList.add('today'); });
  const rd = $('#retrait'); if (rd) rd.min = now.toISOString().slice(0, 10);
  document.addEventListener('keydown', (e) => {
    const q = $('#q');
    if (q && e.key === '/' && !/input|textarea|select/i.test(document.activeElement.tagName)) { e.preventDefault(); q.focus(); }
  });

  // ---- Données (exemples)
  const LABEL = { fl: 'Fruits & légumes', cr: 'Crémerie', ep: 'Épicerie', vr: 'Vrac', cv: 'Cave' };
  const P = [
    ['Tomates anciennes', 'fl', 4.9, '/ kg', ['Local'], [5, 6, 7, 8, 9]],
    ['Carottes', 'fl', 2.6, '/ kg', ['Bio'], [4, 5, 6, 7, 8, 9, 10]],
    ['Pommes', 'fl', 3.2, '/ kg', ['Local'], [8, 9, 10, 11, 0, 1]],
    ['Poires', 'fl', 3.9, '/ kg', ['Local'], [8, 9, 10, 11]],
    ['Courgettes', 'fl', 3.4, '/ kg', ['Local'], [5, 6, 7, 8]],
    ['Potimarron', 'fl', 2.9, '/ kg', [], [8, 9, 10, 11]],
    ['Poireaux', 'fl', 3.1, '/ kg', ['Local'], [9, 10, 11, 0, 1, 2]],
    ['Champignons de Paris', 'fl', 6.9, '/ kg', [], [8, 9, 10]],
    ['Fraises', 'fl', 8.5, '/ kg', ['Local'], [4, 5, 6]],
    ['Clémentines', 'fl', 3.8, '/ kg', [], [10, 11, 0]],
    ['Salades', 'fl', 1.4, '/ pièce', ['Local'], [3, 4, 5, 6, 7, 8, 9]],
    ['Herbes aromatiques', 'fl', 1.8, '/ botte', [], []],
    ['Comté 18 mois', 'cr', 24, '/ kg', [], []],
    ['Chèvre frais', 'cr', 2.6, '/ pièce', ['Local'], []],
    ['Beurre de baratte', 'cr', 3.4, '/ 250 g', [], []],
    ['Œufs fermiers', 'cr', 3.6, '/ 6', ['Local'], []],
    ['Yaourts lait entier', 'cr', 1.2, '/ pot', [], []],
    ['Bleu d’Auvergne', 'cr', 21, '/ kg', [], []],
    ['Huile d’olive', 'ep', 9.8, '/ 50 cl', [], []],
    ['Pâtes artisanales', 'ep', 3.9, '/ 500 g', [], []],
    ['Confiture de mirabelles', 'ep', 4.5, '/ pot', ['Local'], []],
    ['Miel de fleurs', 'ep', 7.2, '/ 250 g', ['Local'], []],
    ['Sardines à l’huile', 'ep', 4.8, '/ boîte', [], []],
    ['Chocolat noir 70 %', 'ep', 4.2, '/ tablette', ['Bio'], []],
    ['Lentilles vertes', 'vr', 4.6, '/ kg', ['Vrac', 'Bio'], []],
    ['Riz long complet', 'vr', 3.8, '/ kg', ['Vrac'], []],
    ['Fruits secs mélangés', 'vr', 12, '/ kg', ['Vrac'], []],
    ['Cumin moulu', 'vr', 2.4, '/ 100 g', ['Vrac'], []],
    ['Thé vert', 'vr', 3.5, '/ 100 g', ['Vrac', 'Bio'], []],
    ['Lessive liquide', 'vr', 4, '/ litre', ['Vrac'], []],
    ['Vin rouge de vigneron', 'cv', 9, '/ bouteille', [], []],
    ['Vin blanc sec', 'cv', 8.5, '/ bouteille', [], []],
    ['Bière blonde locale', 'cv', 3.5, '/ 33 cl', ['Local'], []],
    ['Jus de pomme', 'cv', 3.8, '/ 75 cl', ['Local'], []],
    ['Cidre brut', 'cv', 4.2, '/ 75 cl', ['Local'], []],
  ].map(([n, c, p, u, t, m]) => ({ n, c, p, u, t, m, s: m.includes(now.getMonth()) }));

  // ---- Accueil : produits de saison et compteurs de rayons
  const strip = $('#strip');
  if (strip) {
    const mois = now.toLocaleDateString('fr-FR', { month: 'long' });
    $('#mois').textContent = 'en ' + mois;
    strip.innerHTML = P.filter((p) => p.s).map((p) => `<a class="sp c-${p.c}" href="catalogue.html?q=${encodeURIComponent(p.n)}"><b>${p.n}</b><span>${fmt(p.p)} € ${p.u}</span></a>`).join('');
    Object.keys(LABEL).forEach((k) => { const el = $('#n-' + k); if (el) el.textContent = P.filter((p) => p.c === k).length + ' produits'; });
  }

  // ---- Catalogue
  const grid = $('#grid');
  if (!grid) return;
  const PAGE = 12;
  const params = new URLSearchParams(location.search);
  const state = { shelf: LABEL[params.get('rayon')] ? params.get('rayon') : 'all', q: norm((params.get('q') || '').trim()), saison: params.get('saison') === '1', local: false, bio: false, shown: PAGE };
  const input = $('#q'); if (input) input.value = params.get('q') || '';
  const SHELVES = [['all', 'Tout'], ['fl', 'Fruits & légumes'], ['cr', 'Crémerie'], ['ep', 'Épicerie'], ['vr', 'Vrac'], ['cv', 'Cave']];

  const match = (p, ignoreShelf) => {
    if (!ignoreShelf && state.shelf !== 'all' && p.c !== state.shelf) return false;
    if (state.saison && !p.s) return false;
    if (state.local && !p.t.includes('Local')) return false;
    if (state.bio && !p.t.includes('Bio')) return false;
    if (state.q) {
      const hay = norm([p.n, LABEL[p.c], p.t.join(' ')].join(' '));
      return state.q.split(/\s+/).every((w) => hay.includes(w));
    }
    return true;
  };

  const tabs = $('#tabs');
  tabs.innerHTML = SHELVES.map(([id, l]) => `<button role="tab" type="button" data-shelf="${id}" aria-selected="false"><span>${l}</span><span class="n">0</span></button>`).join('');
  $$('.toggles button').forEach((b) => b.setAttribute('aria-pressed', String(!!state[b.dataset.f])));

  function render() {
    const list = P.filter((p) => match(p)).sort((a, b) => Number(b.s) - Number(a.s));
    $$('button', tabs).forEach((b) => {
      const id = b.dataset.shelf;
      b.setAttribute('aria-selected', String(id === state.shelf));
      $('.n', b).textContent = P.filter((p) => match(p, true) && (id === 'all' || p.c === id)).length;
    });
    const shown = list.slice(0, state.shown);
    $('#count').textContent = list.length + ' produit' + (list.length > 1 ? 's' : '') + (state.q && input ? ' pour « ' + input.value.trim() + ' »' : '') + ' · ' + P.filter((p) => p.s).length + ' de saison ce mois-ci';
    grid.innerHTML = shown.length ? shown.map((p, i) => `
      <article class="tagcard c-${p.c}" style="animation-delay:${Math.min(i, 14) * 25}ms">
        <div class="band"><span>${LABEL[p.c]}</span>${p.s ? '<span class="ps">De saison</span>' : ''}</div>
        <div class="body"><h2 class="name">${p.n}</h2>
          <div class="badges">${p.t.map((t) => `<span class="badge">${t}</span>`).join('')}</div>
          <p class="price">${fmt(p.p)} €<small>${p.u}</small></p></div>
      </article>`).join('') : `<div class="empty"><h2>Rien ne correspond.</h2><p>Essayez un autre mot, ou retirez un filtre.</p></div>`;
    const more = $('#more');
    more.hidden = list.length <= state.shown;
    more.textContent = 'Afficher plus de produits (' + (list.length - state.shown) + ')';
  }
  const reset = () => { state.shown = PAGE; render(); };

  tabs.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { state.shelf = b.dataset.shelf; reset(); } });
  tabs.addEventListener('keydown', (e) => {
    const bs = $$('button', tabs), i = bs.indexOf(document.activeElement);
    const k = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (k && i > -1) { e.preventDefault(); bs[(i + k + bs.length) % bs.length].focus(); }
  });
  $$('.toggles button').forEach((b) => b.addEventListener('click', () => {
    state[b.dataset.f] = !state[b.dataset.f];
    b.setAttribute('aria-pressed', String(state[b.dataset.f]));
    reset();
  }));
  input.addEventListener('input', (e) => { state.q = norm(e.target.value.trim()); reset(); });
  $('#more').addEventListener('click', () => { state.shown += PAGE; render(); });
  render();
})();
