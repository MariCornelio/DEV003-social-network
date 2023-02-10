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
import { messageError } from '../src/errors/messageError.js';
import { createUser } from '../src/lib/index.js';
// import { auth } from '../src/lib/model/firebase.js';
import { Login } from '../src/views/Login.js';

// jest.mock('../errors/messageError.js', () => {
//   const originalModule = jest.requireActual('../errors/messageError.js');
//   const newMod = { ...originalModule };
//   newMod.messageError = jest.fn().mockRejectedValue('msj');
//   return newMod;
// });

jest.mock('firebase/auth');
describe('Primera prueba de registro', () => {
  let inputRegisterName;
  let inputRegisterEmail;
  let inputRegisterPassword;
  let inputCreatePassword;
  let formSignup;
  let formSignupEmail;
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
    formSignupEmail = document.getElementById('form-signup-email');
  });
  it('espero que me registre', async () => {
    createUserWithEmailAndPassword.mockImplementation((auth, email, password) =>
      Promise.resolve({ user: { displayName: 'Ana', email, password } })
    );

    inputRegisterEmail.value = 'Ana@gmail.com';
    inputRegisterPassword.value = '123456';
    inputCreatePassword.value = '123456';
    inputRegisterName.value = 'Ana';
    formSignup.submit();
    // await expect(
    //   createUserWithEmailAndPassword(auth, 'Ana@gmail.com', '123456')
    // ).resolves.toEqual({
    //   user: { displayName: 'Ana', email: 'Ana@gmail.com', password: '123456' },
    // });

    await expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      undefined,
      'Ana@gmail.com',
      '123456'
    );
  });

  it.only('should return error message', () => {
    createUserWithEmailAndPassword.mockRejectedValueOnce({
      code: 'auth/email-already-in-use',
    });
    inputRegisterEmail.value = 'Ana@gmail.com';
    inputRegisterPassword.value = '123456';
    inputCreatePassword.value = '123456';
    inputRegisterName.value = 'Ana';
    messageError('Email already in use', formSignupEmail);
    // console.log('1', messageError('Email already in use', formSignupEmail));
    formSignup.submit();
    const RegisterError = document.querySelectorAll('.messageError p');
    console.log('2', RegisterError);
    console.log('3', RegisterError[1].querySelector('p'));
    expect(RegisterError[1].textContent).toBe('Email already in use');
  });
});
