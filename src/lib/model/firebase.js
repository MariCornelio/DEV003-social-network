// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBUlUFXM-z3PllU70N8XqWCz1f_q-1fdXg',
  authDomain: 'social-network-25102.firebaseapp.com',
  projectId: 'social-network-25102',
  storageBucket: 'social-network-25102.appspot.com',
  messagingSenderId: '200634130096',
  appId: '1:200634130096:web:74d9aaf27f537c3342a575',
  measurementId: 'G-C9QLT7WK8C',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// usando firestore
const db = getFirestore();
export const guardarPublicacion = (descripcion) => {
  addDoc(collection(db, 'publicaciones'), { descripcion });
};

export const verPublicacion = (funcionRecorrido) => onSnapshot(collection(db, 'publicaciones'), funcionRecorrido);

// usando Autenticación

const auth = getAuth(app);
export const createUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential);
    })
    .catch((error) => {
      console.log(error);
    });
};
