import { Home } from '../src/views/Home';

describe('Home', () => {
  it('should be a function', () => {
    expect(typeof Home).toBe('function');
  });

  it('should create an element', () => {
    jest.spyOn(document, 'createElement').mockImplementation(() => ({ classList: { add: () => { } } }));
    Home();
    expect(document.createElement).toBeCalled();
  });
});
