module.exports = {
  globDirectory: 'dist/',
  globPatterns: ['**/*.{webmanifest,js,png,ico,html,json,css}'],
  swSrc: './src/workers/sw.js',
  swDest: 'dist/__/workers/src/sw.js',
  maximumFileSizeToCacheInBytes: 1024 * 1024 * 10
};
