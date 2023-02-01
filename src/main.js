// Este es el punto de entrada de tu aplicacion

import { router } from './router/router.js';

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
