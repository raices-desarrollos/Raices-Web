#!/usr/bin/env node
/**
 * Optimiza las imágenes de `public/assets` para el export estático.
 *
 *  - Fotos y renders (`public/assets/images`): se convierten a WebP, máx. 2400 px
 *    de ancho para la fachada (hero) y 1600 px para el resto. Nunca se agrandan.
 *  - Planos (`public/assets/plans`): WebP sin pérdida, resolución original,
 *    para mantener nitidez de líneas y cotas.
 *  - Logos (`public/assets/brand`, `public/assets/partners`): siguen siendo PNG
 *    con transparencia y resolución original, recomprimidos con paleta de 256
 *    colores (trazo plano + antialias). Pesan ~3 veces menos sin cambio visible.
 *  - Favicon e apple-touch-icon: se generan en `public/` a partir de
 *    `raices_logo_icono.png`, con el trazo en Caliza `#D1C7BA` sobre Carbón
 *    `#101210`. Open Graph sale de `raices_logo_completo.png` en versión
 *    blanca sobre tinta.
 *    `npm run optimize-images -- --favicons-only` regenera solo esos archivos.
 *
 * Los nombres de salida se normalizan a minúsculas con guiones. Por defecto el
 * original pesado se elimina al convertirlo (pasar `--keep` para conservarlo).
 *
 *   npm run optimize-images
 *   npm run optimize-images -- --keep
 */
