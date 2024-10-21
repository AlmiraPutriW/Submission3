import { itActsAsFavoriteRestaurantModel } from './contract/favoriteRestaurantContract';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
  afterEach(async () => {
    const allRestaurants = await FavoriteRestaurantIdb.getAllRestaurant();
    // eslint-disable-next-line no-restricted-syntax
    for (const restaurant of allRestaurants) {
      // eslint-disable-next-line no-await-in-loop
      await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id);
    }
  });

  itActsAsFavoriteRestaurantModel(FavoriteRestaurantIdb);
});
