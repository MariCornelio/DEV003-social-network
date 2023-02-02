import { loginLogic } from '../controllers/loginLogic.js';
import { Login } from '../views/Login.js';
import { Profile } from '../views/Profile.js';

export const router = () => {
  const root = document.getElementById('root');

  root.innerHTML = '';
  const hash = window.location.hash;
  if (hash === '' || hash === '#/') {
    root.appendChild(Login());
    loginLogic();
  } else if (hash === '#/profile') {
    root.appendChild(Profile());
  } else {
    root.innerHTML = '<h2>Error 404</h2>';
  }
};
