// Este es el punto de entrada de tu aplicacion

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/model/firebase.js';
import { router } from './router/router.js';

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
onAuthStateChanged(auth, (user) => {
  console.log(user);
  if (user) {
    window.location.hash = '#/home';
  } else {
    window.location.hash = '#/';
  }
});
