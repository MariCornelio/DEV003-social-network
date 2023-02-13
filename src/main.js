// Este es el punto de entrada de tu aplicacion

import { onStateSession } from './lib/index.js';
import { router } from './router/router.js';

window.addEventListener('load', () => {
  onStateSession();
  router();
});
window.addEventListener('hashchange', () => {
  onStateSession();
  router();
});
