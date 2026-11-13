/* Verdance Paysage : plan interactif, saisons, navigation par sections. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const spots = [
    { t: 'Création de jardin', p: 'Plan d’ensemble, choix des végétaux selon l’exposition et le sol, mise en œuvre complète. Un jardin cohérent plutôt qu’une addition de massifs.', i: 'Idéal pour un terrain neuf ou à repenser' },
    { t: 'Terrasses & allées', p: 'Terrasses en bois, dalles ou pierre naturelle, allées stabilisées, bordures et petits murets, pensées avec la circulation de la maison.', i: 'Idéal pour prolonger la maison dehors' },
    { t: 'Plantations & massifs', p: 'Arbres, arbustes, vivaces et haies, plantés à la bonne saison et accompagnés d’un paillage pour réduire l’arrosage.', i: 'Idéal pour structurer et fleurir' },
    { t: 'Arrosage automatique', p: 'Réseau enterré, programmation par zone et capteur de pluie, pour arroser juste ce qu’il faut, même en votre absence.', i: 'Idéal pour les absences d’été' },
    { t: 'Entretien & taille', p: 'Tonte, taille des haies et des arbustes, désherbage, ramassage des feuilles : un passage régulier, selon le rythme de votre jardin.', i: 'Idéal pour garder un jardin soigné' },
  ];
  const hots = $$('.hot');
  const showSpot = (n) => {
    hots.forEach((h, k) => h.setAttribute('aria-pressed', String(k === n)));
    $('#p-n').textContent = n + 1;
    $('#p-title').textContent = spots[n].t;
    $('#p-text').textContent = spots[n].p;
    $('#p-ideal').textContent = spots[n].i;
  };
  hots.forEach((h, k) => h.addEventListener('click', () => showSpot(k)));

  const seasons = {
    printemps: { n: 'Printemps', l: 'Le moment de créer.', t: ['Plantation des vivaces et des arbustes', 'Semis et regarnissage de la pelouse', 'Création de massifs, de terrasses et d’allées'] },
    ete: { n: 'Été', l: 'Le moment de profiter.', t: ['Arrosage et réglage de l’arrosage automatique', 'Tonte régulière et taille de floraison', 'Surveillance du jardin pendant vos absences'] },
    automne: { n: 'Automne', l: 'Le moment de planter.', t: ['Plantation d’arbres et d’arbustes', 'Ramassage des feuilles et paillage', 'Préparation des sols avant l’hiver'] },
    hiver: { n: 'Hiver', l: 'Le moment de préparer.', t: ['Taille des fruitiers et élagage', 'Étude et plan des projets du printemps', 'Entretien du matériel et des clôtures'] },
  };
  const btns = $$('[data-season-btn]');
  const setSeason = (k) => {
    document.body.dataset.season = k;
    btns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.seasonBtn === k)));
    const s = seasons[k];
    $('#s-name').textContent = s.n;
    $('#s-line').textContent = s.l;
    $('#s-tasks').innerHTML = s.t.map((x) => '<li>' + x + '</li>').join('');
  };
  btns.forEach((b) => b.addEventListener('click', () => setSeason(b.dataset.seasonBtn)));
  const m = new Date().getMonth();
  setSeason(m >= 2 && m <= 4 ? 'printemps' : m >= 5 && m <= 7 ? 'ete' : m >= 8 && m <= 10 ? 'automne' : 'hiver');

  // Lien actif du rail
  const links = $$('.rail-nav a');
  const targets = links.map((a) => $(a.getAttribute('href')));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a, i) => a.setAttribute('aria-current', String(targets[i] === e.target)));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    targets.forEach((t) => t && io.observe(t));
  }
})();
