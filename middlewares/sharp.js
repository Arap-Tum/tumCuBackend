const sharp = require("sharp");
const cloudinary = require("../config/cloudinary.js");

const processAndUploadImage = async (buffer) => {
  try {
    // commpress and resize image
    const processedBuffer = await sharp(buffer)
      .resize(800, 600, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toBuffer();

    // uppload to cloudinary
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image", folder: "tumcu" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        )
        .end(processedBuffer);
    });
  } catch (error) {
    console.log(`there is an image prosessing error ${error} `);
    throw new Error("Image processing failed");
  }
};

module.exports = processAndUploadImage;
