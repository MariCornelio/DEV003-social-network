import photoProfile from '../assets/photoProfile.png';
import logoDevgram from '../assets/branch.svg';
import photoProfileStories1 from '../assets/photo-profile-stories1.webp';
import photoProfileStories2 from '../assets/photoStrories2.png';
import photoProfileStories3 from '../assets/photo-profile-stories3.png';
import photoProfileStories4 from '../assets/photo-profile-stories4.png';
import photoProfileStories5 from '../assets/photo-profile-stories5.jpg';
import photoProfileStories6 from '../assets/photo-profile-stories6.webp';

export const Home = () => {
  const divContainer = document.createElement('div');
  divContainer.classList.add('home-container');
  divContainer.innerHTML = `
  <!-- Ana-Header -->
  <header class="home-header">
  <div class="home-title-logo">
  <h1>devgram</h1>
  <img src=${logoDevgram} alt="logo devgram">
  </div>
    <div class="home-buttons">
      <div class="home-post-btn">
        <i class="fa-solid fa-plus"></i>
        <p>Post</p>
      </div>
      <div id='header-edit-profile' class="home-edit-profile">
        <div class="home-profile-pic">
          <img src=${photoProfile} alt="Profile photo"id='profilePhotoHeader'>
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
            <img src=${photoProfileStories1}>
          </div>
          <p class="name-home-stories">Your Story</p>
        </div>
        <div class="story-home">
          <div class="profile-photo-home">
            <img src=${photoProfileStories2}>
          </div>
          <p class="name-home-stories">Ana Ibarra</p>
        </div>
        <div class="story-home">
          <div class="profile-photo-home">
            <img src=${photoProfileStories3}>
          </div>
          <p class="name-home-stories">Fernanda Treviño</p>
        </div>
        <div class="story-home">
          <div class="profile-photo-home">
            <img src=${photoProfileStories4}>
          </div>
          <p class="name-home-stories">Marilu Cornelio</p>
        </div>
        <div class="story-home">
          <div class="profile-photo-home">
            <img src=${photoProfileStories5}>
          </div>
          <p class="name-home-stories">Isabel Lopez</p>
        </div>
        <div class="story-home">
          <div class="profile-photo-home">
            <img src=${photoProfileStories6}>
          </div>
          <p class="name-home-stories">Gerardo Perez</p>
        </div>
      </div>
      <form id="home-form-create-post" class="create-post">
        <div class="profile-photo-home">
          <img src=${photoProfile} id='profilePhotoHomePost'>
        </div>
        <input id="home-create-post" type="text" placeholder="What's on your mind?">
        <input id="create-post-button" type="submit" value="Post" class="create-btn btn-primary-create">
      </form>
      <section class="home-post-section">
        <div class="post-container">
        </div>
      </section>
    </div>
  </section>
</main>
    `;
  return divContainer;
};

/* <div class="post">
<div class="post-header">
  <img src="./assets/feed.jpg" class="user-icon" alt="">
  <p class="username">Isabel Roman</p>
  <p class="username-position-languages">Software Developer <em>javascript, angular</em>
</div>
<div class="post-feed">
  <div class="post-overlays">
    <img src="./assets/red-heart.png" class="like-icon" alt="">
    <div class="share-window">
      <h1 class="title">share the post with others</h1>
      <div class="share-link-container">
        <input type="text" id="share-link" value="https://www.devgram.com" disabled>
        <button class="copy-btn">copy</button>
      </div>
    </div>
  </div>
  <div class="post-img-container">
    <img src="../../assets/feed.jpg" alt="">
  </div>
</div>
<div class="post-detail">
  <div class="detail-intracables">
    <img src="./assets/heart-nofill.png" class="like-btn" alt="">
    <img src="./assets/send-nofill.png" class="send-btn" alt="">
    <img src="./assets/comment-nofill.png" class="comment-btn" alt="">
  </div>
  <span class="likes">2.7k likes</span>
  <p class="username">Isabel Roman</p>
  <p class="post-des">Saluditos.com.mx</p>
  <div class="comment-box">
    <input type="text" id="comment-input" placeholder="Add a comment">
    <button class="add-comment-btn"><img src="./assets/comment-nofill.png" alt=""></button>
  </div>
  <span class="comment-count">300 comments</span>
</div>
</div>
<div class="post">
<div class="post-header">
  <img src="./assets/feed.jpg" class="user-icon" alt="">
  <p class="username">Soyun Usuario</p>
  <p class="username-position-languages">Software Developer <em>javascript, angular</em>
</div>
<div class="post-feed">
  <div class="post-overlays">
    <img src="./assets/red-heart.png" class="like-icon" alt="">
    <div class="share-window">
      <h1 class="title">share the post with others</h1>
      <div class="share-link-container">
        <input type="text" id="share-link" value="https://www.devgram.com" disabled>
        <button class="copy-btn">copy</button>
      </div>
    </div>
  </div>
  <div class="post-img-container">
    <img src="../../assets/feed.jpg" alt="">
  </div>
</div>
<div class="post-detail">
  <div class="detail-intracables">
    <img src="./assets/heart-nofill.png" class="like-btn" alt="">
    <img src="./assets/send-nofill.png" class="send-btn" alt="">
    <img src="./assets/comment-nofill.png" class="comment-btn" alt="">
  </div>
  <span class="likes">2.7k likes</span>
  <p class="username">Soyun Usuario</p>
  <p class="post-des">Esto es un mensaje :) </p>

  <div class="comment-box">
    <input type="text" id="comment-input" placeholder="Add a comment">
    <button class="add-comment-btn"><img src="./assets/comment-nofill.png" alt=""></button>
  </div>
  <span class="comment-count">300 comments</span>
</div>
</div> */

