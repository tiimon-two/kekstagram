const getRandomPositiveInt = (min, max) => {

  if (min === undefined && max === undefined) {
    min = 0;
    max = 1;
  }

  if (max === undefined) {
    max = min;
    min = 0;
  }

  if (!Number.isInteger(min)) {
    min = Number(min);
  }

  if (!Number.isInteger(max)) {
    max = Number(max);
  }

  if (isNaN(min) || isNaN(max)) {
    return 'Не удалось привести введённые данные к числу';
  }

  if (max < 0 || min < 0) {
    return 'Числа должны быть больше 0';
  }

  if (min > max) {
    [max, min] = [min, max];
  }

  return Math.floor(min + Math.random() * (max + 1 - min));
};

const checkStringLength = (string, maxLength) => string.length <= maxLength;

const getRandomArrayElement = (elements) => elements[getRandomPositiveInt(0, elements.length - 1)];

const ids = [];
const PICTURES_COUNT = 25;
const COMMENTS_COUNT = 3;
const descriptions = ['Озеро', 'Лес', 'Солнечный день', 'Парк', 'Лунная ночь'];
const comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const commentsIds = [];
const names = ['Артём', 'Сева', 'Любава', 'Добрыня', 'Семён'];

const getUniqueId = (max, array) => {
  let uniqueId;
  do {
    uniqueId = getRandomPositiveInt(1, max);
  } while (array.includes(uniqueId));
  array.push(uniqueId);

  return uniqueId;
};

const createComment = () => ({
  id: getUniqueId(135, commentsIds),
  avatar: `img/avatar-${getRandomPositiveInt(1, 6)}.svg`,
  message: getRandomArrayElement(comments),
  name: getRandomArrayElement(names),
});

const getComments = () => {
  const commentsArray = Array.from({length: COMMENTS_COUNT}, createComment);
  return commentsArray;
};

const createPicture = () => {
  const id = getUniqueId(25, ids);
  const picture = {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(descriptions),
    likes: getRandomPositiveInt(15, 200),
    comments: getComments(),
  };

  return picture;
};

const getPictures = () => {
  const pictures = Array.from({length: PICTURES_COUNT}, createPicture);
  return pictures;
};

getPictures();

checkStringLength('aaa', 8);
