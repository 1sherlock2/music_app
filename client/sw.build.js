const { injectManifest } = require('workbox-build');
const child = require('child_process');
const workboxConfig = {
  swSrc: 'src/workers/sw.ts',
  swDest: 'dist/__/src/workers/sw.js',
  globalPatterns: ['src/index.tsx', '*.css', '*.ts']
};

injectManifest(workboxConfig).then(() => {
  console.log(`Generated ${workboxConfig.swDest}`);
});
