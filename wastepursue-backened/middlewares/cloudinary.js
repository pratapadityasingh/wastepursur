const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const { CLOUDINARY_SECRET, CLOUDINARY_KEY, CLOUD_NAME } = process.env;

cloudinary.config({
  secure: true,
  cloud_name: CLOUD_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const uploadOnCloudinary = async (fileData) => {
  try {
    const data = await cloudinary.uploader.upload(fileData.tempFilePath);
    return data.secure_url;
  } catch (error) {
    // console.log(error.message, "<<<<error at cloudinary");
    throw error;
  }
};

module.exports = uploadOnCloudinary;
