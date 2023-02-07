import { collection, addDoc } from 'firebase/firestore';
import { guardarPublicacion, googleSignin } from './index';

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
  newMod.createUserWithEmailAndPassword = jest.fn();
  newMod.GoogleAuthProvider = jest.fn();
  newMod.signInWithEmailAndPassword = jest.fn();
  newMod.signInWithPopup = jest.fn().mockImplementation(() => Promise.resolve({ email: 'test@gmail.com' }));
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
