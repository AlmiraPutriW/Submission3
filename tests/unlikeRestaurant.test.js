import LikeButtonInitiator from '../src/scripts/utils/like-button-initiator';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Unliking A Restaurant', () => {
  const setupLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  const addRestaurantToFavorites = async () => {
    // Menambahkan restoran ke daftar favorit
    await FavoriteRestaurantIdb.putRestaurant({ id: 'restaurant-123' });
  };

  beforeEach(async () => {
    setupLikeButtonContainer();
    await addRestaurantToFavorites(); // Menambahkan restoran ke daftar favorit sebelum pengujian
  });

  afterEach(async () => {
    // Menghapus restoran dari daftar favorit setelah pengujian
    await FavoriteRestaurantIdb.deleteRestaurant('restaurant-123');
  });

  it('should display the unlike button when the restaurant has been liked', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: { id: 'restaurant-123' },
    });

    const unlikeButton = document.querySelector('[aria-label="unlike this restaurant"]');
    expect(unlikeButton).toBeTruthy(); // Memastikan tombol unlike ditampilkan
  });

  it('should not display the like button when the restaurant has been liked', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: { id: 'restaurant-123' },
    });

    const likeButton = document.querySelector('[aria-label="like this restaurant"]');
    expect(likeButton).toBeFalsy(); // Memastikan tombol like tidak ditampilkan
  });

  it('should be able to remove the liked restaurant from favorites', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: { id: 'restaurant-123' },
    });

    const unlikeButton = document.querySelector('[aria-label="unlike this restaurant"]');
    unlikeButton.dispatchEvent(new Event('click')); // Simulasikan klik tombol unlike

    const allFavoriteRestaurants = await FavoriteRestaurantIdb.getAllRestaurant();
    expect(allFavoriteRestaurants).toEqual([]); // Memastikan restoran telah dihapus dari favorit
  });

  it('should not throw an error when the unliked restaurant is not in the list', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: { id: 'restaurant-123' },
    });

    await FavoriteRestaurantIdb.deleteRestaurant('restaurant-123'); // Hapus restoran terlebih dahulu

    const unlikeButton = document.querySelector('[aria-label="unlike this restaurant"]');
    unlikeButton.dispatchEvent(new Event('click')); // Simulasikan klik tombol unlike

    const allFavoriteRestaurants = await FavoriteRestaurantIdb.getAllRestaurant();
    expect(allFavoriteRestaurants).toEqual([]); // Pastikan tidak ada restoran dalam daftar favorit
  });
});
