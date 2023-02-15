export const Profile = () => {
  const divProfileContainer = document.createElement('div');
  divProfileContainer.innerHTML = `
  <h2 class="title-profile">We'd love to know more about you</h2>
  <form class="form-profile"id="profile-form">
  <label for="profile-profession" class="questions-profile" >What do you do?</label>
  <input class="answer-profile" id='profile-profession' type="text" required>
  <label for="profile-languages" class="questions-profile" > Which technologies or programming languages do you use? </label>
  <input class="answer-profile" id='profile-languages' type="text">
  <div class="save-container"> 
  <button class="save-btn" id="profile-button-save">Save</button>
  </div>
  </form>
  <div class="logout-container"> 
  <button class="logout-btn" id="profile-button-logout">Log Out</button>
  </div>
  `;
  return divProfileContainer;
};
