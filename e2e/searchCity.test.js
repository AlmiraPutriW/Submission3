/* eslint-disable no-undef */
const assert = require('assert');

Feature('Searching Restaurants by City');

Before(({ I }) => {
  I.amOnPage('/#/favorite'); // Pastikan tidak ada restoran favorit
});

Scenario('should allow searching restaurants by city', async ({ I }) => {
  // Buka halaman utama
  I.amOnPage('/#/beranda');

  // Pastikan input pencarian ada
  I.waitForElement('#search-input', 5); // Ganti dengan selector input pencarian yang sesuai
  I.seeElement('#search-input');

  // Isi input pencarian dengan nama kota
  const searchCity = 'Malang'; // Ganti dengan nama kota yang ada di data restoran Anda
  I.fillField('#search-input', searchCity); // Mengisi input pencarian

  // Klik tombol pencarian
  I.click('.search-btn'); // Ganti dengan selector tombol pencarian yang sesuai

  // Tunggu hasil pencarian
  I.waitForElement('.restaurant-item__content', 10); // Menunggu hasil restoran muncul

  // Verifikasi hasil pencarian
  const visibleRestaurants = await I.grabNumberOfVisibleElements('.restaurant-item__content');
  assert(visibleRestaurants > 0, 'Restoran ditemukan berdasarkan kota pencarian.');

  // Ambil nama restoran pertama yang ditemukan
  const firstRestaurantCity = await I.grabTextFrom(locate('.city').first());

  // Gunakan .replace() untuk menghapus bagian 'City: ' dari teks
  const cleanedCityText = firstRestaurantCity.replace('City: ', '').trim();

  // Lakukan verifikasi dengan teks yang diharapkan
  // eslint-disable-next-line max-len
  assert.strictEqual(cleanedCityText.toLowerCase(), searchCity.toLowerCase()); // Verifikasi kota restoran yang ditemukan
});
