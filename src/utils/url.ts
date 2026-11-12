/**
 * Préfixe un chemin interne avec le « base path » du site.
 * Indispensable sur GitHub Pages (site servi sous /nom-du-depot/).
 * Exemple : u('/contact/') → '/Site-perso-/contact/'
 */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const u = (path: string) => `${base}${path}`;
