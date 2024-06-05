const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    // required: true,
  },
  category: {
    type: String,
    // required: true,
  },
  price: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  quantity: {
    type: Number,
  },
  url: {
    type: String,
  },
});
const Product = model("Product", productSchema);
module.exports = Product;
