import { clearPictures, renderPictures } from './render-pictures.js';
import { getRandomArrayElement } from './util.js';

const filters = (posts) => {
  const imgFilters = document.querySelector('.img-filters');
  imgFilters.classList.remove('img-filters--inactive');
  const defaultFilter = imgFilters.querySelector('#filter-default');
  const randomFilter = imgFilters.querySelector('#filter-random');
  const discussedFilter = imgFilters.querySelector('#filter-discussed');
  let activeFilter = 'filter-default';

  const useDefaultFilter = () => {
    if (activeFilter !== 'filter-default') {
      clearPictures();
      renderPictures(posts);
      activeFilter = 'filter-default';
      randomFilter.classList.remove('img-filters__button--active');
      defaultFilter.classList.add('img-filters__button--active');
      discussedFilter.classList.remove('img-filters__button--active');
    }
  };

  const useRandomFilter = () => {
    const IMG_COUNT = 10;
    clearPictures();
    const currentPosts = [];

    for (let i = 0; i < IMG_COUNT; i++) {
      let post = getRandomArrayElement(posts);
      while (currentPosts.includes(post)) {
        post = getRandomArrayElement(posts);
      }
      currentPosts.push(post);
    }

    renderPictures(currentPosts);
    activeFilter = 'filter-random';
    randomFilter.classList.add('img-filters__button--active');
    defaultFilter.classList.remove('img-filters__button--active');
    discussedFilter.classList.remove('img-filters__button--active');
  };

  const sortByLikes = (postA, postB) => postB.likes - postA.likes;

  const useDiscussedFilter = () => {
    if (activeFilter !== 'filter-dicussed') {
      clearPictures();
      const sortedPosts = posts.slice().sort(sortByLikes);
      renderPictures(sortedPosts);
      activeFilter = 'filter-discussed';
      randomFilter.classList.remove('img-filters__button--active');
      defaultFilter.classList.remove('img-filters__button--active');
      discussedFilter.classList.add('img-filters__button--active');
    }
  };

  defaultFilter.addEventListener('click', useDefaultFilter);
  randomFilter.addEventListener('click', useRandomFilter);
  discussedFilter.addEventListener('click', useDiscussedFilter);
};

export {filters};
