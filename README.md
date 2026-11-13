# Site de l’agence — création & rénovation de sites Internet

Site vitrine statique développé avec [Astro](https://astro.build) : rapide, sans dépendance côté serveur, facile à héberger (Netlify, Vercel, OVH, o2switch, GitHub Pages…).

## Démarrer

```bash
npm install
npm run dev      # serveur de développement → http://localhost:4321
npm run build    # génère le site statique dans dist/
npm run preview  # prévisualise la version générée
```

Déposez ensuite le contenu du dossier `dist/` chez votre hébergeur.

## Mise en ligne sur GitHub Pages

Le déploiement est automatisé par `.github/workflows/deploy.yml` : à chaque modification de la branche `main`, le site est reconstruit et publié.

1. Sur GitHub : **Settings → Pages → Build and deployment → Source : « GitHub Actions »**.
2. Fusionnez votre travail dans `main` (ou lancez le workflow à la main depuis l’onglet **Actions**).
3. Le site est publié sur `https://novera-agency.github.io/` (dépôt `novera-agency.github.io`).

Les liens internes s’adaptent automatiquement au sous-dossier (`/<depot>/`) grâce à `src/utils/url.ts` : utilisez toujours `u('/chemin/')` pour un nouveau lien interne.

**Nom de domaine personnalisé** : dans **Settings → Pages → Custom domain**, saisissez votre domaine et configurez les DNS indiqués par GitHub. Le site passera alors à la racine du domaine, sans autre modification.

## Personnaliser

| Quoi | Où |
| --- | --- |
| Nom de l’agence, logo, coordonnées, URL du site, mentions légales | `src/config/site.ts` |
| Envoi du formulaire par e-mail (Web3Forms ou Formspree) | `src/config/site.ts` → `form` |
| Mesure d’audience + bandeau cookies (facultatif) | `src/config/site.ts` → `analytics` |
| Textes des services, arguments, étapes, secteurs | `src/data/content.ts` |
| Projets de démonstration / futures réalisations | `src/data/projects.ts` |
| Couleurs, typographies, espacements | `src/styles/global.css` (variables `:root`) |
| Image de partage réseaux sociaux | `public/og-image.png` (1200 × 630) |

### Logo
Placez votre fichier dans `public/` (ex. `public/logo.svg`) puis indiquez `logo: '/logo.svg'` dans `src/config/site.ts`. Une variante claire pour les fonds sombres peut être définie via `logoLight`. Pensez aussi à remplacer `public/favicon.svg`.

### Recevoir les demandes de devis par e-mail
Le site étant statique, l’envoi passe par un service tiers :

1. **Web3Forms** (gratuit) : saisissez votre adresse sur https://web3forms.com, copiez la clé reçue dans `form.web3formsAccessKey`.
2. **ou Formspree** : créez un formulaire sur https://formspree.io et copiez son identifiant dans `form.formspreeId`.

Tant qu’aucun service n’est configuré, le formulaire **n’affiche jamais de faux succès** : il indique que l’envoi en ligne n’est pas actif et propose d’envoyer la demande pré-remplie par e-mail. En cas d’erreur réseau ou de refus du service, un message d’erreur est affiché.

### Cookies
Par défaut, aucun cookie n’est déposé (polices auto-hébergées, aucun traceur) : aucun bandeau n’est nécessaire. Si vous renseignez `analytics.googleAnalyticsId`, un bandeau de consentement apparaît automatiquement, Google Analytics n’est chargé qu’après acceptation, et un lien « Gestion des cookies » est ajouté au pied de page.

### Avant la mise en ligne
- [ ] Renseigner `url` (domaine définitif) dans `src/config/site.ts` et dans `public/robots.txt`
- [ ] Compléter toutes les informations `legal` (surlignées en jaune sur la page Mentions légales)
- [ ] Remplacer l’e-mail et le téléphone de démonstration
- [ ] Configurer l’envoi du formulaire et faire un essai réel
- [ ] Remplacer les projets de démonstration par de vraies réalisations dès que possible (avec l’accord des clients)

## Structure du site principal

Une page d'accueil courte qui donne envie, puis une page par sujet : `/services/`, `/realisations/` (grille filtrable), `/realisations/<projet>/` (une page par réalisation), `/pourquoi-nous/`, `/methode/`, `/contact/`. Les projets se déclarent dans `src/data/projects.ts` : les pages se génèrent toutes seules.

## Sites de démonstration

Six sites statiques indépendants dans `public/demos/<nom>/`. Chacun a sa propre architecture, sa navigation et ses interactions, avec une page d'accueil qui donne envie et une page par sujet :

| Dossier | Concept | Pages |
| --- | --- | --- |
| `paysagiste/` | plan de jardin interactif, saisons qui recolorent le site, rail vertical | accueil, saisons, méthode, étude |
| `boulangerie/` | « gazette » à bandeau centré, fournées en direct, ardoise | une, carte, commande |
| `restaurant/` | couverture plein écran, repères en chiffres romains, carte à onglets | accueil, carte, maison, réserver |
| `kebab/` | application de commande, panier conservé d'une page à l'autre | accueil, carte, panier, infos |
| `coiffure/` | magazine de mode, réservation en 4 étapes avec créneaux | accueil, prestations, salon, réserver |
| `epicerie/` | recherche, catalogue filtrable, produits de saison | accueil, catalogue, paniers, infos |

Ils ne partagent que `public/demos/shared.css` (bandeau de démonstration, accessibilité), `public/demos/demo.js` (apparition au défilement, formulaires de démonstration) et les polices auto-hébergées de `public/demos/fonts/`.

- Entreprises, adresses, téléphones, horaires et prix y sont **fictifs** ; chaque page porte un bandeau « Site de démonstration » et une balise `noindex`.
- Leurs formulaires et paniers **n'envoient rien** et le disent à l'écran.
- Les **photos** sont des images d’illustration libres de droits (Wikimédia Commons), dans `public/demos/photos/`, signalées « fausses photos » sur chaque image et en bas de page. Auteurs et licences : `public/demos/credits.html`. Pour en ajouter une, indiquer son auteur et sa licence dans cette page.
- Pour ajouter un projet : créer la fiche dans `src/data/projects.ts` (champs `url`, `screenshots`) et les captures dans `public/images/`.

## Arborescence du dépôt

```
src/
├── config/site.ts          # configuration centrale
├── data/                   # contenus (services, projets…)
├── layouts/                # BaseLayout (SEO, en-tête, pied de page), LegalLayout
├── components/
│   ├── sections/           # sections de la page d’accueil
│   ├── mockups/            # maquettes ordinateur / mobile en HTML-CSS
│   └── …                   # en-tête, pied de page, formulaire, icônes…
├── pages/                  # accueil, réalisations, contact, mentions légales, confidentialité, 404
├── scripts/                # animations, navigation, formulaire, consentement
└── styles/global.css       # design system
```
