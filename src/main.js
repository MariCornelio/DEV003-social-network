// Este es el punto de entrada de tu aplicacion

// import { myFunction } from './lib/index.js';
import { router } from './lib/router/router.js';

// myFunction();
router();

window.addEventListener('hashchange', () => {
  router();
});
