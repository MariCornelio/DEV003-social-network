import {homeLogic, homeLayoutPost} from '../src/controllers/homeLogic.js';
import {seePost} from '../src/lib/index.js';

jest.mock('../src/lib/index.js', () => {
  const originalModule = jest.requireActual('../src/lib/index.js');
  const newMod = {...originalModule};
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
    jest
      .spyOn(document, 'getElementById')
      .mockImplementation(() => ({addEventListener: addEventListenerMock}));
    jest
      .spyOn(document, 'querySelector')
      .mockImplementation(() => ({addEventListener: () => {}}));
    jest.spyOn(document, 'querySelectorAll').mockImplementation(() => {});

    homeLogic();
    expect(document.getElementById).toBeCalled();
    expect(document.querySelector).toBeCalled();

    expect(addEventListenerMock).toBeCalled();
    expect(seePost).toBeCalled();
  });
});

describe('homeLayoutPost', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be a function', () => {
    expect(typeof homeLayoutPost).toBe('function');
  });

  it('should create an element', () => {
    const classListMock = {add: jest.fn()};
    const post = {innerHTML: 'hey', classList: classListMock};
    jest.spyOn(document, 'createElement').mockImplementation(() => {
      return post;
    });
    const result = homeLayoutPost();

    expect(classListMock.add).toBeCalled();
    expect(document.createElement).toBeCalled();
    expect(result).not.toBe('hey');
    // en el test se expera que la funcion cree un elemento y agregue esa clase
    // a una lista de clases, por lo tanto, la expectativa es que el resultado
    // sea un objeto con esa clase, no  una cadena de texto 'hey'
  });
});

//soy un comentario u_u
