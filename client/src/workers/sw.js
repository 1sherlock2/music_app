import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import {
  CacheFirst,
  NetworkFirst,
  StaleWhileRevalidate
} from 'workbox-strategies';

clientsClaim();
self.skipWaiting();

precacheAndRoute(self.__WB_MANIFEST);
console.log('REGISTER_ROUTE');
registerRoute(
  ({ request }) => request.destination === 'video',
  new StaleWhileRevalidate({
    cacheName: 'cache-video',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30
      })
    ]
  })
);

registerRoute(
  ({ request }) => request.destination === 'document',
  new StaleWhileRevalidate({ cacheName: 'cache-html' })
);
registerRoute(
  ({ request }) => request.destination === 'script',
  new NetworkFirst({ cacheName: 'cache-script' })
);
registerRoute(
  ({ request }) => request.destination === 'style',
  new NetworkFirst({ cacheName: 'cache-style' })
);
