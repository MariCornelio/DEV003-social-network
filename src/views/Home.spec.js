import { Home } from './Home';

describe('Home', () => {
  it('should be a function', () => {
    expect(typeof Home).toBe('function');
  });

  it('should create an element', () => {
    jest.spyOn(document, 'createElement').mockImplementation(() => {return { classList: {add: () => {}}}});
    Home();
    expect(document.createElement).toBeCalled();
  });
});
