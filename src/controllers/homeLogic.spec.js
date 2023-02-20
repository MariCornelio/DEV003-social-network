import { homeLogic } from './homeLogic';
import { seePost } from '../lib/index.js';

jest.mock('../lib/index.js', () => {
  const originalModule = jest.requireActual('../lib/index.js');
  const newMod = { ...originalModule };
  newMod.seePost = jest.fn();
  return newMod;
});

describe('homeLogic', () => {
  it('should be a function', () => {
    expect(typeof homeLogic).toBe('function');
  });

  it('should create an element', () => {
    jest.spyOn(document, 'getElementById').mockImplementation(() => { return { addEventListener: jest.fn() } });
    jest.spyOn(document, 'querySelector').mockImplementation(() => { return { addEventListener: () => {} } });

    homeLogic();
    expect(document.getElementById).toBeCalled();
    expect(document.querySelector).toBeCalled();
    expect(seePost).toBeCalled();
  });
});
