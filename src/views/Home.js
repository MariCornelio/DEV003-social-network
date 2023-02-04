export const Home = () => {
  const divContainer = document.createElement('div');
  divContainer.classList.add('home-container');
  divContainer.innerHTML = `
  <!-- Ana-Header -->
  <header class="home-header">
    <div class="home-logo">devgram<></div>
    <div class="home-buttons">
      <div class="home-create-btn">
        <span>&#10022;</span>
        <p>Create</p>
      </div>
      <div class="home-edit-profile">
        <span>&#9786;</span> 
        <p>Edit</p>
      </div>
    </div>
  </header>

    <!-- menu -->
    <!-- Fer-Main -->
    <main>
    <section class="home-stories">

      <!-- HTML solo para demostracion -->
      <img src="../../assets/feed.jpg"></img> 
      <img src="../../assets/feed.jpg"></img> 
      <img src="../../assets/feed.jpg"></img> 
    </section>
    <section class="home-post"></section>
    </main>
    `;
  return divContainer;
};
