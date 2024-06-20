import {getPictures} from './data.js';
import { pictureUpload } from './picture-upload.js';
import { renderPictures } from './render-pictures.js';

renderPictures(getPictures(25));
pictureUpload();
