/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderId: {
    required: true,
    type: String,
  },
  userId: {
    required: true,
    type: String,

  },
  items: [{
    productId: {
      type: String,
      required: true
    },
    quantity: {
      required: true,
      type: Number
    },
    addOns: [Object]
  }],
  specialNote: {
    default: '',
    type: String
  },
  status: {
    type: Number,
    required: true,
  },
  totalPrice: {
    required: true,
    type: Number
  }
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
