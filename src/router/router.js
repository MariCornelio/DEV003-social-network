import { loginLogic } from '../controllers/loginLogic.js';
import { profileLogic } from '../controllers/profileLogic.js';
import { Home } from '../views/Home.js';
import { Login } from '../views/Login.js';
import { Profile } from '../views/Profile.js';
import { Home } from '../views/Home.js';

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
      root.appendChild(Profile());
      profileLogic();
      break;
    case '#/home':
      root.appendChild(Home());
      break;
    default:
      root.innerHTML = '<h2>Error 404</h2>';
  }
};
