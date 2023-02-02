import { loginLogic } from '../controllers/loginLogic.js';
import { Login } from '../views/Login.js';

export const router = () => {
  const root = document.getElementById('root');

  root.innerHTML = '';
  const hash = window.location.hash;
  switch (hash) {
    case '#/':
    case '':
      root.appendChild(Login());
      loginLogic();
      break;
    case '#/profile':
      root.innerHTML = '<h2>Perfil</h2>';
      break;
    default:
      root.innerHTML = '<h2>Error 404</h2>';
  }
  // if (hash === '' || hash === '#/') {
  //   root.appendChild(Login());
  //   loginLogic();
  // } else if (hash === '#/profile') {
  //   root.innerHTML = '<h2>Perfil</h2>';
  // } else {
  //   root.innerHTML = '<h2>Error 404</h2>';
  // }
};
