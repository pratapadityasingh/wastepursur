const Product = require("../models/product-model.js");
const cloudinary = require("cloudinary").v2;

const createProduct = async (req, res) => {
  try {
    const { name, category, price, description,quantity } = req.body;
    // console.log(req.body, req.files, req.image, "4487487y84");
    if (!req.files) {
      return res.status(400).json({ error: "No image uploaded" });
    }
    console.log(
      req.files.image.tempFilePath,
      // req.files.path,
      "<<these are files"
    );

    const cloudinaryResponse = await cloudinary.uploader.upload(
      req.files.image.tempFilePath
    );
    // console.log(cloudinaryResponse, "<<<<<imageuri");
   
    const url = cloudinaryResponse.url;
    const newProduct = await Product.create({
      name,
      category,
      price,
      description,
      url,
      quantity,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.log("Error at product controler");
    res.status(400).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const updateProductById = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  
};
