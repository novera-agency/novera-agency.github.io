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
  /** Adresse du site en ligne (facultatif) : affiche un bouton « Voir le site ». */
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

export const projects: Project[] = [
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
    domain: 'gabriel-merlin.github.io/Buisness-solo',
    url: 'https://gabriel-merlin.github.io/Buisness-solo/',
    screenshots: {
      desktop: '/images/boucherie-desktop.webp',
      mobile: '/images/boucherie-mobile.webp',
      alt: 'Aperçu du site de la Boucherie Al-Baraka, boucherie halal artisanale à Paris',
    },
    summary:
      'Site vitrine pour une boucherie halal artisanale parisienne : histoire de la maison, engagements qualité, gamme de produits, horaires et accès, avec un appel direct depuis le mobile.',
    goals: ['Rassurer sur l’origine et la qualité des viandes', 'Présenter la gamme de produits', 'Faciliter la venue en boutique et l’appel'],
    features: ['Pages viande, produits et contact', 'Horaires et adresse en un coup d’œil', 'Bouton d’appel sur mobile', 'Données structurées pour le référencement local'],
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
    slug: 'artisan-batiment',
    demo: true,
    category: 'Artisan et bâtiment',
    categoryId: 'artisan',
    name: 'Maison Duret Rénovation',
    domain: 'duret-renovation.fr',
    summary:
      'Site vitrine pour une entreprise de rénovation intérieure : présentation des savoir-faire, galerie de chantiers et demande de devis en quelques clics.',
    goals: ['Inspirer confiance dès la première visite', 'Mettre en avant les chantiers', 'Générer des demandes de devis qualifiées'],
    features: ['Galerie avant / après', 'Formulaire de devis par type de travaux', 'Zone d’intervention avec carte', 'Bouton d’appel sur mobile'],
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
    domain: 'central-motors.fr',
    summary:
      'Site pour un garage indépendant : prestations et tarifs indicatifs, prise de rendez-vous et informations pratiques accessibles en un coup d’œil.',
    goals: ['Rendre les prestations lisibles', 'Faciliter la prise de rendez-vous', 'Afficher horaires et accès'],
    features: ['Grille de prestations', 'Formulaire de rendez-vous', 'Horaires et Google Maps', 'Appel en un geste'],
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
    domain: 'table-aurele.fr',
    summary:
      'Site élégant pour un restaurant bistronomique : carte consultable sur mobile, ambiance mise en valeur et réservation facilitée.',
    goals: ['Transmettre l’ambiance du lieu', 'Rendre la carte lisible sur téléphone', 'Encourager la réservation'],
    features: ['Carte et menus du moment', 'Lien de réservation', 'Galerie d’ambiance', 'Horaires et accès'],
    theme: {
      bg: '#1A1411', surface: '#251C18', ink: '#F4EBDD', muted: '#B8A894',
      accent: '#D4A25A', accentInk: '#1A1411',
      photoA: '#6E4B33', photoB: '#2A1D16', serif: true, dark: true,
    },
    site: {
      nav: ['La carte', 'Le lieu', 'Événements', 'Réserver'],
      kicker: 'Bistronomie de saison',
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
    domain: 'verdance-paysage.fr',
    summary:
      'Site pour un paysagiste créateur de jardins : réalisations par type d’espace, entretien sous contrat et demande d’étude personnalisée.',
    goals: ['Valoriser les réalisations', 'Distinguer création et entretien', 'Recueillir des demandes d’étude'],
    features: ['Portfolio par type de jardin', 'Page entretien', 'Formulaire d’étude', 'Zone d’intervention'],
    theme: {
      bg: '#EEF1EA', surface: '#FFFFFF', ink: '#18261C', muted: '#5F6B60',
      accent: '#2E6A3F', accentInk: '#FFFFFF',
      photoA: '#8FAF7E', photoB: '#2E4A32', serif: true, dark: false,
    },
    site: {
      nav: ['Création', 'Entretien', 'Jardins', 'Contact'],
      kicker: 'Conception & entretien',
      headline: 'Des jardins pensés pour être vécus.',
      cta: 'Demander une étude',
      cards: ['Terrasses', 'Plantations', 'Entretien'],
      illustration: 'leaf',
    },
  },
  {
    slug: 'entreprise-nettoyage',
    demo: true,
    category: 'Entreprise de nettoyage',
    categoryId: 'nettoyage',
    name: 'Clairéo Services',
    domain: 'claireo-services.fr',
    summary:
      'Site pour une entreprise de nettoyage professionnel : offres pour bureaux, commerces et copropriétés, avec devis rapide et engagements clairs.',
    goals: ['Rassurer les clients professionnels', 'Segmenter les offres', 'Simplifier la demande de devis'],
    features: ['Offres par type de locaux', 'Devis en ligne', 'Engagements qualité', 'Zone d’intervention'],
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
    domain: 'atelier-solene.fr',
    summary:
      'Site raffiné pour un salon de coiffure : prestations et tarifs, univers du salon et prise de rendez-vous accessible depuis chaque page.',
    goals: ['Refléter l’univers du salon', 'Afficher clairement les tarifs', 'Faciliter la prise de rendez-vous'],
    features: ['Carte des prestations', 'Lien de réservation', 'Galerie du salon', 'Horaires et accès'],
    theme: {
      bg: '#F6EEEA', surface: '#FFFFFF', ink: '#2A1C1A', muted: '#7D6863',
      accent: '#8E4E43', accentInk: '#FFFFFF',
      photoA: '#D8B9AC', photoB: '#7A5048', serif: true, dark: false,
    },
    site: {
      nav: ['Prestations', 'Tarifs', 'Le salon', 'Rendez-vous'],
      kicker: 'Coiffure & coloration',
      headline: 'L’art de sublimer chaque style.',
      cta: 'Prendre rendez-vous',
      cards: ['Coupe', 'Couleur', 'Soins'],
      illustration: 'scissors',
    },
  },
];

export const categories = [
  { id: 'all', label: 'Tous' },
  ...projects.map((p) => ({ id: p.categoryId, label: p.category })),
];