import { readdir, stat, unlink, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const PUBLIC = path.join(ROOT, 'public');
const KEEP_SOURCES = process.argv.includes('--keep');

const TINTA = { r: 0x21, g: 0x20, b: 0x1e, alpha: 1 };
/** Carbón y Caliza del design system. El isotipo del favicon va en Caliza sobre Carbón. */
const CARBON = { r: 0x10, g: 0x12, b: 0x10, alpha: 1 };
const CALIZA = { r: 0xd1, g: 0xc7, b: 0xba, alpha: 1 };

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

const LOGO_DIRS = [path.join(PUBLIC, 'assets/brand'), path.join(PUBLIC, 'assets/partners')];
const GENERATED_BRAND = /^(favicon-|apple-touch-icon|og-image)/;

/** Recomprime un logo PNG en el lugar, con paleta. Solo escribe si achica el archivo. */
async function compressLogo(dir, fileName) {
  const src = path.join(dir, fileName);
  const before = (await stat(src)).size;
  const buffer = await sharp(src)
    .png({ palette: true, quality: 90, effort: 10, compressionLevel: 9 })
    .toBuffer();

  if (buffer.length >= before) {
    console.log(`  ${fileName}  ${kb(before)} (ya óptimo)`);
    return;
  }
  await writeFile(src, buffer);
  console.log(`  ${fileName}  ${kb(before)} → ${kb(buffer.length)}`);
}

/** Trazo negro sobre transparente → trazo blanco (equivale a brightness(0) invert(1)). */
function whiteStroke(input) {
  return sharp(input).ensureAlpha().negate({ alpha: false });
}

/**
 * Grosor medido del trazo opaco en `raices_logo_icono.png` (749×893).
 * Sirve para saber cuándo el escalado cae por debajo de un píxel.
 */
const SOURCE_STROKE_PX = 18;

/**
 * Coloca el isotipo oficial, sin redibujar la forma, en Caliza sobre Carbón.
 * El PNG de origen es trazo negro sobre transparente: la forma sale del alfa
 * y el color se escribe con el hex de Caliza, no con un filtro.
 *
 * A 180 px el trazo sigue teniendo más de un píxel y se escala con Lanczos.
 * A 16, 32 y 48 el mismo trazo cubriría una fracción de píxel y se apagaría.
 * Ahí la cobertura se cuantiza a Caliza sólida. Es el mismo mapa de tinta.
 */
async function markOnCarbon(iconSrc, size, padding = 0.16) {
  const inner = Math.max(1, Math.round(size * (1 - padding * 2)));
  const meta = await sharp(iconSrc).metadata();
  const scale = inner / Math.max(meta.width || 1, meta.height || 1);
  const strokePx = SOURCE_STROKE_PX * scale;

  const mark =
    strokePx >= 1.25 ? await smoothMark(iconSrc, inner) : await solidMark(iconSrc, inner, strokePx);

  return sharp({ create: { width: size, height: size, channels: 4, background: CARBON } })
    .composite([{ input: mark, gravity: 'centre' }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

function paintCaliza(alpha, width, height) {
  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    rgba[i * 4] = CALIZA.r;
    rgba[i * 4 + 1] = CALIZA.g;
    rgba[i * 4 + 2] = CALIZA.b;
    rgba[i * 4 + 3] = alpha[i];
  }
  return sharp(rgba, { raw: { width, height, channels: 4 } }).png().toBuffer();
}

async function smoothMark(iconSrc, inner) {
  const resized = await sharp(iconSrc)
    .ensureAlpha()
    .resize({
      width: inner,
      height: inner,
      fit: 'inside',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: 'lanczos3',
    })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = resized.info;
  const alpha = Buffer.alloc(width * height);
  for (let i = 0; i < alpha.length; i++) alpha[i] = resized.data[i * channels + channels - 1];
  return paintCaliza(alpha, width, height);
}

/** Píxeles que el trazo original cubre pasan a Caliza. El resto queda transparente. */
async function solidMark(iconSrc, inner, strokePx) {
  const threshold = strokePx < 0.75 ? 40 : 24;
  const mask = await sharp(iconSrc)
    .ensureAlpha()
    .extractChannel('alpha')
    .resize({
      width: inner,
      height: inner,
      fit: 'inside',
      kernel: 'lanczos3',
    })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = mask.info;
  const alpha = Buffer.alloc(width * height);
  for (let i = 0; i < alpha.length; i++) {
    if (mask.data[i] >= threshold) alpha[i] = 255;
  }
  return paintCaliza(alpha, width, height);
}

/** ICO con PNG embebidos (16, 32 y 48). Lo leen pestañas modernas sin un favicon de plantilla. */
function packIco(pngs) {
  const count = pngs.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;
  const entries = pngs.map(({ size, buffer }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(buffer.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += buffer.length;
    return entry;
  });
  const dir = Buffer.alloc(6);
  dir.writeUInt16LE(0, 0);
  dir.writeUInt16LE(1, 2);
  dir.writeUInt16LE(count, 4);
  return Buffer.concat([dir, ...entries, ...pngs.map((item) => item.buffer)]);
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

  const retired = ['favicon-32.png', 'favicon-192.png', 'apple-touch-icon.png'].map((name) =>
    path.join(brandDir, name),
  );
  for (const file of retired) {
    try {
      await unlink(file);
      console.log(`  eliminado ${path.relative(ROOT, file)}`);
    } catch {
      /* ya no estaba */
    }
  }

  const favicon32 = await markOnCarbon(iconSrc, 32, 0.06);
  const apple = await markOnCarbon(iconSrc, 180, 0.18);
  await writeFile(path.join(PUBLIC, 'favicon-32x32.png'), favicon32);
  await writeFile(path.join(PUBLIC, 'apple-touch-icon.png'), apple);
  console.log('  public/favicon-32x32.png  32×32');
  console.log('  public/apple-touch-icon.png  180×180');

  const icoSizes = [
    [16, 0.04],
    [32, 0.06],
    [48, 0.08],
  ];
  const pngs = [];
  for (const [size, padding] of icoSizes) {
    pngs.push({ size, buffer: await markOnCarbon(iconSrc, size, padding) });
  }
  await writeFile(path.join(PUBLIC, 'favicon.ico'), packIco(pngs));
  console.log(`  public/favicon.ico  ${icoSizes.map(([size]) => size).join(', ')}`);

  await writeOgImage(fullSrc, path.join(brandDir, 'og-image.png'));
}

async function main() {
  if (process.argv.includes('--favicons-only')) {
    console.log('Favicon y Open Graph');
    await generateBrandDerivatives();
    console.log('\nListo.');
    return;
  }

  console.log('Fotos y renders');
  for (const file of await listSources(PHOTO_RULES.dir)) await convertPhoto(file);

  console.log('\nPlanos');
  for (const file of await listSources(PLAN_RULES.dir)) await convertPlan(file);

  console.log('\nLogos');
  for (const dir of LOGO_DIRS) {
    const files = (await listSources(dir)).filter((name) => /\.png$/i.test(name) && !GENERATED_BRAND.test(name));
    for (const file of files) await compressLogo(dir, file);
  }

  console.log('\nFavicon, apple-touch-icon y Open Graph');
  await generateBrandDerivatives();

  console.log('\nListo.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
