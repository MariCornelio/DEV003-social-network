export const Profile = () => {
  const divProfileContainer = document.createElement('div');
  divProfileContainer.innerHTML = `
  <h2>Profile</h2>
  <button id="profile-button-logout">Log Out</button>
  `;
  return divProfileContainer;
};
