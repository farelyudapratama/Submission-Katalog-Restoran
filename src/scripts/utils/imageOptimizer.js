const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const optimizeImage = async (inputPath, outputPath) => {
  try {
    await sharp(inputPath)
      .resize({ width: 800 })
      .jpeg({ quality: 80 })
      .toFile(outputPath);

    console.log(`Image optimized: ${outputPath}`);
  } catch (error) {
    console.error(`Error optimizing image: ${error}`);
  }
};

const inputDir = path.join(__dirname, '../../public/images/heros');
const outputDir = path.join(__dirname, '../../public/images/optimized');

fs.readdir(inputDir, (err, files) => {
  if (err) throw err;

  files.forEach(file => {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);

    optimizeImage(inputPath, outputPath);
  });
});
