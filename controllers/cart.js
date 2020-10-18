/* eslint-disable linebreak-style */
/* eslint-disable func-names */
/* eslint-disable linebreak-style */
const { v4: uuidv4 } = require('uuid');
const Cart = require('../models/Cart');
const { successResponse__, ErrorResponse } = require('../utils/apiResponse');

exports.createCart = function (req, res) {
  const { cartItems, totalPrice } = req.body;
  if (!cartItems) {
    return ErrorResponse(res, 'At least one cart item is required');
  }
  if (!totalPrice) {
    return ErrorResponse(res, 'Total price is required');
  }

  Cart.find({ userId: req.user.userId, status: 1 }).then((cartitems) => {
    cartitems.forEach((item) => {
      item.status = 0;
      item.save();
    });
    new Cart({
      items: cartItems,
      totalPrice,
      userId: req.user.userId,
      cartId: uuidv4()
    }).save((err, result) => {
      if (err) ErrorResponse(res, err);
      return successResponse__(res, result);
    });
  });
};

exports.deleteCartItems = function (req, res) {
  const { cartId } = req.body;

  Cart.findOne({ cartId, userId: req.user.userId }).then((cart) => {
    cart.status = 0;
    cart.save((err, result) => {
      if (err) ErrorResponse(res, err);
      return successResponse__(res, result);
    });
  });
};

exports.getCartItems = function (req, res) {
  Cart.findOne({ userId: req.user.userId, status: 1 }).then((result) => successResponse__(res, result));
};

exports.updateCartItems = function (req, res) {
  const { cartId, cartItems } = req.body;
  Cart.findOne({ cartId, userId: req.user.userId }).then((cart) => {
    cart.cartItems = cartItems;
    cart.status = 1;
    cart.save((err, result) => {
      if (err) ErrorResponse(res, err);
      return successResponse__(res, result);
    });
  });
};
