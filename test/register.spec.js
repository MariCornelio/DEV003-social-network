/**
 * @jest-environment jsdom
 */

import { Login } from '../src/views/Login.js';
import { loginLogic } from '../src/controllers/loginLogic.js';

describe('register form', () => {
  it('should render form correctly', () => {
    // GIVEN
    const rootDiv = document.createElement('div');
    rootDiv.id = 'root';

    document.body.append(rootDiv);

    // WHEN
    rootDiv.appendChild(Login());
    loginLogic();

    // THEN
    const formElement = document.querySelector('#form-signin');
    // inputs
    // boton

    expect(formElement).not.toBeNull();
  });
});

// dispatchEvent
