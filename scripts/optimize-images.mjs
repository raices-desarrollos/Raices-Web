#!/usr/bin/env node
/**
 * Optimiza las imágenes de `public/assets` para el export estático.
 *
 *  - Fotos y renders (`public/assets/images`): se convierten a WebP, máx. 2400 px
 *    de ancho para la fachada (hero) y 1600 px para el resto. Nunca se agrandan.
 *  - Planos (`public/assets/plans`): WebP sin pérdida, resolución original,
 *    para mantener nitidez de líneas y cotas.
 *  - Logos (`public/assets/brand`, `public/assets/partners`): no se tocan.
 *  - Favicon, apple-touch-icon e imagen Open Graph: se generan a partir de
 *    `public/assets/brand/raices_logo_icono.png` y `raices_logo_completo.png`.
 *
 * Los nombres de salida se normalizan a minúsculas con guiones. Por defecto el
 * original pesado se elimina al convertirlo (pasar `--keep` para conservarlo).
 *
 *   npm run optimize-images
 *   npm run optimize-images -- --keep
 */
import { readdir, stat, unlink, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const PUBLIC = path.join(ROOT, 'public');
const KEEP_SOURCES = process.argv.includes('--keep');

const TINTA = { r: 0x21, g: 0x20, b: 0x1e, alpha: 1 };

const PHOTO_RULES = {
  dir: path.join(PUBLIC, 'assets/images'),
  maxWidth: 1600,
  heroMaxWidth: 2400,
  isHero: (name) => /fachada/i.test(name),
  quality: 80,
};

const PLAN_RULES = {
  dir: path.join(PUBLIC, 'assets/plans'),
};

const SOURCE_EXT = /\.(png|jpe?g)$/i;

function slugify(fileName) {
  const ext = path.extname(fileName);
  const base = path
    .basename(fileName, ext)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return base;
}

function kb(bytes) {
  return `${Math.round(bytes / 1024)} KB`;
}

async function listSources(dir) {
  try {
    const entries = await readdir(dir);
    return entries.filter((name) => SOURCE_EXT.test(name)).sort();
  } catch {
    return [];
  }
}

async function convertPhoto(fileName) {
  const src = path.join(PHOTO_RULES.dir, fileName);
  const out = path.join(PHOTO_RULES.dir, `${slugify(fileName)}.webp`);
  const before = (await stat(src)).size;
  const maxWidth = PHOTO_RULES.isHero(fileName) ? PHOTO_RULES.heroMaxWidth : PHOTO_RULES.maxWidth;

  await sharp(src)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: PHOTO_RULES.quality, effort: 6 })
    .toFile(out);

  const after = (await stat(out)).size;
  console.log(`  ${fileName} → ${path.basename(out)}  ${kb(before)} → ${kb(after)}`);
  if (!KEEP_SOURCES && src !== out) await unlink(src);
}

async function convertPlan(fileName) {
  const src = path.join(PLAN_RULES.dir, fileName);
  const out = path.join(PLAN_RULES.dir, `${slugify(fileName)}.webp`);
  const before = (await stat(src)).size;

  await sharp(src).webp({ lossless: true, effort: 6 }).toFile(out);

  const after = (await stat(out)).size;
  console.log(`  ${fileName} → ${path.basename(out)}  ${kb(before)} → ${kb(after)}`);
  if (!KEEP_SOURCES && src !== out) await unlink(src);
}

/** Trazo negro sobre transparente → trazo blanco (equivale a brightness(0) invert(1)). */
function whiteStroke(input) {
  return sharp(input).ensureAlpha().negate({ alpha: false });
}

async function writeIcon(iconSrc, size, out, { padding = 0.16, radius = 0 } = {}) {
  const inner = Math.round(size * (1 - padding * 2));
  const icon = await whiteStroke(iconSrc)
    .resize({ width: inner, height: inner, fit: 'inside' })
    .png()
    .toBuffer();

  let base = sharp({
    create: { width: size, height: size, channels: 4, background: TINTA },
  });

  if (radius > 0) {
    const mask = Buffer.from(
      `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="#fff"/></svg>`,
    );
    base = sharp(await base.png().toBuffer()).composite([{ input: mask, blend: 'dest-in' }]);
    base = sharp(await base.png().toBuffer());
  }

  await base.composite([{ input: icon, gravity: 'centre' }]).png({ compressionLevel: 9 }).toFile(out);
  console.log(`  ${path.relative(ROOT, out)}  ${size}×${size}`);
}

async function writeOgImage(logoSrc, out) {
  const width = 1200;
  const height = 630;
  const logo = await whiteStroke(logoSrc)
    .resize({ height: Math.round(height * 0.62), fit: 'inside' })
    .png()
    .toBuffer();

  await sharp({ create: { width, height, channels: 4, background: TINTA } })
    .composite([{ input: logo, gravity: 'centre' }])
    .flatten({ background: TINTA })
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log(`  ${path.relative(ROOT, out)}  ${width}×${height}`);
}

async function generateBrandDerivatives() {
  const brandDir = path.join(PUBLIC, 'assets/brand');
  const iconSrc = path.join(brandDir, 'raices_logo_icono.png');
  const fullSrc = path.join(brandDir, 'raices_logo_completo.png');
  await mkdir(brandDir, { recursive: true });

  await writeIcon(iconSrc, 32, path.join(brandDir, 'favicon-32.png'), { padding: 0.08, radius: 6 });
  await writeIcon(iconSrc, 192, path.join(brandDir, 'favicon-192.png'), { padding: 0.12, radius: 36 });
  await writeIcon(iconSrc, 180, path.join(brandDir, 'apple-touch-icon.png'), { padding: 0.16 });
  await writeOgImage(fullSrc, path.join(brandDir, 'og-image.png'));
}

async function main() {
  console.log('Fotos y renders');
  for (const file of await listSources(PHOTO_RULES.dir)) await convertPhoto(file);

  console.log('\nPlanos');
  for (const file of await listSources(PLAN_RULES.dir)) await convertPlan(file);

  console.log('\nFavicon, apple-touch-icon y Open Graph');
  await generateBrandDerivatives();

  console.log('\nListo.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
