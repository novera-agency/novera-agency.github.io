/**
 * PROJETS DE DÉMONSTRATION
 * ------------------------------------------------------------
 * Ces projets sont des maquettes conçues par l'agence pour
 * illustrer son savoir-faire. Les entreprises citées sont
 * FICTIVES et sont signalées comme telles sur le site.
 *
 * Lorsque vous aurez de vraies réalisations, ajoutez-les ici
 * avec `demo: false` (et, idéalement, l'accord écrit du client).
 */

export type Illustration = 'house' | 'car' | 'plate' | 'leaf' | 'sparkle' | 'scissors';

export interface Project {
  slug: string;
  demo: boolean;
  /** Étiquette affichée à la place de « Projet de démonstration » (ex. « Projet indépendant »). */
  badge?: string;
  category: string;
  categoryId: string;
  name: string;
  /** Domaine fictif affiché dans la barre d'adresse de la maquette. */
  domain: string;
  /** Adresse du site en ligne (facultatif) : affiche un bouton « Voir le site ». Un chemin commençant par / est un site hébergé dans /public. */
  url?: string;
  /** Captures d'écran réelles (dans /public) : remplacent la maquette générée. */
  screenshots?: { desktop: string; mobile: string; alt: string };
  summary: string;
  goals: string[];
  features: string[];
  theme: {
    bg: string;
    surface: string;
    ink: string;
    muted: string;
    accent: string;
    accentInk: string;
    photoA: string;
    photoB: string;
    serif: boolean;
    dark: boolean;
  };
  site: {
    nav: string[];
    kicker: string;
    headline: string;
    cta: string;
    cards: string[];
    illustration: Illustration;
  };
}

