const sharp = require('sharp');

sharp('./icons/HungryBite.jpg')
  .resize(400, 400)
  .toFile('icons/HungryBite_resized.jpg', (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Image resized successfully:', info);
    }
  });
