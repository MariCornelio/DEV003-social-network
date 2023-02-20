import { router } from './router';
import { loginLogic } from '../controllers/loginLogic.js';
import { profileLogic } from '../controllers/profileLogic.js';
import { homeLogic } from '../controllers/homeLogic.js';

jest.mock('../controllers/loginLogic.js', () => {
  const originalModule = jest.requireActual('../controllers/loginLogic.js');
  const newMod = { ...originalModule };
  newMod.loginLogic = jest.fn();
  return newMod;
});

jest.mock('../controllers/profileLogic.js', () => {
  const originalModule = jest.requireActual('../controllers/profileLogic.js');
  const newMod = { ...originalModule };
  newMod.profileLogic = jest.fn();
  return newMod;
});

jest.mock('../controllers/homeLogic.js', () => {
  const originalModule = jest.requireActual('../controllers/homeLogic.js');
  const newMod = { ...originalModule };
  newMod.homeLogic = jest.fn();
  return newMod;
});
describe('router', () => {
  beforeEach(() => {
    global.window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        hash: 'url',
      },
      writable: true,
    });
  });
  it('should be a function', () => {
    expect(typeof router).toBe('function');
  });

  it('should create an element', () => {
    jest.spyOn(document, 'getElementById').mockImplementation(() => { return { appendChild: jest.fn(), addEventListener: jest.fn() } });
    jest.spyOn(document, 'querySelector').mockImplementation(() => { return { addEventListener: () => { } } });

    global.window = Object.create(window);

    Object.defineProperty(window, 'location', {
      value: {
        hash: '',
      },
    });
    router();
    expect(window.location.hash).toEqual('');
    expect(document.getElementById).toBeCalled();
    expect(loginLogic).toBeCalled();
  });

  it('should create another element', () => {
    jest.spyOn(document, 'getElementById').mockImplementation(() => { return { appendChild: jest.fn(), addEventListener: jest.fn() } });
    jest.spyOn(document, 'querySelector').mockImplementation(() => { return { addEventListener: () => { } } });

    global.window = Object.create(window);

    Object.defineProperty(window, 'location', {
      value: {
        hash: '#/profile',
      },
    });
    router();
    expect(window.location.hash).toEqual('#/profile');
    expect(document.getElementById).toBeCalled();
    expect(profileLogic).toBeCalled()
  });
  it('should create once again another element', () => {
    jest.spyOn(document, 'getElementById').mockImplementation(() => { return { appendChild: jest.fn(), addEventListener: jest.fn() } });
    jest.spyOn(document, 'querySelector').mockImplementation(() => { return { addEventListener: () => { } } });

    global.window = Object.create(window);

    Object.defineProperty(window, 'location', {
      value: {
        hash: '#/home',
      },
    });
    router();
    expect(window.location.hash).toEqual('#/home');
    expect(document.getElementById).toBeCalled();
    expect(homeLogic).toBeCalled();
  });
});
