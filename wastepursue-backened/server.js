const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const connectDb = require("./utils/db");
const contactForm = require("./routers/contact-route");
const userRoute = require("./routers/user-route");
const otpRoute = require("./routers/otp-route");
const productRoutes = require("./routers/product-route");
const admin =require("./routers/adminproductroute");
const cartRoutes = require("./routers/cart-route");
const uploadOnCloudinary = require("./middlewares/cloudinary");
const checksum_lib = require('checksum');
const config = require('config');
const jwt = require('jsonwebtoken'); 
const adminlog=require("./routers/adminlogin-route");

const app = express();
const port = process.env.PORT ;




app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "./tmp"),
  })
);

app.use("/api/user", userRoute);
app.use("/api/form", contactForm);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/otp", otpRoute);
app.use("/api/admin",admin);
app.use("/api/adminlog",adminlog)

app.post("/api/upload", async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  const files = [];

  for (const file of req.files) {
    try {
      const uri = await uploadOnCloudinary(file);
      files.push({ filename: file.originalname, uri });
    } catch (error) {
      console.error("Error uploading file to Cloudinary:", error);
      return res
        .status(500)
        .json({ error: "Failed to upload file to Cloudinary" });
    }
  }

  return res
    .status(200)
    .json({ message: "Files uploaded successfully", files: files });
});



connectDb().then(() => {
  app.listen(port, () => {
    // console.log(`Server is running on port ${port}`);
    console.log("server is running...........");
  });
});
