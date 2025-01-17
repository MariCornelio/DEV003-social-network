/* eslint-disable no-plusplus */
import redHeart from '../assets/red-heart.png';
import heartNoFill from '../assets/heart-nofill.png';
import sendNoFill from '../assets/send-nofill.png';
import commentNoFill from '../assets/comment-nofill.png';
import {
  docGetProfile,
  savePosts,
  seePost,
  updatePostFields,
  deletePost,
  editPost,
  docGetPost,
  removingLikes,
  addingLikes,
} from '../lib/index.js';
import { auth } from '../lib/model/firebase.js';

const homeLayoutPost = (
  id,
  description,
  nameUser,
  profession,
  languages,
  dateTime,
  photoProfileUser,
  likes,
) => {
  const post = document.createElement('div');
  post.classList.add('post');
  post.innerHTML = `
            <div class="post-header">
              <img src=${photoProfileUser} class="user-icon" alt="photo profile">
              <div class="post-username-details">
                <p class="username">${nameUser}</p>
                <p class="username-position-languages career">${profession}</p>
                <p class="username-position-languages"><em>${languages}</em></p>
                <p class="post-date">${dateTime}</p>
              </div>
              <div class="post-dropdown">
                <button class="post-actions select-btn">...</button>
                <div class="dropdown-content select-dropdown">
                  <div class="dropdown-element dropdown-edit">
                    <i class="fa-solid fa-pencil"></i>
                    <a>Edit</a>
                  </div>
                  <div class="dropdown-element dropdown-delete select-predelete" >
                    <i class="fa-solid fa-trash-can select-predelete-icon"></i>
                    <a class="select-predelete-a">Delete</a>
                  </div>
                </div>
              </div>
              <div id="modal-container">
                <div id="modal">
                  <div id="modal-content">
                    <span style="font-size: 3em; color: Tomato;">
                      <i class="fa-regular fa-circle-xmark"></i>
                    </span>
                    <h2>Are you sure?</h2>
                    <p>Do you really want to delete this post?</p>
                    <div id="modal-btns">
                      <button class="modal-cancel-btn">Cancel</button>
                      <button data-id=${id} class="modal-delete-btn">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <div class="post-feed">
            <div class="post-overlays">
              <div class="share-window">
                <h1 class="title">share the post with others</h1>
                <div class="share-link-container">
                  <input type="text" class="share-link-id" value="https://devgram-app.netlify.app" disabled>
                  <button class="copy-btn">copy</button>
                </div>
              </div>
            </div>
            <div class="post-img-container">
              <p class="post-des">${description}</p>
              <div class="edit-buttons">
                <button class="cancel-edit-btn">Cancel</button>
                <button data-id=${id} class="save-edit-btn">Save</button>
              </div>
            </div>
          </div>
          <div class="post-detail">
            <div class="detail-intracables">
             <div class="detail-intracables-likes" data-like=${id}>
                  <img src=${redHeart} class="like-icon" alt="heart">
               <div class="detail-intrancables-likes-position">
                  <img id="like" src=${heartNoFill} class="like-btn" alt="heart">
                  <img id="liked" src=${redHeart} class="small-like-icon" alt="heart">
                </div>
               </div>
                <img src=${sendNoFill} class="send-btn" alt="send">
                <img src=${commentNoFill} class="comment-btn" alt="comment">
              </div>
              <span class="likes">${likes} likes</span>
              <div class="comment-box">
                <input type="text" id="comment-input" placeholder="Add a comment">
                <button class="add-comment-btn"><img src=${commentNoFill} alt="comment"></button>
              </div>
              <span class="comment-count">300 comments</span>
            </div>
    `;
  return post;
};

