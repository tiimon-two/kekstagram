import {getPictures} from './data.js';
import { pictureUpload } from './picture-upload.js';
import { renderPictures } from './render-pictures.js';
import { slider } from './slider.js';

renderPictures(getPictures(25));
pictureUpload();
// slider();
