const effectSlider = document.querySelector('.effect-level__slider');
const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const imageSize = document.querySelector('.scale__control--value');
const img = document.querySelector('.img-upload__preview').querySelector('img');
const effectsList = document.querySelector('.effects__list');
const sliderValue = document.querySelector('.effect-level__value');
imageSize.value = 100;
const STEP = 25;
const DEFAULT_SIZE = 100;
let activeEffect = '';

const slider = () => {
  effectSlider.classList.add('hidden');
  noUiSlider.create(effectSlider, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        return value;
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  });

  effectSlider.noUiSlider.on('update', () => {
    sliderValue.value = effectSlider.noUiSlider.get();
    switch(activeEffect) {
      case 'chrome' : {
        img.style.filter = `grayscale(${effectSlider.noUiSlider.get()})`;
        break;
      }
      case 'sepia' : {
        img.style.filter = `sepia(${effectSlider.noUiSlider.get()})`;
        break;
      }
      case 'marvin' : {
        img.style.filter = `invert(${effectSlider.noUiSlider.get()}%)`;
        break;
      }
      case 'phobos' : {
        img.style.filter = `blur(${effectSlider.noUiSlider.get()}px)`;
        break;
      }
      case 'heat' : {
        img.style.filter = `brightness(${effectSlider.noUiSlider.get()})`;
        break;
      }
    }
  });

  effectsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('effects__radio')) {
      activeEffect = e.target.value;
      img.classList.remove('effects__preview--chrome');
      img.classList.remove('effects__preview--sepia');
      img.classList.remove('effects__preview--marvin');
      img.classList.remove('effects__preview--phobos');
      img.classList.remove('effects__preview--heat');
      img.classList.remove('effects__preview--none');
      if (e.target.value !== 'none') {
        img.classList.add(`effects__preview--${e.target.value}`);
      }
      switch(activeEffect) {
        case 'chrome' : {
          effectSlider.classList.remove('hidden');
          effectSlider.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 1,
            },
            start: 1,
            step: 0.1
          });
          break;
        }
        case 'sepia' : {
          effectSlider.classList.remove('hidden');
          effectSlider.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 1,
            },
            start: 1,
            step: 0.1
          });
          break;
        }
        case 'marvin' : {
          effectSlider.classList.remove('hidden');
          effectSlider.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 100,
            },
            start: 100,
            step: 1
          });
          break;
        }
        case 'phobos' : {
          effectSlider.classList.remove('hidden');
          effectSlider.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 3,
            },
            start: 3,
            step: 0.1
          });
          break;
        }
        case 'heat' : {
          effectSlider.classList.remove('hidden');
          effectSlider.noUiSlider.updateOptions({
            range: {
              min: 1,
              max: 3,
            },
            start: 3,
            step: 0.1
          });
          break;
        }
        case 'none' : {
          effectSlider.classList.add('hidden');
          img.style.filter = '';
          break;
        }
      }
    }
  });
};

const scaleImage = () => {
  img.style.transform = `scale(${imageSize.value / DEFAULT_SIZE})`;
};

smallerButton.addEventListener('click', () => {
  if (imageSize.value > STEP) {
    imageSize.value -= STEP;
    scaleImage();
  }
});

biggerButton.addEventListener('click', () => {
  if (imageSize.value < DEFAULT_SIZE) {
    imageSize.value = Number(imageSize.value) + STEP;
    scaleImage();
  }
});

const resetSlider = () => {
  imageSize.value = DEFAULT_SIZE;
  scaleImage();
};

export {slider, resetSlider};
