/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  categoryId: {
    type: String,
    unique: true,
    required: true
  },
  status: {
    type: String,
  }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
