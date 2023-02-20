import { Profile } from './Profile';

describe('Profile', () => {
  it('should be a function', () => {
    expect(typeof Profile).toBe('function');
  });

  it('should create an element', () => {
    jest.spyOn(document, 'createElement').mockImplementation(() => {return {classList: {add: () => {}}}});
    Profile();
    expect(document.createElement).toBeCalled();
  });
});
