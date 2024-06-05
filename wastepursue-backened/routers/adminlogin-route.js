const express = require("express");
const router = express.Router();
const loginUser = require("../middlewares/authmiddleware");


router.get("/loginadmin", loginUser);


module.exports = router;
