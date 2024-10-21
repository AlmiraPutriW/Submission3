/* eslint-disable linebreak-style */
import LikeButtonInitiator from '../../src/scripts/utils/like-button-initiator';
import FavoriteRestaurantIdb from '../../src/scripts/data/favorite-restaurant-idb';

// Fungsi ini membuat dan menginisialisasi LikeButton dengan data restoran yang diterima
const createLikeButtonPresenterWithResto = async (restaurant) => {
  // Inisialisasi Like Button dengan elemen yang sudah ada di HTML
  await LikeButtonInitiator.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'), // container dari button
    favoriteResto: FavoriteRestaurantIdb, // database favorit
    restaurant, // objek restoran yang diterima
  });
};

// eslint-disable-next-line import/prefer-default-export
export { createLikeButtonPresenterWithResto };
