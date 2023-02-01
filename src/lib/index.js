// aqui exportaras las funciones que necesites
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
  collection,
  addDoc,
  onSnapshot,
} from 'firebase/firestore';
import { auth, db } from './model/firebase.js';

// usando firestore
export const guardarPublicacion = (descripcion) => {
  addDoc(collection(db, 'publicaciones'), { descripcion });
};

export const verPublicacion = (funcionRecorrido) => onSnapshot(collection(db, 'publicaciones'), funcionRecorrido);

// usando Autenticación

export const createUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential);
    })
    .catch((error) => {
      console.log(error);
    });
};
