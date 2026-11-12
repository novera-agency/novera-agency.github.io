/**
 * ============================================================
 *  CONFIGURATION GÉNÉRALE DU SITE
 * ============================================================
 *  Toutes les informations de l'agence sont centralisées ici.
 *  Modifiez ce fichier pour changer le nom, le logo, les
 *  coordonnées, les mentions légales ou l'envoi du formulaire.
 *  Les champs marqués « À compléter » doivent être renseignés
 *  avant la mise en ligne.
 * ============================================================
 */

export const site = {
  /** Nom commercial de l'agence (affiché partout sur le site). */
  name: 'Studio Altitude',

  /** Courte signature affichée à côté du logo et dans le pied de page. */
  tagline: 'Agence de création web',

  /**
   * Logo : placez votre fichier dans /public (ex. /public/logo.svg)
   * puis indiquez son chemin ici, ex. '/logo.svg'.
   * Laissez `null` pour afficher le nom en logotype texte.
   */
  logo: null as string | null,
  /** Logo alternatif pour les fonds sombres (facultatif). */
  logoLight: null as string | null,

  /** URL de production (sans slash final) — utilisée pour le SEO et le sitemap. */
  url: 'https://www.votre-domaine.fr',

  /** Langue et région. */
  locale: 'fr_FR',

  /** Description par défaut (balise meta description). */
  description:
    "Agence web spécialisée dans la création et la rénovation de sites Internet professionnels pour artisans, commerçants, restaurants, garages et TPE.",

  contact: {
    email: 'websiteconsulting@gmail.com',
    /**
     * Téléphone de l'agence. Laissez vide ('') pour le masquer partout
     * (en-tête, menu mobile, contact, pied de page, mentions légales).
     * Exemple : phone: '01 23 45 67 89', phoneHref: '+33123456789'
     */
    phone: '',
    /** Format international pour les liens « tel: » */
    phoneHref: '',
    city: 'France',
    hours: 'Du lundi au vendredi, 9h – 18h',
  },

  /**
   * ENVOI DU FORMULAIRE DE CONTACT
   * ------------------------------------------------------------
   * Le site est statique : les demandes sont transmises par un
   * service d'envoi d'e-mails. Renseignez UNE des deux options :
   *
   *  1) Web3Forms (gratuit) — https://web3forms.com
   *     Saisissez votre adresse e-mail sur le site, récupérez la
   *     clé d'accès et collez-la dans `web3formsAccessKey`.
   *
   *  2) Formspree — https://formspree.io
   *     Créez un formulaire et collez son identifiant
   *     (ex. « xyzabcd ») dans `formspreeId`.
   *
   * Tant qu'aucune option n'est renseignée, le formulaire
   * n'affiche JAMAIS de faux message de succès : il indique que
   * l'envoi en ligne n'est pas encore actif et propose d'envoyer
   * la demande par e-mail.
   */
  form: {
    web3formsAccessKey: '',
    formspreeId: '',
    /** Objet de l'e-mail reçu. */
    subject: 'Nouvelle demande de devis depuis le site',
  },

  /**
   * MESURE D'AUDIENCE (facultatif)
   * ------------------------------------------------------------
   * Par défaut, le site ne dépose aucun cookie et aucun bandeau
   * n'est nécessaire. Si vous renseignez un identifiant Google
   * Analytics 4 (ex. « G-XXXXXXX »), un bandeau de consentement
   * s'affiche automatiquement et le script n'est chargé
   * qu'après acceptation.
   */
  analytics: {
    googleAnalyticsId: '',
  },

  social: {
    linkedin: '',
    instagram: '',
    facebook: '',
  },

  /** Informations légales — À COMPLÉTER avant mise en ligne. */
  legal: {
    companyName: 'Studio Altitude', // Raison sociale
    legalForm: '[Forme juridique — À compléter]', // ex. SAS, EURL, EI…
    capital: '[Capital social — À compléter]',
    address: '[Adresse du siège — À compléter]',
    siret: '[SIRET — À compléter]',
    rcs: '[RCS / RNE — À compléter]',
    vat: '[N° de TVA intracommunautaire — À compléter]',
    director: '[Nom du directeur de la publication — À compléter]',
    host: {
      name: '[Nom de l’hébergeur — À compléter]',
      address: '[Adresse de l’hébergeur — À compléter]',
      phone: '[Téléphone de l’hébergeur — À compléter]',
    },
  },
};

export const nav = [
  { label: 'Services', href: '/#services' },
  { label: 'Réalisations', href: '/realisations/' },
  { label: 'Pourquoi nous', href: '/#pourquoi' },
  { label: 'Méthode', href: '/#methode' },
  { label: 'Contact', href: '/contact/' },
];
