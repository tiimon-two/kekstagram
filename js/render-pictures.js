import { showBigImage } from './show-big-image.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const createPicture = (picture) => {
  const {url, likes, comments} = picture;
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  pictureElement.addEventListener('click', () => {
    showBigImage(picture);
  });

  return pictureElement;
};

const renderPictures = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    fragment.append(createPicture(picture));
  });

  picturesContainer.append(fragment);
};

const clearPictures = () => {
  for (let i = 0; i < picturesContainer.children.length; i++){
    if (picturesContainer.children[i].classList.contains('picture')) {
      picturesContainer.removeChild(picturesContainer.children[i]);
      i--;
    }
  }
};

export {renderPictures, clearPictures};
