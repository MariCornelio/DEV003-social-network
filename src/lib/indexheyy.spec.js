import { collection, addDoc } from 'firebase/firestore';
import { guardarPublicacion, googleSignin, createUser } from './index';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { messageError } from '../errors/messageError.js';

jest.mock('../errors/messageError.js', () => {
  const originalModule = jest.requireActual('../errors/messageError.js');
  const newMod = { ...originalModule };
  newMod.messageError = jest.fn();
  return newMod;
});

jest.mock('firebase/firestore', () => {
  const originalModule = jest.requireActual('firebase/firestore');
  const newMod = { ...originalModule };
  newMod.collection = jest.fn();
  newMod.addDoc = jest.fn();
  newMod.onSnapshot = jest.fn();
  return newMod;
});

jest.mock('firebase/auth', () => {
  const originalModule = jest.requireActual('firebase/auth');
  const newMod = { ...originalModule };
  newMod.createUserWithEmailAndPassword = jest.fn().mockImplementation((auth, email, password) => Promise.resolve({ user: {id:'hello im a mock', email: email, password: password} }));
  //newMod.createUserWithEmailAndPassword = jest.fn().mockImplementation(async () => {return Promise.resolve(new Error())});
  newMod.GoogleAuthProvider = jest.fn();
  newMod.signInWithEmailAndPassword = jest.fn();
  newMod.signInWithPopup = jest.fn().mockImplementation(() => Promise.resolve({ email: 'test@gmail.com' }));
  newMod.getAuth = jest.fn().mockImplementation(() => Promise.resolve({ }));
  return newMod;
});

/* googleSignin = jest.fn().mockReturnValue({
  email: 'tes@gmai.com',
}); */

describe('guardarPublicacion', () => {
  it('debería ser una función', () => {
    expect(typeof guardarPublicacion).toBe('function');
  });

  it('firestore debería ser llamado con los parámetros correctos', () => {
    const params = { };
    guardarPublicacion(params);
    expect(collection).toHaveBeenCalled();
    expect(addDoc).toHaveBeenCalled();
  });
});

describe('createUser', () => {
  it('debería ser una función', () => {
    expect(typeof createUser).toBe('function');
  });

  it('debería recibir el objeto ID', () => {
    const email = 'myemail@gmail.com'
    const password = 'pwd'
    const nameUser = 'Anita Mari'
    createUser(email, password, nameUser);
    return expect(createUserWithEmailAndPassword(Promise.resolve({}), email, password)).resolves.toStrictEqual({ user: {id:'hello im a mock', email: 'myemail@gmail.com', password: 'pwd' } });
  })

  

  it('createUserWithEmailAndPassword debería ser llamada con los parámetros correctos', () => {
    const email = 'myemail@gmail.com'
    const password = 'pwd'
    const nameUser = 'Anita Mari'
    createUser(email, password, nameUser);
    expect(createUserWithEmailAndPassword).toBeCalledWith(Promise.resolve({}), email, password);
  });

});


describe('googleSignin', () => {
  it('debería ser una función', () => {
    expect(typeof googleSignin).toBe('function');
  });

  it('CAMBIAR NOMBRE DE TEST', async () => {
    const params = { };
    const response = await googleSignin(params);
    console.log(response);
    expect(response).toStrictEqual({
      email: 'test@gmail.com',
    });
  });

  describe('Mock return value', () => {
    it('Should mock the return value of sum', () => {
      const originalModule = jest.requireActual('firebase/auth');
      const newMod = { ...originalModule };
      newMod.signInWithPopup = jest.fn().mockReturnValue(2);
      expect(newMod.signInWithPopup()).toBe(2);
    });
  });
});