export const homeLogic = () => {
  const postContainer = document.querySelector('.post-container');
  const createPostButton = document.getElementById('create-post-button');
  const homeCreatePost = document.getElementById('home-create-post');
  const homeFormCreatePost = document.getElementById('home-form-create-post');
  const profilePhotoHomePost = document.getElementById('profilePhotoHomePost');
  const profilePhotoHeader = document.getElementById('profilePhotoHeader');
  let photoProfile = 'https://cdn-icons-png.flaticon.com/512/3088/3088877.png';

  createPostButton.addEventListener('click', async (e) => {
    e.preventDefault();
    if (homeCreatePost.value.trim().length !== 0) {
      // const dateTime = new Date().toLocaleTimeString([], {
      //   year: 'numeric',
      //   month: 'numeric',
      //   day: 'numeric',
      //   hour: '2-digit',
      //   minute: '2-digit',
      // });
      let profession = '';
      let languages = '';
      if (auth.currentUser) {
        const docSnap = await docGetProfile(auth.currentUser.uid);
        if (auth.currentUser.providerData[0].providerId === 'google.com') {
          photoProfile = auth.currentUser.photoURL;
        }
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
          photoProfile,
        );
      }
    }
    homeFormCreatePost.reset();
  });
  // querysnapshot son los documentos de firebase (es el post)
  seePost((querysnapshot) => {
    if (auth.currentUser.providerData[0].providerId === 'google.com') {
      profilePhotoHomePost.src = auth.currentUser.photoURL;
      profilePhotoHeader.src = auth.currentUser.photoURL;
    }
    postContainer.innerHTML = '';
    querysnapshot.forEach((doc) => {
      let profession = '';
      let languages = '';
      let nameUser = auth.currentUser.displayName;
      if (auth.currentUser) {
        const timeAll = doc.data().time.toDate().toLocaleTimeString([], {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });
        docGetProfile(auth.currentUser.uid)
          .then((docSnap) => {
            if (docSnap.exists()) {
              profession = docSnap.data().profession;
              languages = docSnap.data().languages;
              nameUser = docSnap.data().nameUser;
            }
            // si el usuario es el mismo entonces puede realizar cambios en cada uno de sus posts
            if (doc.data().idUser === auth.currentUser.uid) {
              updatePostFields(doc.id, { languages, profession, nameUser });
            }
          })
          .catch((error) => {
            console.log(error);
          });
        // agregando layout por cada post
        postContainer.appendChild(
          homeLayoutPost(
            doc.id,
            doc.data().description,
            doc.data().nameUser,
            doc.data().profession,
            doc.data().languages,
            timeAll,
            doc.data().photoProfile,
            doc.data().likes.length,
          ),
        );
      }
    });
    const modalDeleteBtn = document.querySelectorAll('.modal-delete-btn');
    modalDeleteBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        deletePost(btn.dataset.id);
      });
    });

    const saveEditBtn = document.querySelectorAll('.save-edit-btn');
    saveEditBtn.forEach((btn) => {
      const postUpdateText = btn.parentElement.previousElementSibling;
      btn.addEventListener('click', () => {
        editPost(btn.dataset.id, { description: postUpdateText.innerHTML });
      });
    });

    // ***************************************************************
    // adding likes
    const likeBtn = document.querySelectorAll('.detail-intracables-likes');
    likeBtn.forEach((btn) => {
      const smallLikeIcon = btn.querySelector('.small-like-icon');
      const likeIcon = btn.querySelector('.like-icon');
      btn.addEventListener('click', () => {
        docGetPost(btn.dataset.like).then((docSnap) => {
          if (docSnap.data().likes.includes(auth.currentUser.uid)) {
            removingLikes(btn.dataset.like, auth.currentUser.uid);
          } else {
            likeIcon.classList.add('show');
            setTimeout(() => {
              likeIcon.classList.remove('show');
              addingLikes(btn.dataset.like, auth.currentUser.uid);
            }, 2000);
          }
        });
      });
      docGetPost(btn.dataset.like).then((docSnap) => {
        if (docSnap.data().likes.includes(auth.currentUser.uid)) {
          smallLikeIcon.classList.add('show');
        } else {
          smallLikeIcon.classList.remove('show');
        }
      });
    });
  });

  // ********************************************************************************

  postContainer.addEventListener('click', (e) => {
    const modalContainer = document.querySelectorAll('#modal-container');
    const selectDropdown = document.querySelectorAll('.select-dropdown');
    const selectBtn = document.querySelectorAll('.select-btn');
    const selectEdit = document.querySelectorAll('.dropdown-edit');
    // const selectEditIcon
    // const selectEditA
    const selectPredelete = document.querySelectorAll('.select-predelete');
    const selectPredeleteIcon = document.querySelectorAll(
      '.select-predelete-icon',
    );
    const selectPredeleteA = document.querySelectorAll('.select-predelete-a');
    const cancelEditBtn = document.querySelectorAll('.cancel-edit-btn');
    for (let i = 0; i < selectDropdown.length; i++) {
      if (e.target === selectBtn[i]) {
        selectDropdown[i].classList.toggle('show-post-actions');
      }
    }

    for (let i = 0; i < selectPredelete.length; i++) {
      if (
        e.target === selectPredelete[i]
        || e.target === selectPredeleteIcon[i]
        || e.target === selectPredeleteA[i]
      ) {
        modalContainer[i].style.display = 'flex';
      }
    }

    // ********************************************************
    // show big heart and share link
    const homePost = postContainer.querySelectorAll('.post');
    const shareWindow = postContainer.querySelectorAll('.share-window');
    const shareBtn = postContainer.querySelectorAll('.send-btn');
    const postLink = postContainer.querySelectorAll('.share-link-id');
    const copyBtn = postContainer.querySelectorAll('.copy-btn');
    for (let i = 0; i < homePost.length; i++) {
      // adding share for each Post and copying to clipboard
      if (e.target === shareBtn[i]) {
        shareWindow[i].classList.toggle('active');
      }
      if (e.target === copyBtn[i]) {
        navigator.clipboard.writeText(postLink[i].value).then(() => {
          shareBtn[i].click();
        });
      }
    }
    // for modal window
    for (let i = 0; i < selectPredelete.length; i++) {
      if (e.target.matches('.modal-cancel-btn')) {
        modalContainer[i].style.display = 'none';
      }
    }

    for (let i = 0; i < selectEdit.length; i++) {
      if (
        e.target === selectEdit[i]
        || e.target === selectEdit[i].children[0]
        || e.target === selectEdit[i].children[1]
      ) {
        const postDes = document.querySelectorAll('.post-des');
        postDes[i].setAttribute('contenteditable', true);
        postDes[i].classList.add('editable');
        const saveEdit = document.querySelectorAll('.save-edit-btn');
        saveEdit[i].classList.add('show');
        const cancelEdit = document.querySelectorAll('.cancel-edit-btn');
        cancelEdit[i].classList.add('show');
      }
    }

    for (let i = 0; i < cancelEditBtn.length; i++) {
      if (e.target === cancelEditBtn[i]) {
        const postDes = document.querySelectorAll('.post-des');
        postDes[i].setAttribute('contenteditable', false);
        postDes[i].classList.remove('editable');
        const saveEdit = document.querySelectorAll('.save-edit-btn');
        saveEdit[i].classList.remove('show');
        const cancelEdit = document.querySelectorAll('.cancel-edit-btn');
        cancelEdit[i].classList.remove('show');
        window.location.reload();
      }
    }
  });
  // cierre del click post container

  // close post dropdown menu
  window.onclick = (event) => {
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
  });
}; // final de la funcion homeLogic
