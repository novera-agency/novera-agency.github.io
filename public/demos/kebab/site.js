/* Anatolia Kebab : carte, options, panier conservé d'une page à l'autre (sessionStorage). Rien n'est envoyé. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const fmt = (n) => n.toFixed(2).replace('.', ',') + ' €';

  const MEATS = [{ n: 'Poulet', d: 0 }, { n: 'Veau', d: 0.5 }, { n: 'Mixte', d: 0.5 }, { n: 'Falafel', d: -0.5 }];
  const SAUCES = ['Blanche', 'Harissa', 'Algérienne', 'Barbecue', 'Ketchup'];
  const MENUS = [
    { id: 'sandwichs', cat: 'Sandwichs', note: 'Choisissez la viande et les sauces.', items: [
      { n: 'Kebab', p: 8.5, d: 'Galette, viande de la broche, salade, tomate, oignon', o: 's', hot: 'Populaire' },
      { n: 'Dürüm', p: 8.9, d: 'Galette fine roulée, viande, crudités', o: 's' },
      { n: 'Pain turc', p: 8.5, d: 'Pain turc grillé, viande, crudités', o: 's' },
      { n: 'Falafel', p: 7.9, d: 'Végétarien. Falafels, houmous, crudités', o: 'v' } ] },
    { id: 'assiettes', cat: 'Assiettes', note: 'Avec frites maison, salade et pain.', items: [
      { n: 'Assiette kebab', p: 12.5, d: 'Viande de la broche, frites, salade, pain', o: 'a' },
      { n: 'Assiette poulet', p: 12.5, d: 'Poulet grillé, frites, salade, pain', o: 'a' },
      { n: 'Assiette falafel', p: 11.5, d: 'Végétarien. Falafels, houmous, salade', o: 'v2' } ] },
    { id: 'menus', cat: 'Menus', items: [
      { n: 'Menu enfant', p: 6.9, d: 'Petit kebab, frites, boisson' },
      { n: 'Menu duo', p: 18.9, d: 'Deux sandwichs, frites à partager, deux boissons', hot: 'À deux' } ] },
    { id: 'frites', cat: 'Frites & desserts', items: [
      { n: 'Frites maison', p: 3, d: 'Portion généreuse' },
      { n: 'Salade', p: 4, d: 'Crudités, olives, sauce au choix' },
      { n: 'Baklava', p: 3.5, d: 'Pistache et miel' } ] },
    { id: 'boissons', cat: 'Boissons', items: [
      { n: 'Canette 33 cl', p: 2, d: 'Soda, thé glacé' },
      { n: 'Ayran', p: 2.2, d: 'Boisson au yaourt' },
      { n: 'Eau 50 cl', p: 1.5, d: 'Plate ou gazeuse' } ] },
  ];

  // ---- Panier (conservé pendant la visite)
  const KEY = 'anatolia-cart';
  let cart = [];
  try { cart = JSON.parse(sessionStorage.getItem(KEY) || '[]'); } catch (e) { cart = []; }
  const save = () => { try { sessionStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) { /* stockage indisponible */ } };
  const totalOf = () => cart.reduce((s, l) => s + l.price * l.qty, 0);
  const countOf = () => cart.reduce((s, l) => s + l.qty, 0);
  function badges() {
    $$('[data-count]').forEach((el) => { el.textContent = countOf(); });
    $$('[data-total]').forEach((el) => { el.textContent = fmt(totalOf()); });
  }
  let toastTimer;
  function toast(name) {
    const t = $('#toast'); if (!t) return;
    t.innerHTML = name + ' ajouté · <a href="panier.html">Voir le panier</a>';
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
  }
  function addLine(line) {
    const same = cart.find((l) => l.key === line.key);
    if (same) same.qty += line.qty; else cart.push(line);
    save(); badges(); toast(line.name);
    const b = $('#cart-open'); if (b) { b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); }
  }

  // ---- Cartes de produits
  const card = (it, mi, ii) => `
    <article class="box item">
      <h3>${it.n}${it.hot ? `<span class="tag">${it.hot}</span>` : ''}</h3>
      <p class="d">${it.d}</p><p class="pr">${fmt(it.p)}</p>
      <button class="add" type="button" data-m="${mi}" data-i="${ii}" aria-label="Ajouter ${it.n}">+</button>
    </article>`;

  const popular = $('#popular');
  if (popular) popular.innerHTML = [[0, 0], [0, 1], [1, 0]].map(([m, i]) => card(MENUS[m].items[i], m, i)).join('');

  const tabs = $('#tabs'), panels = $('#panels');
  if (tabs && panels) {
    tabs.innerHTML = MENUS.map((m, i) => `<button role="tab" id="t-${m.id}" aria-controls="p-${m.id}" aria-selected="false" tabindex="-1" data-i="${i}">${m.cat}</button>`).join('');
    panels.innerHTML = MENUS.map((m, mi) => `
      <section class="panel" role="tabpanel" id="p-${m.id}" aria-labelledby="t-${m.id}" hidden>
        ${m.note ? `<p>${m.note}</p>` : ''}
        <div class="items">${m.items.map((it, ii) => card(it, mi, ii)).join('')}</div>
      </section>`).join('');
    const select = (i, focus) => {
      $$('button', tabs).forEach((b, k) => { b.setAttribute('aria-selected', String(k === i)); b.tabIndex = k === i ? 0 : -1; });
      $$('.panel', panels).forEach((p, k) => { p.hidden = k !== i; });
      history.replaceState(null, '', '#' + MENUS[i].id);
      if (focus) $$('button', tabs)[i].focus();
    };
    tabs.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) select(+b.dataset.i); });
    tabs.addEventListener('keydown', (e) => {
      const k = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      const cur = $$('button', tabs).findIndex((b) => b === document.activeElement);
      if (k && cur > -1) { e.preventDefault(); select((cur + k + MENUS.length) % MENUS.length, true); }
    });
    const start = MENUS.findIndex((m) => '#' + m.id === location.hash);
    select(start > -1 ? start : 0);
  }

  // ---- Fenêtre d'options
  const dlg = $('#opt');
  if (dlg) {
    const form = $('#opt-form');
    let cur = null, qty = 1;
    $('#meats').innerHTML = MEATS.map((m, i) => `<label class="chip"><input type="radio" name="meat" value="${m.n}" data-d="${m.d}" ${i === 0 ? 'checked' : ''}><span>${m.n}</span></label>`).join('');
    $('#sauces').innerHTML = SAUCES.map((s, i) => `<label class="chip"><input type="checkbox" name="sauce" value="${s}" ${i === 0 ? 'checked' : ''}><span>${s}</span></label>`).join('');
    const optPrice = () => {
      let p = cur.p;
      if (cur.o === 's' || cur.o === 'a') p += +$('input[name="meat"]:checked', form).dataset.d;
      if ((cur.o === 's' || cur.o === 'v') && $('#menu-opt').checked) p += 3;
      return p;
    };
    const refresh = () => { $('#q').textContent = qty; $('#opt-add').textContent = 'Ajouter · ' + fmt(optPrice() * qty); };
    const open = (it) => {
      cur = it; qty = 1;
      $('#opt-title').textContent = it.n;
      $('#f-meat').hidden = !(it.o === 's' || it.o === 'a');
      $('#f-menu').hidden = !(it.o === 's' || it.o === 'v');
      $$('input[name="meat"]', form).forEach((r, i) => { r.checked = i === 0; });
      $$('input[name="sauce"]', form).forEach((c, i) => { c.checked = i === 0; });
      $('#menu-opt').checked = false;
      refresh();
      dlg.showModal();
    };
    form.addEventListener('change', (e) => {
      if (e.target.name === 'sauce' && $$('input[name="sauce"]:checked', form).length > 2) e.target.checked = false;
      refresh();
    });
    $('#q-minus').addEventListener('click', () => { qty = Math.max(1, qty - 1); refresh(); });
    $('#q-plus').addEventListener('click', () => { qty = Math.min(20, qty + 1); refresh(); });
    dlg.addEventListener('close', () => {
      if (dlg.returnValue !== 'add' || !cur) return;
      const meat = !$('#f-meat').hidden ? $('input[name="meat"]:checked', form).value : '';
      const sauces = $$('input[name="sauce"]:checked', form).map((c) => c.value);
      const menu = !$('#f-menu').hidden && $('#menu-opt').checked;
      const detail = [meat, sauces.length ? 'sauce ' + sauces.join(' + ').toLowerCase() : '', menu ? 'menu frites + boisson' : ''].filter(Boolean).join(' · ');
      addLine({ key: [cur.n, detail].join('|'), name: cur.n, detail, price: optPrice(), qty });
      dlg.returnValue = '';
    });
    document.addEventListener('click', (e) => {
      const b = e.target.closest('.add'); if (!b) return;
      const it = MENUS[+b.dataset.m].items[+b.dataset.i];
      if (it.o) open(it); else addLine({ key: it.n, name: it.n, detail: '', price: it.p, qty: 1 });
    });
  }

  // ---- Page panier
  const lines = $('#lines');
  if (lines) {
    const submit = $('#submit');
    const render = () => {
      lines.innerHTML = cart.map((l, i) => `
        <li class="line"><b>${l.name}</b><span class="lp">${fmt(l.price * l.qty)}</span>
          ${l.detail ? `<small>${l.detail}</small>` : ''}
          <div class="step"><button type="button" data-q="-1" data-k="${i}" aria-label="Retirer un ${l.name}">−</button><span>${l.qty}</span><button type="button" data-q="1" data-k="${i}" aria-label="Ajouter un ${l.name}">+</button></div>
        </li>`).join('');
      $('#empty').hidden = cart.length > 0;
      $('#total').textContent = fmt(totalOf());
      submit.disabled = cart.length === 0;
      badges();
    };
    lines.addEventListener('click', (e) => {
      const b = e.target.closest('[data-q]'); if (!b) return;
      const l = cart[+b.dataset.k]; l.qty += +b.dataset.q;
      if (l.qty <= 0) cart.splice(+b.dataset.k, 1);
      save(); render();
    });
    $('#co').addEventListener('submit', (e) => {
      e.preventDefault();
      const f = e.target;
      if (!f.checkValidity()) { f.reportValidity(); return; }
      const st = $('#co-status');
      st.hidden = false;
      st.textContent = 'Site de démonstration : aucune commande n’est envoyée. Sur le site final, votre commande (' + countOf() + ' article' + (countOf() > 1 ? 's' : '') + ', ' + fmt(totalOf()) + ') serait transmise au snack pour ' + f.heure.value + '.';
    });
    render();
  }

  // ---- Statut d'ouverture
  const m = new Date().getHours() * 60 + new Date().getMinutes();
  const isOpen = (m >= 660 && m < 900) || (m >= 1080 && m < 1380);
  $('#status').classList.toggle('off', !isOpen);
  $('#status-txt').textContent = isOpen ? 'Ouvert · jusqu’à ' + (m < 900 ? '15h' : '23h') : 'Fermé · réouverture ' + (m < 660 ? '11h' : m < 1080 ? '18h' : '11h');
  badges();
})();
