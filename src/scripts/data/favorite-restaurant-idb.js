import { openDB } from 'idb';
import CONFIG from '../globals/config';

if (typeof structuredClone === 'undefined') {
  global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    if (!database.objectStoreNames.contains(OBJECT_STORE_NAME)) {
      database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
    }
  },
});

const FavoriteRestaurantIdb = {
  async getRestaurant(id) {
    if (!id) {
      return null; // Menghindari return value yang tidak diinginkan
    }
    try {
      return (await dbPromise).get(OBJECT_STORE_NAME, id);
    } catch (error) {
      console.error('Failed to get restaurant from IDB:', error);
      return null;
    }
  },

  async getAllRestaurant() {
    try {
      return (await dbPromise).getAll(OBJECT_STORE_NAME);
    } catch (error) {
      console.error('Failed to get all restaurants from IDB:', error);
      return [];
    }
  },

  async putRestaurant(restaurant) {
    if (!restaurant.id) {
      console.error('Restaurant object does not have an id:', restaurant);
      return null;
    }

    try {
      console.log('Storing restaurant:', restaurant); // Debugging log
      return (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
    } catch (error) {
      console.error('Error in putRestaurant:', error);
      return null;
    }
  },

  async deleteRestaurant(id) {
    if (!id) {
      console.error('Invalid ID for deletion:', id);
      return null;
    }

    try {
      console.log('Deleting restaurant with id:', id); // Debugging log
      return (await dbPromise).delete(OBJECT_STORE_NAME, id);
    } catch (error) {
      console.error('Error deleting restaurant from IDB:', error);
      return null;
    }
  },
  async searchRestaurant(query) {
    return (await this.getAllRestaurant()).filter((restaurant) => {
      const loweredCaseRestaurantName = (restaurant.name || '-').toLowerCase();
      const jammedRestaurantName = loweredCaseRestaurantName.replace(/\s/g, '');

      const loweredCaseQuery = query.toLowerCase();
      const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

      return jammedRestaurantName.indexOf(jammedQuery) !== -1;
    });
  },
};
export default FavoriteRestaurantIdb;