const all: Project[] = [
  {
    slug: 'revizstmg',
    demo: false,
    badge: 'Projet indépendant',
    category: 'Application web',
    categoryId: 'application',
    name: 'RévizSTMG',
    domain: 'revizstmg.github.io',
    url: 'https://revizstmg.github.io/',
    screenshots: {
      desktop: '/images/revizstmg-desktop.webp',
      mobile: '/images/revizstmg-mobile.webp',
      alt: 'Aperçu de RévizSTMG, application de révision du bac STMG : catalogue des cours de Terminale',
    },
    summary:
      'Application web de révision du bac STMG, de la Première à la Terminale : cours matière par matière, exercices corrigés et flashcards, avec des cours lisibles sans inscription.',
    goals: ['Proposer des cours clairs, matière par matière', 'Permettre de s’entraîner avec exercices et flashcards', 'Garder les cours accessibles sans compte'],
    features: ['17 matières et plus de 750 chapitres', 'Cours lisibles sans inscription', 'Exercices corrigés et flashcards', 'Interface adaptée au mobile'],
    theme: {
      bg: '#F4F0E8', surface: '#FFFFFF', ink: '#203E36', muted: '#5F6B66',
      accent: '#203E36', accentInk: '#FFFFFF',
      photoA: '#9DB5A8', photoB: '#203E36', serif: true, dark: false,
    },
    site: {
      nav: ['Cours', 'À propos', 'Application'],
      kicker: 'Bac STMG',
      headline: 'Comprends tes erreurs. Prépare ton contrôle.',
      cta: 'Commencer à réviser',
      cards: ['Économie', 'Droit', 'Management'],
      illustration: 'leaf',
    },
  },
  {
    slug: 'quickfix-ia',
    demo: false,
    badge: 'Projet indépendant',
    category: 'Plateforme web',
    categoryId: 'plateforme',
    name: 'QuickFix.IA',
    domain: 'quickfixia.netlify.app',
    url: 'https://quickfixia.netlify.app/',
    screenshots: {
      desktop: '/images/quickfix-desktop.webp',
      mobile: '/images/quickfix-mobile.webp',
      alt: 'Aperçu de QuickFix.IA, plateforme de mise en relation pour les urgences à domicile',
    },
    summary:
      'Plateforme de mise en relation entre particuliers et artisans pour les urgences à domicile (plomberie, serrurerie, électricité) : demande en quelques secondes, artisans à proximité, tarif annoncé à l’avance et suivi de l’intervention.',
    goals: ['Rendre une demande d’urgence simple et rapide', 'Rassurer avec des artisans vérifiés et des prix affichés', 'Séparer clairement le parcours particulier et le parcours artisan'],
    features: ['Parcours particulier et parcours artisan', 'Démonstrations interactives des deux parcours', 'Suivi de l’intervention en direct', 'Bandeau de consentement aux cookies'],
    theme: {
      bg: '#0D1B2A', surface: '#162A40', ink: '#FFFFFF', muted: '#9AA6B5',
      accent: '#FF6B35', accentInk: '#FFFFFF',
      photoA: '#FF6B35', photoB: '#0D1B2A', serif: false, dark: true,
    },
    site: {
      nav: ['Comment ça marche', 'Confiance', 'Artisans'],
      kicker: 'Urgences à domicile',
      headline: 'Une urgence à la maison ?',
      cta: 'J’ai une urgence',
      cards: ['Plomberie', 'Serrurerie', 'Électricité'],
      illustration: 'house',
    },
  },
  {
    slug: 'boucherie',
    demo: true,
    category: 'Boucherie',
    categoryId: 'boucherie',
    name: 'Boucherie Al-Baraka',
    domain: 'boucherie-al-baraka.example',
    url: '/demos/boucherie/',
    screenshots: {
      desktop: '/images/boucherie-desktop.webp',
      mobile: '/images/boucherie-mobile.webp',
      alt: 'Aperçu du site de la Boucherie Al-Baraka, boucherie halal artisanale (commerce fictif)',
    },
    summary:
      'Site vitrine pour une boucherie halal artisanale : histoire de la maison, engagements qualité, gamme de produits, horaires et accès, avec un appel direct depuis le mobile.',
    goals: ['Rassurer sur l’origine et la qualité des viandes', 'Présenter la gamme de produits', 'Faciliter la venue en boutique et l’appel'],
    features: ['Pages viande, produits et contact', 'Horaires et adresse en un coup d’œil', 'Bouton d’appel sur mobile', 'Mention de l’Aïd al-Adha et commandes sur mesure'],
    theme: {
      bg: '#F8F6F1', surface: '#FFFFFF', ink: '#16302A', muted: '#5F6B66',
      accent: '#1A4D3A', accentInk: '#FFFFFF',
      photoA: '#5E9C7F', photoB: '#1A4D3A', serif: true, dark: false,
    },
    site: {
      nav: ['Accueil', 'Notre viande', 'Nos produits', 'Contact'],
      kicker: 'Boucherie halal artisanale',
      headline: 'Viandes sélectionnées avec exigence.',
      cta: 'Découvrir nos produits',
      cards: ['Bœuf', 'Agneau', 'Volaille'],
      illustration: 'leaf',
    },
  },
  {
    slug: 'boulangerie',
    demo: true,
    category: 'Boulangerie',
    categoryId: 'boulangerie',
    name: 'Maison Levain',
    domain: 'maison-levain.example',
    url: '/demos/boulangerie/',
    screenshots: {
      desktop: '/images/boulangerie-desktop.webp',
      mobile: '/images/boulangerie-mobile.webp',
      alt: 'Aperçu du site de démonstration Maison Levain',
    },
    summary:
      'Une « gazette du fournil » : la une et les fournées du jour en accueil, puis la carte sur ardoise et le bon de précommande sur leurs propres pages. Les fournées se mettent à jour selon l’heure.',
    goals: ['Donner une identité de commerce de quartier', 'Informer sur les horaires de sortie de four', 'Faciliter la précommande'],
    features: ['Fournées du jour en temps réel', 'Carte sur ardoise avec prix', 'Bon de précommande', 'Trois pages courtes'],
    theme: {
      bg: '#FBF6EC', surface: '#FFFFFF', ink: '#2A1B12', muted: '#6F5B4B',
      accent: '#B8741A', accentInk: '#FFFFFF',
      photoA: '#EBC56B', photoB: '#4A2F1D', serif: true, dark: false,
    },
    site: {
      nav: ['Nos produits', 'Contact'],
      kicker: 'Boulangerie artisanale',
      headline: 'Le pain prend son temps.',
      cta: 'Précommander',
      cards: ['Pains', 'Viennoiseries', 'Pâtisseries'],
      illustration: 'sparkle',
    },
  },
  {
    slug: 'kebab',
    demo: true,
    category: 'Kebab',
    categoryId: 'kebab',
    name: 'Anatolia Kebab',
    domain: 'anatolia-kebab.example',
    url: '/demos/kebab/',
    screenshots: {
      desktop: '/images/kebab-desktop.webp',
      mobile: '/images/kebab-mobile.webp',
      alt: 'Aperçu du site de démonstration Anatolia Kebab',
    },
    summary:
      'Une application de commande en quatre écrans : accueil, carte par catégories, panier et infos. Options de produits, panier conservé d’une page à l’autre, total en direct, barre d’onglets en bas sur mobile.',
    goals: ['Permettre de commander en quelques secondes', 'Afficher les prix clairement, options comprises', 'Offrir une expérience pensée pour le mobile'],
    features: ['Panier conservé d’une page à l’autre', 'Options de produit dans une fenêtre dédiée', 'Catégories en onglets', 'Statut ouvert / fermé'],
    theme: {
      bg: '#171412', surface: '#FFFFFF', ink: '#FFFFFF', muted: '#B9AFA3',
      accent: '#E5352B', accentInk: '#FFFFFF',
      photoA: '#E5352B', photoB: '#171412', serif: false, dark: true,
    },
    site: {
      nav: ['La carte', 'Commander'],
      kicker: 'Kebab · Grill',
      headline: 'Grillé à la broche. Servi bien chaud.',
      cta: 'Composer mon sandwich',
      cards: ['Kebab', 'Dürüm', 'Assiette'],
      illustration: 'sparkle',
    },
  },
  {
    slug: 'epicerie',
    demo: true,
    category: 'Épicerie',
    categoryId: 'epicerie',
    name: 'Comptoir Mirabelle',
    domain: 'comptoir-mirabelle.example',
    url: '/demos/epicerie/',
    screenshots: {
      desktop: '/images/epicerie-desktop.webp',
      mobile: '/images/epicerie-mobile.webp',
      alt: 'Aperçu du site de démonstration Comptoir Mirabelle',
    },
    summary:
      'Un accueil qui donne envie (recherche, produits de saison, rayons), puis un catalogue filtrable, une page paniers et une page infos. Les produits de saison changent avec le mois.',
    goals: ['Aider à trouver un produit rapidement', 'Mettre en avant les produits de saison', 'Proposer des paniers à retirer en boutique'],
    features: ['Recherche depuis l’accueil', 'Catalogue avec filtres et pagination', 'Produits de saison selon le mois', 'Commande de panier'],
    theme: {
      bg: '#EFEBDD', surface: '#FBF9F1', ink: '#1F2418', muted: '#5E6350',
      accent: '#3E4A2B', accentInk: '#FFFFFF',
      photoA: '#CBD5B0', photoB: '#3E4A2B', serif: true, dark: false,
    },
    site: {
      nav: ['Nos rayons', 'Contact'],
      kicker: 'Épicerie fine',
      headline: 'L’épicerie du coin, en mieux choisie.',
      cta: 'Commander un panier',
      cards: ['Fruits & légumes', 'Crèmerie', 'Vrac'],
      illustration: 'leaf',
    },
  },
  {
    slug: 'artisan-batiment',
    demo: true,
    category: 'Artisan et bâtiment',
    categoryId: 'artisan',
    name: 'Maison Duret Rénovation',
    domain: 'maison-duret.example',
    url: '/demos/artisan/',
    screenshots: {
      desktop: '/images/artisan-desktop.webp',
      mobile: '/images/artisan-mobile.webp',
      alt: 'Aperçu du site de démonstration Maison Duret Rénovation',
    },
    summary:
      'Un site de rénovation façon chantier : béton, noir et orange sécurité, formes en biais. Accueil percutant, galerie de chantiers filtrable, corps d’état et méthode en quatre phases, puis un estimateur de budget et la demande de devis.',
    goals: ['Rassurer sur le sérieux de l’entreprise', 'Montrer les chantiers par métier', 'Chiffrer un projet avant le devis'],
    features: ['Estimateur de budget interactif', 'Galerie de chantiers filtrable', 'Corps d’état et méthode en 4 phases', 'Formulaire de devis'],
    theme: {
      bg: '#F3EEE6', surface: '#FFFFFF', ink: '#1E2621', muted: '#6B6A63',
      accent: '#C2632F', accentInk: '#FFFFFF',
      photoA: '#B9A58C', photoB: '#5D4F40', serif: false, dark: false,
    },
    site: {
      nav: ['Savoir-faire', 'Chantiers', 'Méthode', 'Contact'],
      kicker: 'Rénovation intérieure',
      headline: 'Rénover avec soin, construire avec exigence.',
      cta: 'Demander un devis',
      cards: ['Maçonnerie', 'Plâtrerie', 'Carrelage'],
      illustration: 'house',
    },
  },
  {
    slug: 'garage-automobile',
    demo: true,
    category: 'Garage automobile',
    categoryId: 'garage',
    name: 'Garage Central Motors',
    domain: 'central-motors.example',
    url: '/demos/garage/',
    screenshots: {
      desktop: '/images/garage-desktop.webp',
      mobile: '/images/garage-mobile.webp',
      alt: 'Aperçu du site de démonstration Garage Central Motors',
    },
    summary:
      'Un site de garage façon tableau de bord : fond asphalte, rouge course, caractères condensés. Un diagnostic des voyants d’alerte dès l’accueil, des forfaits à prix annoncés, l’atelier et sa FAQ, puis la prise de rendez-vous avec immatriculation.',
    goals: ['Orienter un automobiliste inquiet dès la première visite', 'Afficher des forfaits clairs', 'Faciliter la prise de rendez-vous'],
    features: ['Diagnostic interactif des voyants', 'Forfaits à prix annoncés', 'Statut de l’atelier en direct', 'Rendez-vous avec immatriculation'],
    theme: {
      bg: '#0F1114', surface: '#1A1D22', ink: '#F3F4F6', muted: '#9AA0AA',
      accent: '#E5372B', accentInk: '#FFFFFF',
      photoA: '#3A3F48', photoB: '#121418', serif: false, dark: true,
    },
    site: {
      nav: ['Entretien', 'Réparation', 'Tarifs', 'Rendez-vous'],
      kicker: 'Mécanique toutes marques',
      headline: 'Votre véhicule entre de bonnes mains.',
      cta: 'Prendre rendez-vous',
      cards: ['Révision', 'Freinage', 'Diagnostic'],
      illustration: 'car',
    },
  },
  {
    slug: 'restaurant',
    demo: true,
    category: 'Restaurant',
    categoryId: 'restaurant',
    name: 'La Table d’Aurèle',
    domain: 'table-aurele.example',
    url: '/demos/restaurant/',
    screenshots: {
      desktop: '/images/restaurant-desktop.webp',
      mobile: '/images/restaurant-mobile.webp',
      alt: 'Aperçu du site de démonstration La Table d’Aurèle',
    },
    summary:
      'Une couverture plein écran qui donne envie, puis une page par chapitre : la carte à onglets, la maison et la réservation. Pas de barre de menu : des repères en chiffres romains sur le bord de l’écran.',
    goals: ['Créer une ambiance dès la première seconde', 'Rendre la carte lisible sur téléphone', 'Encourager la réservation'],
    features: ['Couverture plein écran', 'Carte à onglets (entrées, plats, desserts, vins)', 'Repères de navigation en chiffres romains', 'Formulaire de réservation'],
    theme: {
      bg: '#14110F', surface: '#1D1916', ink: '#F2EADF', muted: '#A99C8C',
      accent: '#C9A46B', accentInk: '#16110C',
      photoA: '#6E4B33', photoB: '#14110F', serif: true, dark: true,
    },
    site: {
      nav: ['La carte', 'Réserver'],
      kicker: 'Cuisine de saison',
      headline: 'Une cuisine de saison, un lieu à partager.',
      cta: 'Réserver une table',
      cards: ['Entrées', 'Plats', 'Desserts'],
      illustration: 'plate',
    },
  },
  {
    slug: 'paysagiste',
    demo: true,
    category: 'Paysagiste',
    categoryId: 'paysagiste',
    name: 'Verdance Paysage',
    domain: 'verdance-paysage.example',
    url: '/demos/paysagiste/',
    screenshots: {
      desktop: '/images/paysagiste-desktop.webp',
      mobile: '/images/paysagiste-mobile.webp',
      alt: 'Aperçu du site de démonstration Verdance Paysage',
    },
    summary:
      'Un accueil qui donne envie : un plan de jardin interactif où chaque point est une prestation. Puis une page par sujet : les saisons (qui recolorent tout le site), la méthode et la demande d’étude. Navigation par un rail vertical.',
    goals: ['Montrer les prestations sur un plan plutôt que dans une liste', 'Faire vivre le site au fil des saisons', 'Recueillir des demandes d’étude'],
    features: ['Plan de jardin cliquable', 'Saisons mémorisées d’une page à l’autre', 'Quatre pages courtes', 'Formulaire d’étude'],
    theme: {
      bg: '#F2F4ED', surface: '#FFFFFF', ink: '#14241A', muted: '#566559',
      accent: '#2C5A3A', accentInk: '#FFFFFF',
      photoA: '#9DB5A8', photoB: '#2C5A3A', serif: true, dark: false,
    },
    site: {
      nav: ['Prestations', 'Contact'],
      kicker: 'Conception & entretien',
      headline: 'Des jardins pensés pour être vécus.',
      cta: 'Demander une étude',
      cards: ['Création', 'Terrasses', 'Entretien'],
      illustration: 'leaf',
    },
  },
  {
    slug: 'entreprise-nettoyage',
    demo: true,
    category: 'Entreprise de nettoyage',
    categoryId: 'nettoyage',
    name: 'Clairéo Services',
    domain: 'claireo-services.example',
    url: '/demos/nettoyage/',
    screenshots: {
      desktop: '/images/nettoyage-desktop.webp',
      mobile: '/images/nettoyage-mobile.webp',
      alt: 'Aperçu du site de démonstration Clairéo Services',
    },
    summary:
      'Un site de nettoyage clair et aéré : navigation en capsule flottante, formes rondes et bulles. Une estimation de budget mensuelle dès l’accueil, quatre offres (bureaux, commerces, copropriétés, fin de chantier), la méthode, puis le devis gratuit.',
    goals: ['Donner un budget indicatif dès l’accueil', 'Présenter une offre par type de locaux', 'Rassurer sur le protocole de nettoyage'],
    features: ['Calculateur de budget mensuel', 'Quatre offres détaillées', 'Méthode et contrôle qualité', 'Formulaire de devis'],
    theme: {
      bg: '#F3F7FB', surface: '#FFFFFF', ink: '#0F2236', muted: '#5D6F82',
      accent: '#1F78D1', accentInk: '#FFFFFF',
      photoA: '#A9CBEA', photoB: '#3D6E9E', serif: false, dark: false,
    },
    site: {
      nav: ['Bureaux', 'Commerces', 'Copropriétés', 'Devis'],
      kicker: 'Nettoyage professionnel',
      headline: 'Des espaces impeccables, en toute sérénité.',
      cta: 'Obtenir un devis',
      cards: ['Bureaux', 'Vitrerie', 'Fin de chantier'],
      illustration: 'sparkle',
    },
  },
  {
    slug: 'salon-de-coiffure',
    demo: true,
    category: 'Salon de coiffure',
    categoryId: 'coiffure',
    name: 'Atelier Solène',
    domain: 'atelier-solene.example',
    url: '/demos/coiffure/',
    screenshots: {
      desktop: '/images/coiffure-desktop.webp',
      mobile: '/images/coiffure-mobile.webp',
      alt: 'Aperçu du site de démonstration Atelier Solène, salon de coiffure',
    },
    summary:
      'Un site de salon façon magazine de mode : un accueil à grande photo, la carte des prestations en onglets, la présentation de l’équipe et surtout une vraie réservation en ligne en quatre étapes, avec créneaux et total en direct.',
    goals: ['Donner envie de pousser la porte du salon', 'Afficher clairement prestations et tarifs', 'Permettre de réserver en quelques touches'],
    features: ['Réservation en 4 étapes avec créneaux', 'Carte des prestations en onglets', 'Prochain créneau libre sur l’accueil', 'Quatre pages courtes'],
    theme: {
      bg: '#F5F0E9', surface: '#FFFFFF', ink: '#1B1614', muted: '#6F625B',
      accent: '#B4533A', accentInk: '#FFFFFF',
      photoA: '#EBD3CA', photoB: '#B4533A', serif: true, dark: false,
    },
    site: {
      nav: ['Prestations', 'Le salon', 'Réserver'],
      kicker: 'Coiffure · Couleur · Soin',
      headline: 'Votre style, notre geste.',
      cta: 'Réserver',
      cards: ['Coupe', 'Couleur', 'Soin'],
      illustration: 'scissors',
    },
  },
];

/** Ordre d'affichage : les projets en ligne d'abord, puis les maquettes générées. */
const order = ['revizstmg', 'quickfix-ia', 'boucherie', 'boulangerie', 'restaurant', 'kebab', 'epicerie', 'paysagiste', 'salon-de-coiffure'];
export const projects: Project[] = [...all].sort((a, b) => {
  const ia = order.indexOf(a.slug), ib = order.indexOf(b.slug);
  return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
});

export const categories = [
  { id: 'all', label: 'Tous' },
  ...projects.map((p) => ({ id: p.categoryId, label: p.category })),
];
