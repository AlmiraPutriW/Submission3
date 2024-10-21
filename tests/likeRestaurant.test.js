import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import * as TestFactories from './helpers/testFactories';

describe('Liking A Restaurant Feature', () => {
  function setUpLikeButtonContainer() {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  }

  beforeEach(() => {
    setUpLikeButtonContainer();
  });

  afterEach(async () => {
    const favoriteRestaurants = await FavoriteRestaurantIdb.getAllRestaurant();
    favoriteRestaurants.forEach(async (restaurant) => {
      await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id);
    });
  });

  it('should display the like button if the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 'restaurant-123' });

    const likeButton = document.querySelector('[aria-label="like this restaurant"]');
    expect(likeButton).toBeTruthy();
  });

  it('should not display the unlike button if the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 'restaurant-123' });

    const unlikeButton = document.querySelector('[aria-label="unlike this restaurant"]');
    expect(unlikeButton).toBeFalsy();
  });

  it('should be able to like a restaurant', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 'restaurant-123' });

    const likeButton = document.querySelector('#likeButton');
    likeButton.dispatchEvent(new Event('click'));

    const restaurant = await FavoriteRestaurantIdb.getRestaurant('restaurant-123');
    expect(restaurant).toEqual({ id: 'restaurant-123' });
  });

  it('should not add a restaurant again if it is already liked', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 'restaurant-123' });

    // First, add the restaurant to the favorite list
    await FavoriteRestaurantIdb.putRestaurant({ id: 'restaurant-123' });

    // Try liking the restaurant again
    const likeButton = document.querySelector('#likeButton');
    likeButton.dispatchEvent(new Event('click'));

    // Ensure the restaurant is not added again (no duplicates)
    const allFavoriteRestaurants = await FavoriteRestaurantIdb.getAllRestaurant();
    expect(allFavoriteRestaurants).toEqual([{ id: 'restaurant-123' }]);
  });

  it('should not add a restaurant if it does not have an id', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({}); // No id provided

    const likeButton = document.querySelector('#likeButton');
    likeButton.dispatchEvent(new Event('click'));

    const allFavoriteRestaurants = await FavoriteRestaurantIdb.getAllRestaurant();
    expect(allFavoriteRestaurants).toEqual([]); // Ensure no restaurant was added
  });
});
