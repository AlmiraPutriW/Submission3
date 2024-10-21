import CONFIG from '../../globals/config';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const createRestaurantDetailTemplate = (restaurant) => `
  <img id="maincontent" alt="Gambar Restaurant ${restaurant.name}" class="img-detail lazyload" data-src="${CONFIG.BASE_IMAGE_URL}${restaurant.pictureId}" tabindex="0" loading="lazy"></img>
  <hr/>
  <div id="restaurant-info">
  <h2 tabindex="0">${restaurant.name}</h2> <h3 tabindex="0">⭐️${restaurant.rating}</h3>
  <p tabindex="0">${restaurant.address} | ${restaurant.city}</p>
  <p tabindex="0">${restaurant.description}</p>
  </div>
  <hr/>
  <div id="menu-info">
  <h2 tabindex="0">Menu</h2>
  <div class="menu">
  <ul tabindex="0">
  <h3 tabindex="0">Minuman</h3>
  ${restaurant.menus.drinks.map((key) => (
    `<li tabindex="0">${key.name}</li>`
  )).join('')}
</ul>
<ul tabindex="0">
<h3 tabindex="0">Makanan</h3>
  ${restaurant.menus.foods.map((key) => (
    `<li tabindex="0">${key.name}</li>`
  )).join('')}
</ul>
</div>
</div>
<hr/>
<div id="section-ulasan">
<h3 tabindex="0"> Review </h3>
<div class="container-ulasan">
${restaurant.customerReviews.map((key) => (
    `<div class="card">
  <h3 tabindex="0">Nama : ${key.name}</h3>
  <h4 tabindex="0">"${key.review}"</h4>
  <p tabindex="0">Tanggal : ${key.date}</p>
  </div>  
  `
  )).join('')}
  </div>
</div>
<hr/>
<div id="pendapat">
<h3 tabindex="0"> Ulasan Kamu </h3>
<form> 
<input type="text" class="namereviewer" placeholder="Nama" required tabindex="0"></input>
<textarea type="text" class="inputreview" placeholder="Ulasan Misal : Makanan Nya enak" required tabindex="0"></textarea>
<button class="kirim-ulasan" aria-label="Kirim Ulasan" tabindex="0">Kirim Ulasan</button>
</form>
</div>
</div>
  </div>
`;

const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-item">
    <div class="restaurant-item__header">
        <img class="restaurant-item__header__poster lazyload" alt="${restaurant.name}"
        data-src="${CONFIG.BASE_IMAGE_URL}${restaurant.pictureId}" tabindex="0" loading="lazy">
        <div >
              <p class="city" tabindex="0">City: ${restaurant.city}</p>
        </div>
    </div>
       <div class="rating">
          <p tabindex="0"><strong>Rating: ⭐</strong> ${restaurant.rating}</p>
       </div>
    <div class="restaurant-item__content">
        <h3 tabindex="0">${restaurant.name}</h3>
        <p tabindex="0">${restaurant.description}</p>
        <button onclick="location.href='${`#/detail/${restaurant.id}`}'" type="button" aria-label="lihat lebih detail" tabindex="0">Lihat</button>
        </div>
  </div>
  `;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like" tabindex="0">
     <i class="fa fa-heart-o" aria-hidden="true" tabindex="0"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like" tabindex="0">
    <i class="fa fa-heart" aria-hidden="true" tabindex="0"></i>
  </button>
`;

const createUnavailableFavorite = () => `
      <div id="UnavailableFavorite" tabindex="0">
      <h1 class="favorite-restaurant-not-found" tabindex="0">Belum Ada Restoran Favorit Kamu</h1>
      </div>
`;

export {
  createRestaurantDetailTemplate,
  createRestaurantItemTemplate,
  createLikedButtonTemplate,
  createLikeButtonTemplate,
  createUnavailableFavorite,
};
