// aqui exportaras las funciones que necesites
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';

import { collection, addDoc, onSnapshot } from 'firebase/firestore';

import { messageError } from '../errors/messageError.js';

import { auth, db } from './model/firebase.js';

// usando firestore
export const guardarPublicacion = (descripcion) => {
  addDoc(collection(db, 'publicaciones'), { descripcion });
};

export const verPublicacion = (funcionRecorrido) =>
  onSnapshot(collection(db, 'publicaciones'), funcionRecorrido);

// ************************************************
// usando Autenticación

// para registro de usuarios
export const createUser = (email, password, nameUser) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential);
      userCredential.user.displayName = nameUser;
      console.log(userCredential.user.displayName);
    })
    .catch((error) => {
      console.log(error);
      // const formSignup = document.getElementById('form-signup');
      const registerInput = document.querySelectorAll(
        '#form-signup .input-field'
      );
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
      console.log('se ha iniciado sesion');
      console.log(userCredential);
    })
    .catch((error) => {
      console.log(error);
      const formSignin = document.querySelectorAll('#form-signin .input-field');
      console.log(formSignin);
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
export const googleSignin = async () => {
  const response = await signInWithPopup(auth, provider);
  return response;
};
