import { messageError, cleanMessageErrors } from '../src/errors/messageError';

describe('messageError', () => {
  it('should be a function', () => {
    expect(typeof messageError).toBe('function');
  });


  it('should create element', () => {
    const classListMock = {add: jest.fn()}
    const divError = {innerHTML: '',classList: classListMock}
    jest.spyOn(document, 'createElement').mockImplementation(() => 
    {return divError});
    const insertAdjacentElementMock = jest.fn()
    const tag = {insertAdjacentElement: insertAdjacentElementMock}

    messageError('',tag);
    expect(classListMock.add).toBeCalled();
    expect(insertAdjacentElementMock).toBeCalled();
    expect(document.createElement).toBeCalled();
  });


});


describe('cleanMessageErrors', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be a function', () => {
    expect(typeof cleanMessageErrors).toBe('function');
  });

  it('should clean element', () => {
    const removeChildMock =  jest.fn()
    const tagContainerMock = {querySelector: 
      jest.fn().mockReturnValue(''), removeChild: removeChildMock}
    jest.spyOn(document, 'querySelector')

    cleanMessageErrors(tagContainerMock);
    expect(removeChildMock).toBeCalled();
    expect(tagContainerMock.querySelector).toBeCalled();
    expect(document.querySelector).toBeCalled();
  });

  it('should clean element', () => {
    const removeChildMock =  jest.fn()
    const tagContainerMock = {querySelector: jest.fn().mockReturnValue(null), removeChild: removeChildMock}
    jest.spyOn(document, 'querySelector')


    cleanMessageErrors(tagContainerMock);
    expect(removeChildMock).not.toBeCalled();
    // no debería de ser llamado porque el elemento a eliminar NO existe
    expect(tagContainerMock.querySelector).toBeCalled();
    expect(document.querySelector).not.toBeCalled();
  });

});