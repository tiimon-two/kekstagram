function checkStringLength (string, maxLength) {
  return string.length <= maxLength;
}

function getRandomPositiveInt (min, max) {

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
}

function getRandomArrayElement (elements) {
  return elements[getRandomPositiveInt(0, elements.length - 1)];
}

export {checkStringLength, getRandomArrayElement, getRandomPositiveInt};
