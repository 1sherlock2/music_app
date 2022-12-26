import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';

precacheAndRoute(self.__WB_MANIFEST);

registerRoute((params) => {
  const aaa = a;
  debugger;
  return true;
});
