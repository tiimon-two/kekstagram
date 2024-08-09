import { sendData } from './picture-data.js';
import { initSizeButton, resetSlider, slider } from './slider.js';

const uploadInput = document.querySelector('#upload-file');
const editForm = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');
const closeFormButton = document.querySelector('#upload-cancel');
const hashtags = document.querySelector('.text__hashtags');
const comment = document.querySelector('.text__description');
const uploadButton = document.querySelector('.img-upload__submit');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessage = successMessageTemplate.cloneNode(true);
const errorMessage = errorMessageTemplate.cloneNode(true);
const successButton = successMessage.querySelector('.success__button');
const errorButton = errorMessage.querySelector('.error__button');

const removeSuccessMessage = () => {
  document.body.removeChild(successMessage);
  document.removeEventListener('keydown', escButtonHandler);
  successButton.removeEventListener('click', removeSuccessMessage);
};

const removeErrorMessage = () => {
  document.body.removeChild(errorMessage);
  document.removeEventListener('keydown', escButtonHandler);
  errorButton.removeEventListener('click', removeErrorMessage);
};

function escButtonHandler (e) {
  if (e.key === 'Escape') {
    if (document.body.contains(successMessage)) {
      removeSuccessMessage();
    } else {
      removeErrorMessage();
    }
  }
}

const onSendDataSuccess = () => {
  uploadForm.reset();
  closeForm();
  document.body.append(successMessage);
  successButton.addEventListener('click', removeSuccessMessage);
  document.addEventListener('keydown', escButtonHandler);
};


const onSendDataError = () => {
  document.body.append(errorMessage);
  errorButton.addEventListener('click', removeErrorMessage);
  document.addEventListener('keydown', escButtonHandler);
};

const submitForm = async (e) => {
  e.preventDefault();
  const data = new FormData(uploadForm);
  await sendData(onSendDataSuccess, onSendDataError, data);
};


const isTextFieldsActive = (e) => e.target === hashtags || e.target === comment;

const checkHashtag = () => {
  const tags = hashtags.value.split(' ');
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  let valid = true;

  for (let i = 0; i < tags.length; i++) {
    for (let j = 0; j <tags.length; j++) {
      if (i !== j) {
        if (tags[i].toLowerCase() === tags[j].toLowerCase()) {
          valid = false;
          hashtags.setCustomValidity('Нельзя указывать одинаковые хэш-теги');
        }
      }
    }

    if (!re.test((tags[i]))) {
      hashtags.setCustomValidity('Хэш-тег должен начинаться с # и содержать до 20 символов (включая #)');
      valid = false;
    }

    if (tags.length > 5) {
      hashtags.setCustomValidity('Нельзя указывать больше пяти хэш-тегов');
      valid = false;
    }
  }
  if (valid) {
    hashtags.setCustomValidity('');
  }

  hashtags.reportValidity();
  uploadButton.disabled = !valid;
};

const checkComment = () => {
  if (comment.value.length > 140) {
    comment.setCustomValidity('Длина комментария не может составлять больше 140 символов');
    uploadButton.disabled = true;
  } else {
    comment.setCustomValidity('');
    uploadButton.disabled = false;
  }
  comment.reportValidity();
};

const openForm = () => {
  initSizeButton();
  editForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeFormButton.addEventListener('click', closeForm);
  uploadForm.addEventListener('submit', submitForm);
  document.addEventListener('keydown', closeButtonHandler);
  hashtags.addEventListener('input', checkHashtag);
  comment.addEventListener('input', checkComment);
};

function closeForm () {
  editForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeFormButton.removeEventListener('click', closeForm);
  uploadForm.removeEventListener('submit', submitForm);
  uploadInput.value = '';
  document.removeEventListener('keydown', closeButtonHandler);
  hashtags.removeEventListener('input', checkHashtag);
  comment.removeEventListener('input', checkComment);
  resetSlider();
}

function closeButtonHandler (e) {
  if (escButtonHandler(e) && !isTextFieldsActive(e)) {
    e.preventDefault();
    closeForm();
    document.removeEventListener('keydown', closeButtonHandler);
  }
}


const pictureUpload = () => {
  uploadInput.addEventListener('input', openForm);
  slider();
};

export {pictureUpload};
