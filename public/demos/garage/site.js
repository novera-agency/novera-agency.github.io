/* Garage Central Motors : tableau de bord des voyants, statut de l'atelier, horaires du jour. Rien n'est envoyé. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const now = new Date(), day = now.getDay(), m = now.getHours() * 60 + now.getMinutes();
  const open = (day >= 1 && day <= 5 && ((m >= 480 && m < 720) || (m >= 840 && m < 1110))) || (day === 6 && m >= 480 && m < 720);
  const st = $('#state');
  if (st) { st.classList.toggle('off', !open); $('#state-txt').textContent = open ? 'Atelier ouvert' : 'Atelier fermé'; }
  document.querySelectorAll('#hours tr').forEach((tr) => { if (tr.dataset.days.split(',').includes(String(day))) tr.classList.add('today'); });
  const d = $('#date'); if (d) d.min = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');

  const D = {
    huile: { t: 'Voyant d’huile', l: 'ARRÊT IMMÉDIAT', c: 'red', p: 'Pression ou niveau d’huile insuffisant. Coupez le moteur dès que possible en sécurité et ne continuez pas à rouler. Un niveau trop bas peut détruire le moteur.', f: 'Appelez l’atelier, puis forfait Vidange ou diagnostic.' },
    frein: { t: 'Voyant de freinage', l: 'URGENT', c: 'red', p: 'Plaquettes usées, niveau de liquide bas ou défaut du circuit. Roulez très prudemment, évitez les trajets longs et faites contrôler au plus vite.', f: 'Forfait Freinage : contrôle des plaquettes, disques et liquide.' },
    batterie: { t: 'Voyant de batterie', l: 'À SURVEILLER', c: '', p: 'La batterie ne se recharge plus : alternateur, courroie ou batterie en fin de vie. Réduisez les consommateurs (clim, autoradio) et rejoignez l’atelier.', f: 'Diagnostic électrique et test de charge.' },
    moteur: { t: 'Voyant moteur', l: 'À CONTRÔLER', c: '', p: 'Défaut du système d’injection ou de dépollution. Fixe : faites contrôler sous quelques jours. Clignotant : réduisez l’allure et arrêtez-vous.', f: 'Lecture des codes défaut et diagnostic en atelier.' },
  };
  const box = $('#diag');
  if (box) document.querySelectorAll('input[name="l"]').forEach((r) => r.addEventListener('change', () => {
    const x = D[r.value];
    box.innerHTML = `<span class="lvl ${x.c}">${x.l}</span><h3>${x.t}</h3><p>${x.p}</p><p><b>Que faire :</b> ${x.f}</p><p><a class="btn" href="rendez-vous.html?presta=diag" style="margin-top:6px">Prendre rendez-vous</a></p>`;
  }));

  const sel = $('#presta');
  if (sel && new URLSearchParams(location.search).get('presta') === 'diag') sel.value = 'Voyant allumé / diagnostic';
})();
