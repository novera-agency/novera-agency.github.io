/* Anatolia Kebab : carte, options, panier. Tout reste dans la page : rien n'est envoyé. */
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

  // ---- Rendu de la carte
  $('#cats').innerHTML = MENUS.map((m) => `<li><a href="#c-${m.id}">${m.cat}</a></li>`).join('');
  $('#menu').innerHTML = MENUS.map((m, mi) => `
    <section class="cat" id="c-${m.id}" aria-labelledby="h-${m.id}">
      <h2 id="h-${m.id}">${m.cat}</h2>${m.note ? `<p>${m.note}</p>` : ''}
      <div class="items">${m.items.map((it, ii) => `
        <article class="box item">
          <h3>${it.n}${it.hot ? `<span class="tag">${it.hot}</span>` : ''}</h3>
          <p class="d">${it.d}</p><p class="pr">${fmt(it.p)}</p>
          <button class="add" type="button" data-m="${mi}" data-i="${ii}" aria-label="Ajouter ${it.n}">+</button>
        </article>`).join('')}</div>
    </section>`).join('');

  // ---- Panier
  const cart = [];
  const lines = $('#lines'), emptyEl = $('#empty'), submit = $('#submit');
  const totalOf = () => cart.reduce((s, l) => s + l.price * l.qty, 0);
  const countOf = () => cart.reduce((s, l) => s + l.qty, 0);
  function renderCart() {
    lines.innerHTML = cart.map((l, i) => `
      <li class="line"><b>${l.name}</b><span class="lp">${fmt(l.price * l.qty)}</span>
        ${l.detail ? `<small>${l.detail}</small>` : ''}
        <div class="step"><button type="button" data-q="-1" data-k="${i}" aria-label="Retirer un ${l.name}">−</button><span>${l.qty}</span><button type="button" data-q="1" data-k="${i}" aria-label="Ajouter un ${l.name}">+</button></div>
      </li>`).join('');
    emptyEl.hidden = cart.length > 0;
    const t = fmt(totalOf()), c = countOf();
    ['#total', '#total-top', '#total-m'].forEach((s) => { $(s).textContent = t; });
    ['#count', '#count-m'].forEach((s) => { $(s).textContent = c; });
    submit.disabled = cart.length === 0;
    $('#co-status').hidden = true;
  }
  function addLine(line) {
    const same = cart.find((l) => l.key === line.key);
    if (same) same.qty += line.qty; else cart.push(line);
    renderCart();
    const b = $('#cart-open'); b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump');
  }
  lines.addEventListener('click', (e) => {
    const b = e.target.closest('[data-q]'); if (!b) return;
    const l = cart[+b.dataset.k]; l.qty += +b.dataset.q;
    if (l.qty <= 0) cart.splice(+b.dataset.k, 1);
    renderCart();
  });

  // ---- Fenêtre d'options
  const dlg = $('#opt'), form = $('#opt-form');
  let cur = null, qty = 1;
  const meatsEl = $('#meats'), saucesEl = $('#sauces');
  meatsEl.innerHTML = MEATS.map((m, i) => `<label class="chip"><input type="radio" name="meat" value="${m.n}" data-d="${m.d}" ${i === 0 ? 'checked' : ''}><span>${m.n}</span></label>`).join('');
  saucesEl.innerHTML = SAUCES.map((s, i) => `<label class="chip"><input type="checkbox" name="sauce" value="${s}" ${i === 0 ? 'checked' : ''}><span>${s}</span></label>`).join('');
  const optPrice = () => {
    let p = cur.p;
    if (cur.o === 's' || cur.o === 'a') p += +$('input[name="meat"]:checked', form).dataset.d;
    if ((cur.o === 's' || cur.o === 'v') && $('#menu-opt').checked) p += 3;
    return p;
  };
  const refresh = () => { $('#q').textContent = qty; $('#opt-add').textContent = 'Ajouter · ' + fmt(optPrice() * qty); };
  function openOptions(it) {
    cur = it; qty = 1;
    $('#opt-title').textContent = it.n;
    $('#f-meat').hidden = !(it.o === 's' || it.o === 'a');
    $('#f-menu').hidden = !(it.o === 's' || it.o === 'v');
    $$('input[name="meat"]', form).forEach((r, i) => { r.checked = i === 0; });
    $$('input[name="sauce"]', form).forEach((c, i) => { c.checked = i === 0; });
    $('#menu-opt').checked = false;
    refresh();
    dlg.showModal();
  }
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

  $('#menu').addEventListener('click', (e) => {
    const b = e.target.closest('.add'); if (!b) return;
    const it = MENUS[+b.dataset.m].items[+b.dataset.i];
    if (it.o) openOptions(it); else addLine({ key: it.n, name: it.n, detail: '', price: it.p, qty: 1 });
  });

  // ---- Panier mobile
  const sheet = $('#cart'), back = $('#backdrop');
  const toggleSheet = (open) => { sheet.classList.toggle('open', open); back.classList.toggle('show', open); };
  $('#cartbar').addEventListener('click', () => toggleSheet(true));
  $('#cart-open').addEventListener('click', () => { sheet.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); $('#nom').focus({ preventScroll: true }); });
  $('#cart-close').addEventListener('click', () => toggleSheet(false));
  back.addEventListener('click', () => toggleSheet(false));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') toggleSheet(false); });

  // ---- Validation (démonstration)
  $('#co').addEventListener('submit', (e) => {
    e.preventDefault();
    const f = e.target;
    if (!f.checkValidity()) { f.reportValidity(); return; }
    const st = $('#co-status');
    st.hidden = false;
    st.textContent = 'Site de démonstration : aucune commande n’est envoyée. Sur le site final, votre commande (' + countOf() + ' article' + (countOf() > 1 ? 's' : '') + ', ' + fmt(totalOf()) + ') serait transmise au snack pour ' + f.heure.value + '.';
  });

  // ---- Catégorie active + statut d'ouverture
  const links = $$('#cats a');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) links.forEach((a) => a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + e.target.id))); });
    }, { rootMargin: '-30% 0px -60% 0px' });
    $$('.cat').forEach((c) => io.observe(c));
  }
  const m = new Date().getHours() * 60 + new Date().getMinutes();
  const open = (m >= 660 && m < 900) || (m >= 1080 && m < 1380);
  $('#status').classList.toggle('off', !open);
  $('#status-txt').textContent = open ? 'Ouvert · jusqu’à ' + (m < 900 ? '15h' : '23h') : 'Fermé · réouverture ' + (m < 660 ? '11h' : m < 1080 ? '18h' : '11h');
  renderCart();
})();
