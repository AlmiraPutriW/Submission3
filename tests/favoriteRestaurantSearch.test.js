import { spyOn } from 'jest-mock';
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Searching restaurants', () => {
  let presenter;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;

    queryElement.dispatchEvent(new Event('input'));
  };

  const setRestaurantSearchContainer = () => {
    document.body.innerHTML = `
      <div id="restaurant-search-container">
        <input id="query" type="text">
        <div class="restaurant-result-container">
          <ul class="restaurants">
          </ul>
        </div>
      </div>
    `;
  };

  const constructPresenter = () => {
    spyOn(FavoriteRestaurantIdb, 'searchRestaurant');
    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants: FavoriteRestaurantIdb,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  it('should be able to capture the query typed by the user', () => {
    FavoriteRestaurantIdb.searchRestaurant.mockImplementation(() => []);

    searchRestaurants('restaurant a');

    expect(presenter.latestQuery).toEqual('restaurant a');
  });

  it('should ask the model to search for liked restaurants', () => {
    FavoriteRestaurantIdb.searchRestaurant.mockImplementation(() => []);

    searchRestaurants('restaurant a');

    expect(FavoriteRestaurantIdb.searchRestaurant).toHaveBeenCalledWith('restaurant a');
  });

  it('should show the found restaurants', () => {
    presenter._showFoundRestaurants([{ id: 1 }]);
    expect(document.querySelectorAll('.restaurant').length).toEqual(1);

    presenter._showFoundRestaurants([
      { id: 1, name: 'Satu' },
      { id: 2, name: 'Dua' },
    ]);
    expect(document.querySelectorAll('.restaurant').length).toEqual(2);
  });

  it('should show the name of the found restaurants', () => {
    presenter._showFoundRestaurants([
      { id: 1, name: 'Satu' },
    ]);

    expect(document.querySelectorAll('.restaurant__name')
      .item(0).textContent)
      .toEqual('Satu');

    presenter._showFoundRestaurants([
      { id: 1, name: 'Satu' },
      { id: 2, name: 'Dua' },
    ]);

    const restaurantNames = document.querySelectorAll('.restaurant__name');

    expect(restaurantNames.item(0).textContent).toEqual('Satu');
    expect(restaurantNames.item(1).textContent).toEqual('Dua');
  });

  it('should show - for found restaurant without name', () => {
    presenter._showFoundRestaurants([{ id: 1 }]);

    expect(document.querySelectorAll('.restaurant__name')
      .item(0).textContent)
      .toEqual('-');
  });

  it('should show the restaurants found by Favorite Restaurants', (done) => {
    document
      .getElementById('restaurant-search-container')
      .addEventListener('restaurants:searched:updated', () => {
        expect(document.querySelectorAll('.restaurant').length).toEqual(3);

        done();
      });

    FavoriteRestaurantIdb.searchRestaurant.mockImplementation((query) => {
      if (query === 'restaurant a') {
        return [
          { id: 111, name: 'Restaurant A' },
          { id: 222, name: 'Restaurant B' },
          { id: 333, name: 'Restaurant C' },
        ];
      }

      return [];
    });

    searchRestaurants('restaurant a');
  });

  it('should show the name of the restaurants found by Favorite Restaurants', (done) => {
    document
      .getElementById('restaurant-search-container')
      .addEventListener('restaurants:searched:updated', () => {
        const restaurantNames = document.querySelectorAll('.restaurant__name');
        expect(restaurantNames[0].textContent).toEqual('Restaurant A');
        expect(restaurantNames[1].textContent).toEqual('Restaurant B');
        expect(restaurantNames[2].textContent).toEqual('Restaurant C');
        done();
      });

    FavoriteRestaurantIdb.searchRestaurant.mockImplementation((query) => {
      if (query === 'restaurant a') {
        return [
          { id: 111, name: 'Restaurant A' },
          { id: 222, name: 'Restaurant B' },
          { id: 333, name: 'Restaurant C' },
        ];
      }

      return [];
    });

    searchRestaurants('restaurant a');
  });
});
