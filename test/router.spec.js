import { router } from '../src/router/router';
import { loginLogic } from '../src/controllers/loginLogic.js';
import { profileLogic } from '../src/controllers/profileLogic.js';
import { homeLogic } from '../src/controllers/homeLogic.js';

jest.mock('../src/controllers/loginLogic.js', () => {
  const originalModule = jest.requireActual('../src/controllers/loginLogic.js');
  const newMod = { ...originalModule };
  newMod.loginLogic = jest.fn();
  return newMod;
});

jest.mock('../src/controllers/profileLogic.js', () => {
  const originalModule = jest.requireActual('../src/controllers/profileLogic.js');
  const newMod = { ...originalModule };
  newMod.profileLogic = jest.fn();
  return newMod;
});

jest.mock('../src/controllers/homeLogic.js', () => {
  const originalModule = jest.requireActual('../src/controllers/homeLogic.js');
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
    jest.spyOn(document, 'getElementById').mockImplementation(() => ({ appendChild: jest.fn(), addEventListener: jest.fn() }));
    jest.spyOn(document, 'querySelector').mockImplementation(() => ({ addEventListener: () => { } }));

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
    jest.spyOn(document, 'getElementById').mockImplementation(() => ({ appendChild: jest.fn(), addEventListener: jest.fn() }));
    jest.spyOn(document, 'querySelector').mockImplementation(() => ({ addEventListener: () => { } }));

    global.window = Object.create(window);

    Object.defineProperty(window, 'location', {
      value: {
        hash: '#/profile',
      },
    });
    router();
    expect(window.location.hash).toEqual('#/profile');
    expect(document.getElementById).toBeCalled();
    expect(profileLogic).toBeCalled();
  });

  it('should create once again another element', () => {
    jest.spyOn(document, 'getElementById').mockImplementation(() => ({ appendChild: jest.fn(), addEventListener: jest.fn() }));
    jest.spyOn(document, 'querySelector').mockImplementation(() => ({ addEventListener: () => { } }));

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

  it('should create the default element', () => {
    const root = {innerHTML: ''}
    const eventListenerMock = jest.fn().mockReturnValue(()=>{return root})
    jest.spyOn(document, 'getElementById').mockImplementation(() => ({ appendChild: jest.fn(), addEventListener: eventListenerMock}));
    jest.spyOn(document, 'querySelector').mockImplementation(() => ({ addEventListener: () => { } }));

    global.window = Object.create(window);

    Object.defineProperty(window, 'location', {
      value: {
        hash: 'definitely not a route',
      },
    });
    router();
    expect(window.location.hash).toEqual('definitely not a route');
    expect(document.getElementById).toBeCalled();
    expect(homeLogic).toBeCalled();
  });

});

