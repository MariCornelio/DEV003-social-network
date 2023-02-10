import { profileLogic } from '../controllers/profileLogic.js';
import { homeLogic } from '../controllers/homeLogic.js';
import { Home } from '../views/Home.js';
import { Login } from '../views/Login.js';
import { loginLogic } from '../controllers/loginLogic.js';
import { Profile } from '../views/Profile.js';

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
      homeLogic(Home());
      break;
    default:
      root.innerHTML = '<h2>Error 404</h2>';
  }
};
