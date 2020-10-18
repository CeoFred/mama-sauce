/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  categoryId: {
    required: true,
    type: String,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  addOns: {
    type: [Object],
    default: []
  },
  status: {
    required: true,
    type: Number,
    default: 1
  },
  productId: {
    required: true,
    type: String,
  },
  variations: {
    type: [Object],
    default: []
  }
}, { timestamps: true });
ProductSchema.path('price').validate((v) => typeof v === 'string', 'Invalid type for price');
ProductSchema.path('name').validate((v) => v.length > 3 && typeof v === 'string', 'Name should be more than 4 characters');

const Product = mongoose.model('Products', ProductSchema);

module.exports = Product;
