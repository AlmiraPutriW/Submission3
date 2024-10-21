/* eslint-disable no-undef */
const assert = require('assert');

Feature('Adding Customer Reviews');

Before(({ I }) => {
  // Membuka halaman detail restoran tertentu sebelum setiap skenario dijalankan
  I.amOnPage('/#/detail/s1knt6za9kkfw1e867'); // Ganti '/1' dengan ID restoran yang sesuai jika diperlukan
});

Scenario('should allow adding and displaying customer reviews correctly', async ({ I }) => {
  // Tunggu hingga elemen review muncul
  I.waitForElement('#pendapat', 5);
  I.seeElement('#pendapat'); // Pastikan bagian ulasan muncul

  // Isi input nama dan review
  const reviewerName = 'John Doe'; // Pastikan nama yang diinput sesuai
  const reviewText = 'Makanan enak dan pelayanan sangat baik.';

  I.fillField('.namereviewer', reviewerName); // Isi nama reviewer
  I.fillField('.inputreview', reviewText); // Isi teks review

  // Klik tombol untuk mengirim ulasan
  I.click('.kirim-ulasan');

  // Tunggu hingga ulasan terkirim, kemudian refresh halaman
  I.wait(3); // Tambahkan sedikit jeda jika diperlukan sebelum refresh
  I.refreshPage(); // Refresh halaman

  // Tunggu elemen ulasan muncul kembali setelah refresh
  I.waitForElement('.container-ulasan .card', 5); // Tunggu elemen ulasan baru muncul setelah refresh
  I.seeElement('.container-ulasan .card');

  // Verifikasi bahwa ulasan yang baru ditambahkan benar-benar ditampilkan setelah refresh
  const lastReviewName = await I.grabTextFrom(locate('.container-ulasan .card h3').last());
  const lastReviewText = await I.grabTextFrom(locate('.container-ulasan .card h4').last());

  // Assert bahwa ulasan terakhir sesuai dengan yang diinputkan
  assert.strictEqual(lastReviewName, `Nama : ${reviewerName}`);
  assert.strictEqual(lastReviewText, `"${reviewText}"`);
});
