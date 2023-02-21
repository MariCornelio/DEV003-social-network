import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/model/firebase.js';

const modalContainer = document.getElementById('modal-container');
function closeModal() {
  modalContainer.innerHTML = '';
  modalContainer.style.display = 'none';
}

export const postActions = {
  dropdownMenu: (e, postId) => {
    if (e.target.matches(`#btn-${postId}`)) {
      document
        .getElementById(`myDropdown-${postId}`)
        .classList.toggle('show-post-actions');
    }
    if (!e.target.matches('.post-actions')) {
      const dropdowns = document.getElementsByClassName('dropdown-content');
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show-post-actions')) {
          openDropdown.classList.remove('show-post-actions');
        }
      }
    }
  },
  preDeletePost: (e, postId) => {
    if (e.target.closest(`#delete-${postId}`)) {
      modalContainer.innerHTML = `
      <div id="modal">
      <div id="modal-content">
      <span style="font-size: 3em; color: Tomato;">
        <i class="fa-regular fa-circle-xmark"></i>
      </span>
      <h2>Are you sure?</h2>
      <p>Do you really want to delete this post?</p>
      <div id="modal-btns">
        <button class="modal-cancel-btn">Cancel</button>
        <button class="modal-delete-btn" id="confirm-delete-${postId}">Delete</button>
      </div>
    </div>
    </div>
      `;
      modalContainer.style.display = 'flex';
    }
  },
  deletePost: async (e, postId) => {
    if (e.target.matches(`#confirm-delete-${postId}`)) {
      await deleteDoc(doc(db, 'Posts', `${postId}`));
      closeModal();
    }
  },
  cancelDelete: (e) => {
    if (
      // eslint-disable-next-line operator-linebreak
      e.target.matches('.modal-cancel-btn')
    ) {
      closeModal();
    }
  },
  giveLike: (e, postId) => {
    const likeImg = document.querySelector(`#liked-${postId}`);
    if (e.target.matches(`#like-${postId}`)) {
      if (!likeImg.classList.contains('show')) {
        likeImg.classList.add('show');
      } else {
        likeImg.classList.remove('show');
      }
    }
  },
};
