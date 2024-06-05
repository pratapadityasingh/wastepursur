// const express = require("express");
// const multer = require("multer");
// const uploadOnCloudinary = require("./cloudinary");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
//   },
// });
// const upload = multer({ storage: storage });
// module.exports = upload;
// // const app = express();

// // app.post("/profile", upload.single("avatar"), function (req, res, next) {

// // });
// // module.exports = upload;

// // const multer = require("multer");
// // const storage = multer.diskStorage({
// //   destination: function(req, file, cb) {
// //     cb(null, "./uploads");
// //   },
// //   filename: function(req, file, cb) {
// //     cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
// //   }
// // });
// // const upload = multer({
// //   storage: storage,
// //   limits: {
// //     fileSize: 1024 * 1024 * 1024
// //   }
// // });

// // module.exports = upload;
