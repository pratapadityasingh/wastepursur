const express = require("express");
const router = express.Router();

const {
  deleteProduct,
  updateProduct,
  addProduct,
  createProducts,
  getUser,
  
  updateUserStatusblock,
  updateUserStatusunblocked,
  getUseradmin
} = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/authmiddleware");

router.post("/products/admin/create", createProducts);
router.post("/products/add/admin", addProduct);
router.put("/products/update/:id", updateProduct);
router.delete("/products/del/:id", deleteProduct);
router.get("/getuserpresnt", getUser);
router.patch('/users/status/:id/:status', updateUserStatusblock);
router.get('/user/adminpresent',getUseradmin);
// router.patch('/users/statusunblock/:id', updateUserStatusunblocked);
module.exports = router;
