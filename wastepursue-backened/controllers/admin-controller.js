const Product = require("../models/product-model");
const cloudinary = require("cloudinary").v2;
const User= require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin =require("../models/admin-model");



const getUser = async (req, res) => {
  try {
    const user = await User.find({isAdmin:false});
    console.log(user,'userdetails');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};



const getUseradmin = async (req, res) => {
  try {
    const user = await User.find({isAdmin:true});
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};





const updateUserStatusblock = async (req, res) => {
  // console.log('called is herere');
  const userId = req.params.id;
  const status = req.params.status; //to remove  the another api for bolck or un block
  

  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
     user.isStatus=status
    // user.isStatus = true;

    user = await user.save();

    res.json({ message: "User status updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};



// const updateUserStatusunblocked = async (req, res) => {
//   const userId = req.params.id;
  

//   try {
//     let user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.isStatus = false;

//     user = await user.save();

//     res.json({ message: "User status updated successfully", user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };







const createProducts = async (req, res) => {
  try {
    const { name, category, price, description, quantity } = req.body;
    console.log(req.body, req.files, req.image, "4487487y84");
    if (!req.files) {
      return res.status(400).json({ error: "No image uploaded" });
    }
    // console.log(
    //   req.files.image.tempFilePath,

    //   "<<these are files"
    // );

    const cloudinaryResponse = await cloudinary.uploader.upload(
      req.files.image.tempFilePath
    );
    console.log(cloudinaryResponse, "<<<<<imageuri");

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

const addProduct = async (req, res) => {
  // console.log(req.body, "fhhjdbdhbhjdbcdvcccccccccccc");
  const { id, quantity } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.stock += quantity;

    await product.save();

    res.json({ message: "Product quantity updated successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  console.log(req.body,'pbodyu');
  const { name, price, description, quantity, category } = req.body;

  try {
    let product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
  console.log(req.files,'file is here');
    if (req.files && req.files.image) {
      const image = req.files.image;
      const cloudinaryResponse = await cloudinary.uploader.upload(
        image.tempFilePath
      );
      // console.log(cloudinaryResponse.url,'urlrishere');
      product.url = cloudinaryResponse.url;
    }

    product.name = name;
    product.price = price;
    product.description = description;
    product.quantity = quantity;
    product.category = category;
    // console.log(product,'productDetails====>>>>');

    product = await product.save();

    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
module.exports = {
  deleteProduct,
  updateProduct,
  addProduct,
  createProducts,
   getUser,
   updateUserStatusblock,
  getUseradmin,
};
