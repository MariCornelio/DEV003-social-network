import { signOut } from 'firebase/auth';
import { docGetProfile, saveProfile, updateprofileFields } from '../lib/index.js';
import { auth } from '../lib/model/firebase';

export const profileLogic = () => {
  const profileButtonLogout = document.getElementById('profile-button-logout');
  const profileForm = document.getElementById('profile-form');
  const profileProffesion = document.getElementById('profile-proffesion');
  const profileLanguages = document.getElementById('profile-languages');

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
    if (docSnap.exists()) {
      console.log('actualizando');
      updateprofileFields(docFirebaseId, {
        proffesion: profileProffesion.value,
        languages: profileLanguages.value,
      });
    } else {
      console.log('entro')
      saveProfile(profileProffesion.value, profileLanguages.value);
    }

    // stateProfile((querysnapshot) => {
    //   querysnapshot.forEach((doc) => {
    //     if (doc.id === docFirebaseId) {
    //       updateprofileFields(doc.id, {
    //         proffesion: profileProffesion.value,
    //         languages: profileLanguages.value,
    //       });
    //     } else {
    //       saveProfile(profileProffesion.value, profileLanguages.value);
    //     }
    //   });
    // });
  });
};
