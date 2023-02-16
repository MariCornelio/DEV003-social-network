import { signOut } from 'firebase/auth';
import {
  docGetProfile,
  saveProfile,
  updateName,
  updateprofileFields,
} from '../lib/index.js';
import { auth } from '../lib/model/firebase';

export const profileLogic = () => {
  const profileButtonLogout = document.getElementById('profile-button-logout');
  const profileForm = document.getElementById('profile-form');
  const profileProfession = document.getElementById('profile-profession');
  const profileLanguages = document.getElementById('profile-languages');
  const profileNameUser = document.getElementById('profile-nameUser');

  // firebase: cerrando sesion con un evento click
  profileButtonLogout.addEventListener('click', async () => {
    console.log('logout');
    await signOut(auth);
  });

  profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const docFirebaseId = auth.currentUser.uid;
    console.log(docFirebaseId);

    const docSnap = await docGetProfile(docFirebaseId);
    let newNameUser = auth.currentUser.displayName;

    if (profileNameUser.value.trim().length !== 0) {
      newNameUser = profileNameUser.value;
      updateName(auth.currentUser, newNameUser);
    }

    if (docSnap.exists()) {
      console.log('actualizando');
      updateprofileFields(docFirebaseId, {
        profession: profileProfession.value,
        languages: profileLanguages.value,
        nameUser: newNameUser,
      });
    } else {
      console.log('entro');
      saveProfile(profileProfession.value, profileLanguages.value, newNameUser);
    }
    profileForm.reset();
  });
};
