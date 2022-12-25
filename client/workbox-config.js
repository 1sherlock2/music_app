module.exports = {
  globDirectory: 'dist/',
  globPatterns: ['**/*.{webmanifest,js,png,ico,html,json,css}'],
  swSrc: 'src/workers/sw.ts',
  swDest: 'dist/__/src/workers/sw.js',
  maximumFileSizeToCacheInBytes: 1024 * 1024 * 10
};
