/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('.content__heading');
  I.see('Belum Ada Restoran Favorit Kamu', '.favorite-restaurant-not-found');
});

Scenario('liking one restaurant', async ({ I }) => {
  // Verify no favorite restaurants initially
  I.see('Belum Ada Restoran Favorit Kamu', '.favorite-restaurant-not-found');

  // Open homepage
  I.amOnPage('/');
  I.seeElement('.restaurant-item__content button');
  I.waitForElement('.restaurant-item__content button', 5);
  const firstRestaurantName = await I.grabTextFrom(locate('.restaurant-item__content h3').first());
  I.click(locate('.restaurant-item__content button').first());
  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');
  const likedRestaurantName = await I.grabTextFrom(locate('.restaurant-item__content h3').first());
  assert.strictEqual(firstRestaurantName, likedRestaurantName);
});

Scenario('unliking one restaurant', async ({ I }) => {
  // Go to the favorites page where the liked restaurant should be visible
  I.see('Belum Ada Restoran Favorit Kamu', '.favorite-restaurant-not-found');

  // Navigate to the homepage to like a restaurant first
  I.amOnPage('/');
  I.seeElement('.restaurant-item__content button');
  const firstRestaurantName = await I.grabTextFrom(locate('.restaurant-item__content h3').first());

  // Click to view the restaurant details and like it
  I.click(locate('.restaurant-item__content button').first());
  I.seeElement('#likeButton');
  I.click('#likeButton');

  // Navigate back to favorites and verify restaurant is there
  I.amOnPage('/#/favorite');
  I.waitForElement('.restaurant-item__content h3', 5); // Ensure the restaurant is loaded
  const likedRestaurantName = await I.grabTextFrom(locate('.restaurant-item__content h3').first());
  assert.strictEqual(firstRestaurantName, likedRestaurantName);

  // Now unlike the restaurant
  I.click(locate('.restaurant-item__content button').first());
  I.seeElement('#likeButton');
  I.click('#likeButton');

  // Go back to the favorites page and check if it's removed
  I.amOnPage('/#/favorite');
  I.waitForElement('.favorite-restaurant-not-found', 5); // Ensure the "No favorites" message appears
  I.see('Belum Ada Restoran Favorit Kamu', '.favorite-restaurant-not-found');
});
