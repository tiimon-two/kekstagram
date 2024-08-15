const checkStringLength = (string, maxLength) => string.length <= maxLength;

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

const escButtonHandler = (e) => e.key === 'Escape';

const getRandomArrayElement = (elements) => elements[getRandomPositiveInt(0, elements.length - 1)];

const debounse = (cb, timeoutDelay = 500) =>  {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => cb.apply (this, rest), timeoutDelay);
  };
};

const trottle = (cb, delayBetweenFrames) => {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();

    if (now - lastTime >= delayBetweenFrames) {
      cb.apply(this, rest);
      lastTime = now;
    }
  };
};

export {checkStringLength, getRandomArrayElement, getRandomPositiveInt, escButtonHandler, debounse, trottle};
