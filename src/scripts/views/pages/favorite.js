import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { createRestaurantItemTemplate, createUnavailableFavorite } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `     
         <div class="content">
        <h2 class="content__heading" id="maincontent">Daftar Restaurant Favorite</h2>
        <div id="restaurants" class="restaurants">
        </div>
      </div>`;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurant();
    const restaurantContainer = document.querySelector('#restaurants');
    if (restaurants.length === 0) {
      restaurantContainer.innerHTML = createUnavailableFavorite();
    } else {
      restaurants.forEach((restaurant) => {
        restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
    }
  },
};

export default Favorite;
