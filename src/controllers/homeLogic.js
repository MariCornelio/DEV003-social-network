import { createPost } from './utils/createPost';
import { postDummies } from './utils/postDummies';

export const homeLogic = () => {
  const postContainer = document.querySelector('.post-container');

  createPost(
    postDummies[0].user,
    postDummies[0].postContent,
    postDummies[0].interactions,
    postDummies[0].postId,
    postContainer
  );
  createPost(
    postDummies[1].user,
    postDummies[1].postContent,
    postDummies[1].interactions,
    postDummies[1].postId,
    postContainer
  );
  createPost(
    postDummies[2].user,
    postDummies[2].postContent,
    postDummies[2].interactions,
    postDummies[2].postId,
    postContainer
  );

  const addInteractionsToPost = (post) => {
    // post like
    postContainer.addEventListener('click', (e) => {
      // const likeBtn = post.querySelector('.like-btn');
      // const likeImg = post.querySelector('.like-icon');
      // if (e.target.matches('.like-btn')) {
      //   if (likeBtn.src.includes('nofill')) {
      //     likeImg.classList.add('show');
      //   }
      // setTimeout(() => {
      //   likeImg.classList.remove('show');
      // }, 3000);
      // }
      // post share
      if (e.target.matches('.send-btn')) {
        const shareWindow = post.querySelector('.share-window');
        shareWindow.classList.toggle('active');
      }

      // show post dropdown menu
      // if (e.target.matches('.post-actions')) {
      //   document
      //     .getElementById('myDropdown')
      //     .classList.toggle('show-post-actions');
      // }
      // close post dropdown menu

      // const postMenu = document.querySelector('.post-actions');
      // postMenu.addEventListener('click', () => {
      //   document.getElementById('myDropdown').classList.toggle('show-post-actions');
      // });
    });
  };

  // post
  const posts = [...document.querySelectorAll('.post')];
  posts.map((post) => addInteractionsToPost(post));

  // Redirigiendo a profile
  const headerEditProfile = document.getElementById('header-edit-profile');
  headerEditProfile.addEventListener('click', () => {
    window.location.hash = '#/profile';
  });
};
