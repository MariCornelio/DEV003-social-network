export const homeLogic = () => {
  const addInterationsToPost = (post) => {
    // post like

    let likeBtn = post.querySelector('.like-btn');
    let likeImg = post.querySelector('.like-icon');

    likeBtn.addEventListener('click', () => {
      if (likeBtn.src.includes('nofill')) {
        likeImg.classList.add('show');
        if (shareBtn.src.includes('-fill')) {
          shareBtn.click();
        }
      }

      changeIcon(likeBtn);

      setTimeout(() => {
        likeImg.classList.remove('show');
      }, 3000);
    });

    // post share
    let shareBtn = post.querySelector('.send-btn');
    let shareWindow = post.querySelector('.share-window');

    shareBtn.addEventListener('click', () => {
      shareWindow.classList.toggle('active');
      changeIcon(shareBtn);
    });

    let postLink = post.querySelector('#share-link').value;
    let copyLinkBtn = post.querySelector('.copy-btn');

    copyLinkBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(postLink).then(() => {
        shareBtn.click();
      });
    });
  };

  // post

  let posts = [...document.querySelectorAll('.post')];
  posts.map((post) => addInterationsToPost(post));

  // show post dropdown menu
  const postMenu = document.querySelector('.post-actions');
  postMenu.addEventListener('click', () => {
    document.getElementById('myDropdown').classList.toggle('show-post-actions');
  });

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
};
