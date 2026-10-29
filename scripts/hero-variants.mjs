#!/usr/bin/env node
/**
 * Variante mobile del hero de la Home (mismo encuadre, menos píxeles). El original
 * `balcones-tensores.webp` no se toca. Uso: node scripts/hero-variants.mjs
 */
import sharp from 'sharp';
import { stat } from 'node:fs/promises';

const SRC = 'public/assets/images/balcones-tensores.webp';
const OUT = 'public/assets/images/balcones-tensores-828.webp';
const quality = Number(process.argv[2] || 72);

await sharp(SRC).resize({ width: 828, withoutEnlargement: true }).webp({ quality, effort: 6 }).toFile(OUT);
console.log(OUT, Math.round((await stat(OUT)).size / 1024), 'KB q' + quality);
