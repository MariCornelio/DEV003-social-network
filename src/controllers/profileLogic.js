import { signOut } from 'firebase/auth';
import { auth } from '../lib/model/firebase';

export const profileLogic = () => {
  const profileButtonLogout = document.getElementById('profile-button-logout');

  // firebase: cerrando sesion con un evento click
  profileButtonLogout.addEventListener('click', async () => {
    console.log('logout');
    await signOut(auth);
  });
};
