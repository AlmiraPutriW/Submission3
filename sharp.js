const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/heros');
const destination = path.resolve(__dirname, 'dist/heros');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}

fs.readdirSync(target)
  .forEach((image) => {
    // Check if the file has a valid image extension
    const validExtensions = ['.jpg', '.png', '.jpeg', '.webp'];
    const extension = path.extname(image).toLowerCase();

    if (validExtensions.includes(extension)) {
      // Valid image extension, proceed with resizing

      // mengubah ukuran gambar dengan lebar 800px, dengan prefix -large.jpg
      sharp(`${target}/${image}`)
        .resize(800)
        .toFile(path.resolve(
          __dirname,
          `${destination}/${image.split('.').slice(0, -1).join('.')}-large.jpg`,
        ))
        .then(() => {
          console.log(`Gambar ${image} berhasil diubah ukurannya menjadi 800px (large).`);
        })
        .catch((err) => {
          console.error(`Gagal mengubah ukuran gambar ${image} menjadi 800px:`, err);
        });

      // mengubah ukuran gambar dengan lebar 480px, dengan prefix -small.jpg
      sharp(`${target}/${image}`)
        .resize(480)
        .toFile(path.resolve(
          __dirname,
          `${destination}/${image.split('.').slice(0, -1).join('.')}-small.jpg`,
        ))
        .then(() => {
          console.log(`Gambar ${image} berhasil diubah ukurannya menjadi 480px (small).`);
        })
        .catch((err) => {
          console.error(`Gagal mengubah ukuran gambar ${image} menjadi 480px:`, err);
        });
    } else {
      console.log(`File ${image} dilewati karena bukan file gambar yang valid.`);
    }
  });
