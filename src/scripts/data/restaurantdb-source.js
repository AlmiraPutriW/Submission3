import API_ENDPOINT from '../globals/api-endpoint';
import CONFIG from '../globals/config';

class RestaurantDb {
  static async beranda() {
    const response = await fetch(API_ENDPOINT.BERANDA);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    return response.json();
  }

  static async postReview(review) {
    fetch(CONFIG.BASE_URL_REVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    }).then((response) => response.json())
      .then((data) => console.log(data));
  }
}

export default RestaurantDb;
