/**
 * @jest-environment jsdom
 */
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { loginLogic } from '../src/controllers/loginLogic.js';
import { createUser } from '../src/lib/index.js';
// import { auth } from '../src/lib/model/firebase.js';
import { Login } from '../src/views/Login.js';

jest.mock('firebase/auth');
const auth = jest.fn();
describe('Primera prueba de registro', () => {
  let inputRegisterName;
  let inputRegisterEmail;
  let inputRegisterPassword;
  let inputCreatePassword;
  let formSignup;
  beforeEach(() => {
    const rootDiv = document.createElement('div');
    rootDiv.id = 'root';

    document.body.appendChild(rootDiv);

    // WHEN
    rootDiv.appendChild(Login());
    loginLogic();
    inputRegisterName = document.getElementById('register-name');
    inputRegisterEmail = document.getElementById('register-email');
    inputRegisterPassword = document.getElementById('register-password');
    inputCreatePassword = document.getElementById('create-password');
    formSignup = document.getElementById('form-signup');
  });
  it('espero que me registre', async () => {
    createUserWithEmailAndPassword.mockImplementation(
      (auth, email, password) => Promise.resolve({ user: { displayName: null, email, password } })
    );

    inputRegisterEmail.value = 'Ana@gmail.com';
    inputRegisterPassword.value = '123456';
    inputCreatePassword.value = '123456';
    inputRegisterName.value = 'Ana';
    formSignup.submit();
    await expect(createUserWithEmailAndPassword(auth, 'Ana@gmail.com', '123456')).resolves.toEqual({ user: { displayName: 'Ana', email: 'Ana@gmail.com', password: '123456' } })
  });
});
