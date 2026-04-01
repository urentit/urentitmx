const sharp = require('sharp');

const inputPath = 'C:/Users/Ventas Urent 1/Desktop/proyectos/urentitmx/public/img/v1.png';
const outputPath = 'C:/Users/Ventas Urent 1/Desktop/proyectos/urentitmx/public/img/v1.jpg';

sharp(inputPath)
  .resize({ width: 1200, withoutEnlargement: true })
  .jpeg({ quality: 75, progressive: true })
  .toFile(outputPath)
  .then(info => {
    console.log('Success! Saved as v1.jpg with size:', (info.size / 1024).toFixed(2), 'KB');
  })
  .catch(err => {
    console.error('Error compressing image:', err);
    process.exit(1);
  });
