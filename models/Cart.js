/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  cartId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  items: {
    type: [{
      productId: { type: String, required: true },
      addOns: { type: [Object], default: [] },
      variant: { type: String, required: true },
      totalPrice: { type: String },
      productName: { type: String, required: true }
    }]
  },
  totalPrice: { type: String },
  status: {
    type: Number,
    default: 1
  }
}, { timestamps: true });

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
