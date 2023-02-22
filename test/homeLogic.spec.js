import { homeLogic } from '../src/controllers/homeLogic.js';
import { seePost } from '../src/lib/index.js';

jest.mock('../src/lib/index.js', () => {
  const originalModule = jest.requireActual('../src/lib/index.js');
  const newMod = { ...originalModule };
  newMod.seePost = jest.fn();
  return newMod;
});

describe('homeLogic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be a function', () => {
    expect(typeof homeLogic).toBe('function');
  });

  it('should create an element', () => {
    const addEventListenerMock = jest.fn();
    jest.spyOn(document, 'getElementById').mockImplementation(() => ({ addEventListener: addEventListenerMock }));
    jest.spyOn(document, 'querySelector').mockImplementation(() => ({ addEventListener: () => { } }));
    jest.spyOn(document, 'querySelectorAll').mockImplementation(() => { });

    homeLogic();
    expect(document.getElementById).toBeCalled();
    expect(document.querySelector).toBeCalled();

    expect(addEventListenerMock).toBeCalled();
    expect(seePost).toBeCalled();
  });
});
