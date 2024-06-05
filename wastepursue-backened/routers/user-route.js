const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controllers");



router.route('/me').get(userController.verifyToken);
router.route("/register").post(userController.register);
router.route("/login").post(userController.login);

router.route('/address/:id').post(userController.saveAddress);


module.exports = router;
