export const Profile = () => {
  const divProfileContainer = document.createElement('div');
  divProfileContainer.innerHTML = `
  <h2>Profile</h2>
  <button class="profile-button-logout">Log Out</button>
  `;
  return divProfileContainer;
};
