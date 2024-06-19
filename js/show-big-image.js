const bigPictureContainer = document.querySelector('.big-picture');
const bigPicture = document.querySelector('.big-picture__img').querySelector('img');
const commentTemplate = bigPictureContainer.querySelector('.social__comment');
const commentList = bigPictureContainer.querySelector('.social__comments');
const commentCount = document.querySelector('.social__comment-count');
const imageLoader = document.querySelector('.comments-loader');
const escButton = document.querySelector('.big-picture__cancel');

const closeBigPicture = () => {
  document.body.classList.remove('modal-open');
  bigPictureContainer.classList.add('hidden');
};

const checkPressEsc = (e) => {
  if (e.key === 'Escape') {
    e.preventDefault();
    closeBigPicture();
  }
};

const renderComment = ({avatar, name, message}) => {
  const commentElement = commentTemplate.cloneNode(true);
  commentElement.src = avatar;
  commentElement.alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};

const renderCommentsList = (comments) => {
  commentList.innerHTML = '';
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    fragment.append(renderComment(comment));
  });

  commentList.append(fragment);
};

const renderPictureDetails = ({url, likes, comments, description}) => {
  bigPicture.src = url;
  bigPictureContainer.querySelector('.likes-count').textContent = likes;
  bigPictureContainer.querySelector('.comments-count').textContent = comments.length;
  bigPictureContainer.querySelector('.social__caption').textContent = description;
  commentCount.classList.add('hidden');
  imageLoader.classList.add('hidden');
};

const showBigImage = (picture) => {
  renderCommentsList(picture.comments);
  bigPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  escButton.addEventListener('click', closeBigPicture, {once: true});
  document.addEventListener('keydown', checkPressEsc, {once: true});
  renderPictureDetails(picture);
};

export {showBigImage};
