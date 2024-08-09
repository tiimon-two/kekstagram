import { escButtonHandler } from './util.js';

const bigPictureContainer = document.querySelector('.big-picture');
const bigPicture = document.querySelector('.big-picture__img').querySelector('img');
const commentTemplate = bigPictureContainer.querySelector('.social__comment');
const commentList = bigPictureContainer.querySelector('.social__comments');
const commentCount = document.querySelector('.social__comment-count');
const imageLoader = document.querySelector('.comments-loader');
const escButton = document.querySelector('.big-picture__cancel');

let commentsCallback;

const renderComment = ({avatar, name, message}) => {
  const commentElement = commentTemplate.cloneNode(true);
  commentElement.src = avatar;
  commentElement.alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};

const renderCommentsList = (comments, count) => {
  commentList.innerHTML = '';
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    fragment.append(renderComment(comments[i]));
  }

  commentList.append(fragment);
};


const getAnohterComments = (comments, count) => {
  renderCommentsList(comments, count);
  commentCount.innerHTML = `${count} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const closeBigPicture = () => {
  document.body.classList.remove('modal-open');
  bigPictureContainer.classList.add('hidden');
  escButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', closeButtonHandler);
  imageLoader.removeEventListener('click', commentsCallback);
};

function closeButtonHandler  (e) {
  if (escButtonHandler(e)) {
    e.preventDefault();
    closeBigPicture();
  }
}

const renderPictureDetails = ({url, likes, comments, description}, count) => {
  bigPicture.src = url;
  bigPictureContainer.querySelector('.likes-count').textContent = likes;
  bigPictureContainer.querySelector('.comments-count').textContent = comments.length;
  bigPictureContainer.querySelector('.social__caption').textContent = description;
  commentCount.querySelector('.comments-count').textContent = comments.length;
  commentCount.innerHTML = `${count} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const showBigImage = (picture) => {
  let count = picture.comments.length >= 5 ? 5 : picture.comments.length;
  renderCommentsList(picture.comments, count);
  bigPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  escButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', closeButtonHandler);
  renderPictureDetails(picture, count);
  imageLoader.classList.remove('hidden');
  if ((picture.comments.length - count) === 0) {
    imageLoader.classList.add('hidden');
  } else {
    imageLoader.classList.remove('hidden');
  }
  commentsCallback = () => {
    if (picture.comments.length - (count + 5) >= 0) {
      count += 5;
    } else {
      count += picture.comments.length - count;
    }
    if (picture.comments.length - count === 0) {
      imageLoader.classList.add('hidden');
    } else {
      imageLoader.classList.remove('hidden');
    }
    getAnohterComments(picture.comments, count);
  };
  imageLoader.addEventListener('click', commentsCallback);
};

export {showBigImage};
