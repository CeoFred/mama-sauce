/* eslint-disable linebreak-style */
const express = require('express');
const {
  getCartItems, deleteCartItems, updateCartItems, createCart
} = require('../controllers/cart');
const { isAuthenticated } = require('../config/passport');

const router = express.Router();

router.get('/', isAuthenticated, getCartItems);

router.delete('/', isAuthenticated, deleteCartItems);

router.put('/', isAuthenticated, updateCartItems);

router.post('/', isAuthenticated, createCart);

exports.default = router;
