export const Profile = () => {
  const divProfileContainer = document.createElement('div');
  divProfileContainer.innerHTML = `
  <h2>Profile</h2>
  <form id="profile-form">
  <label for="profile-proffesion">What do you do</label>
  <input id='profile-proffesion' type="text" required>
  <label for="profile-languages">Languages or programming technologies that you handle</label>
  <input id='profile-languages' type="text">
  <button id="profile-button-save">Save</button>
  </form>
  <button id="profile-button-logout">Log Out</button>
  `;
  return divProfileContainer;
};
