import {getRandomPositiveInt, getRandomArrayElement} from './util.js';

const COMMENTS_COUNT = 3;
const DESCRIPTIONS = ['Озеро', 'Лес', 'Солнечный день', 'Парк', 'Лунная ночь'];
const COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const names = ['Артём', 'Сева', 'Любава', 'Добрыня', 'Семён'];

const getUniqueId = (max) => {
  const previousValues = [];

  return function () {
    let id = getRandomPositiveInt(1, max);

    if (previousValues.length >= max) {
      return null;
    }

    while (previousValues.includes(id)) {
      id = getRandomPositiveInt(1, max);
    }

    previousValues.push(id);

    return id;
  };
};

const commentId = getUniqueId(135);

const createComment = () => ({
  id: commentId(),
  avatar: `img/avatar-${getRandomPositiveInt(1, 6)}.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(names),
});

const getComments = () => {
  const commentsArray = Array.from({length: COMMENTS_COUNT}, createComment);
  return commentsArray;
};

const pictureId = getUniqueId(25);

const createPicture = () => {
  const id = pictureId();
  const picture = {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomPositiveInt(15, 200),
    comments: getComments(),
  };

  return picture;
};

const getPictures = (count) => {
  const pictures = Array.from({length: count}, createPicture);
  return pictures;
};

export {getPictures};
