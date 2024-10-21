import UrlParser from '../../routes/url-parser';
import RestaurantDb from '../../data/restaurantdb-source';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return `
      <div id="restaurant-detail" class="restaurant" tabindex="0"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantDb.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('#restaurant-detail');
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant.restaurant);
    const textReview = document.querySelector('.inputreview');
    const nameReview = document.querySelector('.namereviewer');
    const btnReview = document.querySelector('.kirim-ulasan');
    const skiplink = document.querySelector('.skip-link');
    LikeButtonInitiator.init({
      likeButtonContainer: document.getElementById('likeButtonContainer'),
      restaurant: {
        id: restaurant.restaurant.id,
        name: restaurant.restaurant.name,
        description: restaurant.restaurant.description,
        pictureId: restaurant.restaurant.pictureId,
        city: restaurant.restaurant.city,
        rating: restaurant.restaurant.rating,
        menus: restaurant.restaurant.menus,
        customerReviews: restaurant.restaurant.customerReviews,
        address: restaurant.restaurant.address,
      },
    });

    btnReview.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!(nameReview.value === '' || textReview.value === '')) {
        RestaurantDb.postReview({
          id: restaurant.restaurant.id,
          name: nameReview.value,
          review: textReview.value,
        });
        nameReview.value = '';
        textReview.value = '';
        // eslint-disable-next-line no-alert
        alert('Terimakasih, Ulasan Kamu Sudah Di Tambahkan! ');
      }
    });
    skiplink.addEventListener('click', (e) => {
      const ela = document.getElementById('restaurant-detail');
      ela.focus();
      e.preventDefault();
    });
  },
};

export default Detail;
