import { cleanMessageErrors, messageError } from '../errors/messageError.js';
import { createUser, googleSignin, signinUser } from '../lib/index.js';

export const loginLogic = () => {
  const container = document.querySelector('.container');
  const pwShowHide = document.querySelectorAll('.showHidePw');
  const pwFields = document.querySelectorAll('.password');
  const signUp = document.querySelector('.signup-link');
  const login = document.querySelector('.login-link');

  /// check if passwords match
  const createPassword = document.getElementById('create-password');
  const confirmPassword = document.getElementById('register-password');
  const registerInput = document.querySelectorAll('#form-signup .input-field');
  const buttonRegister = document.getElementById('button-signup');
  const buttonLogin = document.getElementById('button-signin');

  // validacion de inputs
  const allInputForm = document.querySelectorAll('.forms .input-field');

  // firebase
  // registration
  const registerEmail = document.getElementById('register-email');
  const registerPassword = document.getElementById('register-password');
  const formSignup = document.getElementById('form-signup');
  const registerName = document.getElementById('register-name');
  // **************************************
  // Inicio de sesion
  const formSignin = document.getElementById('form-signin');
  const signinEmail = document.getElementById('signin-email');
  const signinPassword = document.getElementById('signin-password');
  // ***********************************************
  // inicio de sesion con google:
  const buttonGoogle = document.querySelector('.button-google');
  // *******************************************************
  //   js code to show/hide password and change icon
  pwShowHide.forEach((eyeIcon) => {
    eyeIcon.addEventListener('click', () => {
      pwFields.forEach((pwField) => {
        if (pwField.type === 'password') {
          pwField.type = 'text';

          pwShowHide.forEach((icon) => {
            icon.classList.replace('fa-eye-slash', 'fa-eye');
          });
        } else {
          pwField.type = 'password';

          pwShowHide.forEach((icon) => {
            icon.classList.replace('fa-eye', 'fa-eye-slash');
          });
        }
      });
    });
  });
  // *******************************************
  //  check if passwords match
  const checkPassword = () => {
    cleanMessageErrors(formSignup);
    if (
      confirmPassword.value
      && createPassword.value
      && createPassword.value !== confirmPassword.value
    ) {
      buttonRegister.disabled = true;
      buttonRegister.style.opacity = 0.5;
      messageError('Password should match', registerInput[3]);
    } else {
      buttonRegister.disabled = false;
      buttonRegister.style.opacity = 1;
    }
  };
  createPassword.addEventListener('input', checkPassword);
  confirmPassword.addEventListener('input', checkPassword);
  // ********************************************
  // validaciones de todos los inputs
  allInputForm.forEach((div) => {
    const divMessage = document.createElement('div');
    divMessage.id = div.children[0].name;
    divMessage.innerHTML = `
    <i class="fa-solid fa-circle-exclamation"></i> <p>${div.title}</p>
    `;
    divMessage.classList.add('messageErrorValidation', 'none');
    div.insertAdjacentElement('afterend', divMessage);

    div.addEventListener('keyup', (e) => {
      if (e.target.matches('input')) {
        const inputForm = e.target;
        const patron = inputForm.pattern;
        const regex = new RegExp(patron);
        if (!regex.exec(inputForm.value) && inputForm.value !== '') {
          document
            .getElementById(inputForm.name)
            .classList.add('active-pattern');
          buttonRegister.disabled = true;
          buttonRegister.style.opacity = 0.5;
          buttonLogin.disabled = true;
          buttonLogin.style.opacity = 0.5;
        } else {
          document
            .getElementById(inputForm.name)
            .classList.remove('active-pattern');
          buttonRegister.disabled = false;
          buttonRegister.style.opacity = 1;
          buttonLogin.disabled = false;
          buttonLogin.style.opacity = 1;
        }
      }
    });
  });
  // *******************************************
  // js code to appear signup and login form
  signUp.addEventListener('click', () => {
    // mostrar register
    container.classList.add('active');
    // reseteo del formulario de Login para pasar al register
    formSignin.reset();
    const deleteMessageError = formSignin.querySelectorAll('.active-pattern');
    if (deleteMessageError.length !== 0) {
      deleteMessageError.forEach((div) => {
        div.classList.remove('active-pattern');
      });
    }
    cleanMessageErrors(formSignin);
    buttonRegister.disabled = false;
    buttonRegister.style.opacity = 1;
  });

  // mostrar login
  login.addEventListener('click', () => {
    container.classList.remove('active');
    // reseteo de formulario del register para pasar a login
    formSignup.reset();
    const deleteMessageError = formSignup.querySelectorAll('.active-pattern');
    if (deleteMessageError.length !== 0) {
      deleteMessageError.forEach((div) => {
        div.classList.remove('active-pattern');
      });
    }
    cleanMessageErrors(formSignup);
    buttonLogin.disabled = false;
    buttonLogin.style.opacity = 1;
  });
  // ************************************************
  // firebase
  // registration
  formSignup.addEventListener('submit', (e) => {
    e.preventDefault();
    cleanMessageErrors(formSignup);
    createUser(registerEmail.value, registerPassword.value, registerName.value);
  });
  // ****************************************
  // inicio de sesion
  formSignin.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(formSignin);
    cleanMessageErrors(formSignin);
    signinUser(signinEmail.value, signinPassword.value);
  });

  // ********************************************************
  // inicio de sesion con google
  buttonGoogle.addEventListener('click', () => {
    googleSignin();
  });
};
