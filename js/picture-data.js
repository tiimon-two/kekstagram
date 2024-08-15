import { filters } from './filrers.js';
import { renderPictures } from './render-pictures.js';

const getData = async () => {
  fetch('https://25.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) =>  response.json())
    .then((data) => {
      renderPictures(data);
      filters(data);
    });
};

const sendData = async (onSucess, onFail, data) => {
  try {
    const response = await fetch(
      'https://25.javascript.htmlacademy.pro/kekstagram',
      {
        method: 'POST',
        body: data,
      }
    );

    if (!response.ok) {
      throw new Error('Не удалось отправить форму. Попробуйте ещё раз');
    }

    onSucess();
  } catch (error){
    onFail();
  }
};

export {getData, sendData};
