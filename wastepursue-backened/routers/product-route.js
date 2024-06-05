const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/product-controller");
const multer = require("multer");
const { verifyToken } = require("../controllers/user-controllers");

router.post("/create", createProduct);
router.get("/getproduct",getAllProducts);
router.get("/getbyidproduct/:id", getProductById);
router.put("/getbyidssproducts/:id", updateProductById);


module.exports = router;
