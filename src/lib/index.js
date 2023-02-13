// aqui exportaras las funciones que necesites
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';

import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

import { messageError } from '../errors/messageError.js';

import { auth, db } from './model/firebase.js';

// usando firestore
export const guardarPublicacion = (descripcion) => {
  addDoc(collection(db, 'publicaciones'), { descripcion });
};

export const verPublicacion = (funcionRecorrido) => onSnapshot(collection(db, 'publicaciones'), funcionRecorrido);
// ************************************************************
// guardando perfil
export const saveProfile = (profession, languages) => {
  console.log('hola')
  console.log(auth.currentUser);
  setDoc(doc(db, 'userProfile', auth.currentUser.uid), { profession, languages });
};

// ************************************************
// Mediador para el estado de perfil
// export const stateProfile = (callback) => onSnapshot(collection(db, 'userProfile'), callback);

export const updateprofileFields = (id, newFields) => updateDoc(doc(db, 'userProfile', id), newFields);

export const docGetProfile = (id) => getDoc(doc(db, 'userProfile', id));
// ************************************************
// para actualizar la información de usuario
export const updateName = (currentUser, nameUser) => {
  updateProfile(currentUser, {
    displayName: nameUser,
  }).then(() => {
    console.log('Se guardo el nombre en el perfil');
  }).catch((error) => {
    console.log(error.code);
  });
};
// ***************************************************
// usando Autenticación
// para escuchar el inicio de sesión:
export const onStateSession = () => {
  onAuthStateChanged(auth, (user) => {
    console.log(user);
    if (user == null) {
      window.location.hash = '#/';
    }
    if (window.location.hash === '#/' && user) {
      window.location.hash = '#/home';
    }
    if (window.location.hash === '' && user) {
      window.location.hash = '#/home';
    }
  });
};

// para registro de usuarios
export const createUser = async (email, password, nameUser) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // console.log('1', userCredential);
      // console.log('2', auth.currentUser);
      // console.log(userCredential.user.displayName);
      updateName(userCredential.user, nameUser);
      window.location.hash = '#/home';
    })
    .catch((error) => {
      console.log(error);
      const registerInput = document.querySelectorAll('#form-signup .input-field');
      if (error.code === 'auth/email-already-in-use') {
        messageError('Email already in use', registerInput[1]);
      } else if (error.code === 'auth/invalid-email') {
        messageError('Invalid email', registerInput[1]);
      } else {
        messageError('Error occurred in your registration', registerInput[4]);
      }
    });
};
// *************************************************
// para iniciar sesion
export const signinUser = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('se ha iniciado sesion con correo y contraseña');
      window.location.hash = '#/home';
    })
    .catch((error) => {
      console.log(error);
      const formSignin = document.querySelectorAll('#form-signin .input-field');
      if (error.code === 'auth/wrong-password') {
        messageError('Wrong password', formSignin[1]);
      } else if (error.code === 'auth/invalid-email') {
        messageError('Invalid email', formSignin[0]);
      } else if (error.code === 'auth/user-not-found') {
        messageError('User not found', formSignin[0]);
      } else {
        messageError("Can't login", formSignin[2]);
      }
    });
};
// inicio de sesion con google
const provider = new GoogleAuthProvider();
export const googleSignin = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      window.location.hash = '#/home';
    }).catch((error) => {
      console.log(error);
    });
};
