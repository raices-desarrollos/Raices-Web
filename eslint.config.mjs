import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = [
  ...nextVitals,
  {
    // Export estático con imágenes ya optimizadas por `scripts/optimize-images.mjs`
    // (`images.unoptimized`): `next/image` no aportaría nada y rompería el control de
    // `sizes`, cortinas y dimensiones intrínsecas.
    rules: { '@next/next/no-img-element': 'off' },
  },
  {
    ignores: ['.next/**', 'out/**', 'node_modules/**'],
  },
];

export default eslintConfig;
