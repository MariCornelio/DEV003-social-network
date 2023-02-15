import { docGetProfile, savePosts, seePost, updatePostFields } from '../lib/index.js';
import { auth } from '../lib/model/firebase.js';

export const homeLogic = () => {
  const postContainer = document.querySelector('.post-container');
  const createPostButton = document.getElementById('create-post-button');
  const homeCreatePost = document.getElementById('home-create-post');
  const homeFormCreatePost = document.getElementById('home-form-create-post');
  const homeLayoutPost = (description, nameUser, profession, languages, dateTime) => {
    const post = document.createElement('div');
    post.classList.add('post');
    post.innerHTML = `
            <div class="post-header">
              <img src="../../assets/feed.jpg" class="user-icon" alt="">
              <div class="post-username-details">
                <p class="username">${nameUser}</p>
                <p class="username-position-languages career">${profession}</p>
                <p class="username-position-languages"><em>${languages}</em></p>
                <p class="post-date">${dateTime}</p>
              </div>
              <div class="post-dropdown">
                <button class="post-actions">...</button>
                <div id="myDropdown" class="dropdown-content">
                  <a>Edit</a>
                  <a>Delete</a>
                </div>
              </div>
            </div>
            <div class="post-feed">
              <div class="post-overlays">
                <img src="./assets/red-heart.png" class="like-icon" alt="">
                <div class="share-window">
                  <h1 class="title">share the post with others</h1>
                  <div class="share-link-container">
                    <input type="text" id="share-link" value="https://www.devgram.com/" disabled>
                    <button class="copy-btn">copy</button>
                  </div>
                </div>
              </div>
              <div class="post-img-container">
                <p class="post-des">${description}</p>
              </div>
            </div>
            <div class="post-detail">
              <div class="detail-intracables">
                <img src="./assets/heart-nofill.png" class="like-btn" alt="">
                <img src="./assets/send-nofill.png" class="send-btn" alt="">
                <img src="./assets/comment-nofill.png" class="comment-btn" alt="">
              </div>
              <span class="likes">2.8k likes</span>
              <div class="comment-box">
                <input type="text" id="comment-input" placeholder="Add a comment">
                <button class="add-comment-btn"><img src="./assets/comment-nofill.png" alt=""></button>
              </div>
              <span class="comment-count">300 comments</span>
            </div>
    `;
    return post;
  };

  createPostButton.addEventListener('click', async (e) => {
    e.preventDefault();
    if (homeCreatePost.value.trim().length !== 0) {
      const dateTime = new Date().toLocaleTimeString([], {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
      let profession = '';
      let languages = '';
      if (auth.currentUser) {
        const docSnap = await docGetProfile(auth.currentUser.uid);
        if (docSnap.exists()) {
          profession = docSnap.data().profession;
          languages = docSnap.data().languages;
        }
        savePosts(
          auth.currentUser.uid,
          homeCreatePost.value,
          auth.currentUser.displayName,
          profession,
          languages,
          dateTime,
        );
      }
    }
    homeFormCreatePost.reset();
  });
  seePost((querysnapshot) => {
    postContainer.innerHTML = '';
    querysnapshot.forEach((doc) => {
      let profession = '';
      let languages = '';
      if (auth.currentUser) {
        docGetProfile(auth.currentUser.uid)
          .then((docSnap) => {
            if (docSnap.exists()) {
              profession = docSnap.data().profession;
              languages = docSnap.data().languages;
            }
            if (doc.data().idUser === auth.currentUser.uid) {
              updatePostFields(doc.id, { languages, profession });
            }
          }).catch((error) => {
            console.log(error);
          });
        postContainer.appendChild(homeLayoutPost(
          doc.data().description,
          doc.data().nameUser,
          doc.data().profession,
          doc.data().languages,
          doc.data().dateTime,
        ));
      }

    });
  });

  // ********************************************************************************
  postContainer.addEventListener('click', (e) => {
     if (e.target.matches('.like-btn')) {
      let likeImg = postContainer.querySelector('.like-icon');
      let shareBtn = postContainer.querySelector('.send-btn');
      let likeBtn = e.target
      if (likeBtn.src.includes('nofill')) {
        likeImg.classList.add('show');
        if (shareBtn.src.includes('-fill')) {
          shareBtn.click();
          }
         }
        setTimeout(() => {
        console.log('remove')
        likeImg.classList.remove('show');
      }, 3000);
    }

    if (e.target.matches('.send-btn')) {
      let shareWindow = postContainer.querySelector('.share-window');
      let shareBtn = postContainer.querySelector('.send-btn');
      console.log('sharebtn', shareBtn)
      shareWindow.classList.toggle('active');
    }

    if (e.target.matches('.copy-btn')) {
      let shareBtn = postContainer.querySelector('.send-btn');
      let postLink = postContainer.querySelector('#share-link').value;
      navigator.clipboard.writeText(postLink).then(() => {
        shareBtn.click();

      });
    }
     // show post dropdown menu
    if (e.target.matches('.post-actions')) {
      document.getElementById('myDropdown').classList.toggle('show-post-actions');
    }
    
  }); //cierre del click post container
            
  // close post dropdown menu
  window.onclick = function (event) {
    if (!event.target.matches('.post-actions')) {
      const dropdowns = document.getElementsByClassName('dropdown-content');
      for (let i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show-post-actions')) {
          openDropdown.classList.remove('show-post-actions');
        }
      }
    }
  };
  // Redirigiendo a profile
  const headerEditProfile = document.getElementById('header-edit-profile');
  headerEditProfile.addEventListener('click', () => {
    window.location.hash = '#/profile';
  })
}; // final de la funcion homoLogic
