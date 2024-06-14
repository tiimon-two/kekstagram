import { showBigImage } from './show-big-image.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

function createPicture (picture) {
  const {url, likes, comments} = picture;
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  pictureElement.addEventListener('click', () => {
    showBigImage(picture);
  });

  return pictureElement;
}

function renderPictures (pictures) {
  const picturesContainer = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    fragment.append(createPicture(picture));
  });

  picturesContainer.append(fragment);
}

export {renderPictures};
