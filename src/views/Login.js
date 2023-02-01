export const Login = () => {
  const divContainer = document.createElement('div');
  divContainer.classList.add('container');
  divContainer.innerHTML = `
       <div class="forms">
      <h1>devgram <> </h1>
        <div class="form login">
          <button class="button-google">
          <img src="./assets/logo-google.png" alt="logo google">
          <p>Continue with Google</p>
          </button>
         <div class="continue-email">
          <p>or continue with email</p>
         </div>

          <form>
            <div class="input-field">
              <input type="text" placeholder="Enter your email" required>
              <i class="uil uil-envelope icon"></i>
            </div>
            <div class="input-field">
              <input type="password" class="password" placeholder="Enter your password" required>
              <i class="uil uil-lock icon"></i>
              <i class="uil uil-eye-slash showHidePw"></i>
            </div>

            <div class="checkbox-text">
              <div class="checkbox-content">
                <input type="checkbox" id="logCheck">
                <label for="logCheck" class="text remember">Remember me</label>
              </div>

              <a  class="text">Forgot password?</a>
            </div>

            <div class="input-field button">
              <input type="button" value="Login">
            </div>
          </form>

          <div class="login-signup">
            <span class="text">
              <p>Haven't created an account?</p>
              <a class="text signup-link">Signup Now</a>
            </span>
          </div>
        </div>

        <!-- Registration Form -->
        <div class="form signup">
          <span class="title">Registration</span>

          <form>
            <div class="input-field">
              <input type="text" placeholder="Enter your name" required>
              <i class="uil uil-user"></i>
            </div>
            <div class="input-field">
              <input id="register-email" type="text" placeholder="Enter your email" required>
              <i class="uil uil-envelope icon"></i>
            </div>
            <div class="input-field">
              <input type="password" class="password" placeholder="Create a password" required>
              <i class="uil uil-lock icon"></i>
            </div>
            <div class="input-field">
              <input id="register-password" type="password" class="password" placeholder="Confirm a password" required>
              <i class="uil uil-lock icon"></i>
              <i class="uil uil-eye-slash showHidePw"></i>
            </div>

            <div class="checkbox-text">
              <div class="checkbox-content">
                <input type="checkbox" id="termCon">
                <label for="termCon" class="text terms">I accept all terms and conditions</label>
              </div>
            </div>

            <div class="input-field button">
              <input id="button-signup" type="button" value="Signup">
            </div>
          </form>

          <div class="login-signup">
            <span class="text">Already have an account?
              <a class="text login-link">Login Now</a>
            </span>
          </div>
        </div>
      </div>
   `;
  return divContainer;
};
