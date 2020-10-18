/* eslint-disable linebreak-style */
const express = require('express');
const {
  deleteCategory, addCategory, updateCategory, getAllCategory
} = require('../controllers/category');

const router = express.Router();

router.post('/', addCategory);

router.put('/', updateCategory);

router.get('/', getAllCategory);

router.delete('/', deleteCategory);

exports.default = router;
