export const Home = () => {
  const divContainer = document.createElement('div');
  divContainer.classList.add('home-container');
  divContainer.innerHTML = `
  <!-- Ana-Header -->
  <header class="home-header">
    <div class="home-logo">devgram<></div>
    <div class="home-buttons">
      <div class="home-post-btn">
        <i class="fa-solid fa-plus"></i>
        <p>Post</p>
      </div>
      <div class="home-edit-profile">
        <div class="home-profile-pic">
          <img src="../assets/profile.jpg" alt="Profile photo"> 
        </div>
        <p>Edit</p>
      </div>
    </div>
  </header>

    <!-- menu -->
    <!-- Fer-Main -->
    <main class="main-content">
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
