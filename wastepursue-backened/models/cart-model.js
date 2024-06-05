const mongoose = require('mongoose');


const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', 
    
  },
  quantity: {
    type: Number,
  
    default: 1
  }
});


const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    
  },
  items: [cartItemSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
