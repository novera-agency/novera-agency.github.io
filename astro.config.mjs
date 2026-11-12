// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { site } from './src/config/site.ts';

/**
 * SITE_URL et BASE_PATH sont fournis par le déploiement GitHub Pages
 * (voir .github/workflows/deploy.yml). En local ou avec un nom de
 * domaine personnalisé, les valeurs par défaut s'appliquent.
 */
export default defineConfig({
  site: process.env.SITE_URL || site.url,
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
});
