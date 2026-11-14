// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { site } from './src/config/site.ts';
import { fileURLToPath } from 'node:url';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

/** Typographie française : espaces insécables avant « : ; ? ! » et autour des guillemets (texte uniquement). */
async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.name === 'demos') continue;
    const f = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(f)));
    else if (e.name.endsWith('.html')) out.push(f);
  }
  return out;
}
const frTypography = {
  name: 'fr-typography',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const root = fileURLToPath(dir);
      for (const f of await walk(root)) {
        const html = await readFile(f, 'utf8');
        let skip = false;
        const next = html.split(/(<[^>]+>)/g).map((part) => {
          if (part.startsWith('<')) {
            if (/^<(script|style|pre|code|textarea)\b/i.test(part)) skip = true;
            else if (/^<\/(script|style|pre|code|textarea)\b/i.test(part)) skip = false;
            return part;
          }
          if (skip) return part;
          return part
            .replace(/ ([:;?!»])/g, '\u00A0$1')
            .replace(/(«) /g, '$1\u00A0');
        }).join('');
        if (next !== html) await writeFile(f, next);
      }
    },
  },
};

/**
 * SITE_URL et BASE_PATH sont fournis par le déploiement GitHub Pages
 * (voir .github/workflows/deploy.yml). En local ou avec un nom de
 * domaine personnalisé, les valeurs par défaut s'appliquent.
 */
export default defineConfig({
  site: process.env.SITE_URL || site.url,
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  integrations: [sitemap(), frTypography],
  build: { inlineStylesheets: 'auto' },
});
