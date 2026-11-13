/* Atelier Solène : créneaux de réservation (simulés), onglets des tarifs, horaires du jour. Rien n'est envoyé. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const now = new Date();
  const OPEN = { 2: [540, 1140], 3: [540, 1140], 4: [540, 1140], 5: [540, 1140], 6: [540, 1080] }; // mardi à samedi, en minutes
  const hm = (m) => String(Math.floor(m / 60)).padStart(2, '0') + 'h' + String(m % 60).padStart(2, '0');
  const hash = (s) => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return (h >>> 0) / 4294967295; };
  const key = (d) => d.toISOString().slice(0, 10);
  const taken = (d, m, pro) => hash(key(d) + m + pro) < 0.3; // créneaux « déjà pris » simulés
  const FR = (d) => d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

  $$('#hours tr').forEach((tr) => { if (tr.dataset.days.split(',').includes(String(now.getDay()))) tr.classList.add('today'); });

  // Prochain créneau libre (accueil)
  const ns = $('#next-slot');
  if (ns) {
    outer: for (let i = 0; i < 10; i++) {
      const d = new Date(now); d.setDate(now.getDate() + i);
      const o = OPEN[d.getDay()]; if (!o) continue;
      for (let m = o[0]; m <= o[1] - 60; m += 30) {
        if (i === 0 && m <= now.getHours() * 60 + now.getMinutes() + 30) continue;
        if (taken(d, m, 'any')) continue;
        ns.textContent = 'Prochain créneau : ' + (i === 0 ? 'aujourd’hui' : i === 1 ? 'demain' : d.toLocaleDateString('fr-FR', { weekday: 'long' })) + ' à ' + hm(m);
        $('#next-sub').textContent = 'Exemple simulé · réservation en ligne';
        break outer;
      }
    }
  }

  // Onglets des prestations (+ ouverture directe par ancre)
  const tabs = $$('[role="tab"]');
  if (tabs.length) {
    const select = (t, focus) => {
      tabs.forEach((x) => { const on = x === t; x.setAttribute('aria-selected', String(on)); x.tabIndex = on ? 0 : -1; $('#' + x.getAttribute('aria-controls')).hidden = !on; });
      if (focus) t.focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', (e) => { const k = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (k) { e.preventDefault(); select(tabs[(i + k + tabs.length) % tabs.length], true); } });
    });
    const h = location.hash.replace('#', '');
    const t = h && $('#t-' + h); if (t) select(t);
  }

  // Réservation
  const form = $('#bk'); if (!form) return;
  const daysEl = $('#days'), slotsEl = $('#slots'), note = $('#slot-note');
  const st = { svc: null, pro: 'any', day: null, slot: null };
  const unlock = (id, on) => $('#' + id).classList.toggle('locked', !on);

  const days = [];
  for (let i = 0; days.length < 14; i++) { const d = new Date(now); d.setDate(now.getDate() + i); if (OPEN[d.getDay()]) days.push(d); }
  daysEl.innerHTML = days.map((d, i) => `<label class="day"><input type="radio" name="day" value="${i}"><span>${d.toLocaleDateString('fr-FR', { weekday: 'short' }).replace('.', '')}<b>${d.getDate()}</b>${d.toLocaleDateString('fr-FR', { month: 'short' }).replace('.', '')}</span></label>`).join('');

  function renderSlots() {
    slotsEl.innerHTML = '';
    if (st.day == null || !st.svc) { note.textContent = 'Choisissez d’abord une prestation et un jour.'; return; }
    const d = days[st.day], o = OPEN[d.getDay()], dur = +st.svc.d;
    const isToday = key(d) === key(now), nowM = now.getHours() * 60 + now.getMinutes();
    let html = '', free = 0;
    for (let m = o[0]; m + dur <= o[1]; m += 30) {
      const off = (isToday && m < nowM + 30) || taken(d, m, st.pro);
      if (!off) free++;
      html += `<label class="slot"><input type="radio" name="slot" value="${m}" ${off ? 'disabled' : ''}><span>${hm(m)}</span></label>`;
    }
    slotsEl.innerHTML = html;
    note.textContent = free ? free + ' créneau' + (free > 1 ? 'x' : '') + ' disponible' + (free > 1 ? 's' : '') + ' (simulation). Durée : ' + dur + ' min.' : 'Plus de créneau ce jour-là : essayez un autre jour.';
  }

  function recap() {
    $('#r-svc').textContent = st.svc ? st.svc.n : '—';
    $('#r-pro').textContent = st.pro === 'any' ? 'Peu importe' : st.pro;
    $('#r-when').textContent = st.day != null && st.slot != null ? FR(days[st.day]) + ' à ' + hm(+st.slot) : '—';
    $('#r-tot').textContent = st.svc ? st.svc.p + ' €' : '0 €';
    unlock('s2', !!st.svc); unlock('s3', !!st.svc); unlock('s4', st.slot != null);
    $('#r-btn').disabled = !(st.svc && st.slot != null);
    $('#r-status').hidden = true;
  }

  form.addEventListener('change', (e) => {
    const t = e.target;
    if (t.name === 'svc') { st.svc = { n: t.dataset.n, p: t.dataset.p, d: t.dataset.d }; st.slot = null; renderSlots(); }
    if (t.name === 'pro') { st.pro = t.value; st.slot = null; renderSlots(); }
    if (t.name === 'day') { st.day = +t.value; st.slot = null; renderSlots(); }
    if (t.name === 'slot') st.slot = t.value;
    recap();
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const s = $('#r-status'); s.hidden = false;
    s.textContent = 'Site de démonstration : aucune réservation n’est enregistrée. Sur le site final, votre demande (' + st.svc.n + ', ' + FR(days[st.day]) + ' à ' + hm(+st.slot) + ') serait envoyée au salon.';
  });
  recap();
})();
