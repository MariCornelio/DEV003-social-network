export const homeLogic = () => {
  const postContainer = document.querySelector('.post-container');
  postContainer.addEventListener('click', e => {
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
  });

  postContainer.addEventListener('click', (e) => {
    // show post dropdown menu
    if (e.target.matches('.post-actions')) {
      document.getElementById('myDropdown').classList.toggle('show-post-actions');
    }
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
  // Redirigiendo a profile
  const headerEditProfile = document.getElementById('header-edit-profile');
  headerEditProfile.addEventListener('click', () => {
    window.location.hash = '#/profile';
  })
};
