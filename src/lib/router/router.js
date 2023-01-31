import { login } from '../views/login.js';

export const router = () => {
  const root = document.getElementById('root');
  const hash = window.location.hash;
  if (hash === '' || hash === '#/') {
    root.innerHTML = login;
  } else if (hash === '#/profile') {
    root.innerHTML = '<h2>Perfil</h2>';
  } else {
    root.innerHTML = '<h2>Home</h2>';
  }
};
