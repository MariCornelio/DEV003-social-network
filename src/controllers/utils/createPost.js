import { postActions } from './postActions';

export const createPost = (
  user,
  postContent,
  interactions,
  postId,
  // eslint-disable-next-line comma-dangle
  container
) => {
  document.addEventListener('click', (e) => {
    postActions.dropdownMenu(e, postId);
    postActions.preDeletePost(e, postId);
    postActions.deletePost(e, postId);
    postActions.cancelDelete(e);
    postActions.giveLike(e, postId);
  });

  container.innerHTML += `
<div id="post-${postId}" class="post">
  <div class="post-header">
    <img src="../../assets/feed.jpg" class="user-icon" alt="">
    <div class="post-username-details">
      <p class="username">${user.username}</p>
      <p class="username-position-languages">${user.profession}</p>
      <p class="username-position-languages"><em>${user.languages}</em></p>
      <p class="post-date">2/14/2023</p>
    </div>
    <div class="post-dropdown">
      <button id="btn-${postId}" class="post-actions">...</button>
      <div id="myDropdown-${postId}" class="dropdown-content">
        <div class="dropdown-element">
          <i class="fa-solid fa-pencil"></i>
          <a>Edit</a>
        </div>
        <div class="dropdown-element dropdown-delete" id="delete-${postId}">
          <i class="fa-solid fa-trash-can"></i>
          <a>Delete</a>
        </div>
      </div>
    </div>
  </div>
  <div class="post-feed">
    <div class="post-overlays">
    <div class="share-window">
    <h1 class="title">share the post with others</h1>
    <div class="share-link-container">
    <input type="text" id="share-link" value="https://www.devgram.com/" disabled>
    <button class="copy-btn">copy</button>
    </div>
    </div>
    </div>
    <div class="post-img-container">
    <p class="post-des">${postContent}</p>
    </div>
    </div>
    <div class="post-detail">
    <div class="detail-intracables">
    <img id="like-${postId}" src="./assets/heart-nofill.png" class="like-btn" alt="">
    <img id="liked-${postId}" src="./assets/red-heart.png" class="like-icon" alt="">
      <img src="./assets/send-nofill.png" class="send-btn" alt="">
      <img src="./assets/comment-nofill.png" class="comment-btn" alt="">
    </div>
    <span class="likes">${interactions.likes} likes</span>
    <div class="comment-box">
      <input type="text" id="comment-input" placeholder="Add a comment">
      <button class="add-comment-btn"><img src="./assets/comment-nofill.png" alt=""></button>
    </div>
    <span class="comment-count">${interactions.comments} comments</span>
  </div>
</div>
    `;
};
