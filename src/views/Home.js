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
<main>
  <section>
    <div class="middle-home-content">
      <div class="stories-home">
        <div class="story-home">
        <div class="profile-photo-home">
          <img src="../../assets/feed.jpg">
    </div>
    <p class="name-home-stories">Your Story</p>
    </div>
    <div class="story-home">
      <div class="profile-photo-home">
        <img src="../../assets/feed.jpg">
      </div>
      <p class="name-home-stories">Anita Mari</p>
                </div>
                <div class="story-home">
                    <div class="profile-photo-home">
                        <img src="../../assets/feed.jpg">
                    </div>
                    <p class="name-home-stories">Fernanda Treviño</p>
                </div>
                <div class="story-home">
                    <div class="profile-photo-home">
                        <img src="../../assets/feed.jpg">
                    </div>
                    <p class="name-home-stories">Gerado Perez</p>
                </div>
                <div class="story-home">
                    <div class="profile-photo-home">
                        <img src="../../assets/feed.jpg">
                    </div>
                    <p class="name-home-stories">Lolita Ayala</p>
                </div>
                <div class="story-home">
                    <div class="profile-photo-home">
                        <img src="../../assets/feed.jpg">
                    </div>
                    <p class="name-home-stories">Rosalba Luna</p>
                </div>
            </div>
            <form class="create-post">
            <div class="profile-photo-home">
                <img src="../../assets/feed.jpg">
            </div>
            <input type="text" placeholder="What's on your mind, Mari?" id="create-post">
            <input type="submit" value="Post" class="create-btn btn-primary-create">
        </form>

      <!-- HTML solo para demostracion -->
      <section class="home-stories">
      <img src="../../assets/feed.jpg"></img> 
      <img src="../../assets/feed.jpg"></img> 
      <img src="../../assets/feed.jpg"></img> 
      </section>
      </div>
    </main>
    `;
  return divContainer;
};
