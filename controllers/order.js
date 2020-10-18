/* eslint-disable linebreak-style */
/* eslint-disable func-names */
const { v4: uuidv4 } = require('uuid');
// const validator = require('validator');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { successResponse__, ErrorResponse } = require('../utils/apiResponse');

exports.addOrder = async function (req, res) {
  const mapOrders = [];

  const { items, specialNote } = req.body;
  if (!items) {
    return ErrorResponse(res, 'No product in the order');
  }
  try {
    await items.forEach((item) => {
      if (!item.quantity) {
        item.quantity = 1;
      }
      const emptyStringRegex = /^\s*$/;
      if (item.productId.match(emptyStringRegex)) {
        return ErrorResponse(res, 'Product ID is invalid');
      }
      Product.findOne({ ProductId: item.productId }).then((product) => {
        console.log(product);
        if (!product) {
          return ErrorResponse(res, 'Product not found');
        }
        item.totalPrice = Number(product.price) * Number(item.quantity);
      }).catch((err) => ErrorResponse(res, err));
      mapOrders.push(item);
    });
    const newOrder = new Order({
      orderId: uuidv4(),
      specialNote,
      userId: req.user.userId,
      items: mapOrders,
      totalPrice: mapOrders.reduce((acc, item) => acc + Number(item.totalPrice), 0),
      status: 1
    });
    newOrder.save((err, neworder) => (err ? ErrorResponse(res, err) : successResponse__(res, neworder)));
  } catch (error) {
    return ErrorResponse(res, error);
  }
};

exports.getSingleOrder = async function (req, res) {
  const allOrder = await Order.findOne({ orderId: req.params.orderId, status: '1' });
  return successResponse__(res, allOrder);
};

exports.deleteOrder = async function (req, res) {
  const { orderId } = req.params;

  if (!orderId) ErrorResponse(res, 'Order ID not provided');

  Order.findOne({ orderId, status: 1 }).then((order) => {
    if (order) {
      order.status = 0;
      order.save((err) => {
        if (err) ErrorResponse(res, err);
        return successResponse__(res, 'Deleted Order');
      });
    } else {
      return ErrorResponse(res, 'Order Not Found');
    }
  }).catch((err) => ErrorResponse(res, err));
};

exports.restoreOrder = async function (req, res) {
  const { orderId } = req.params;

  if (!orderId) ErrorResponse(res, 'Order ID not provided');

  Order.findOne({ orderId }).then((order) => {
    if (order) {
      order.status = 1;
      order.save((err) => {
        if (err) ErrorResponse(res, err);
        return successResponse__(res, 'Order Restored');
      });
    } else {
      return ErrorResponse(res, 'Order Not Found');
    }
  }).catch(() => ErrorResponse(res, 'Failed to restore Order'));
};

exports.updateOrder = async function (req, res) {
  const { orderId, items } = req.body;

  if (!orderId) ErrorResponse(res, 'Order ID not provided');

  Order.findOne({ orderId }).then((order) => {
    if (order) {
      order.items = items || order.items;
      order.save((err) => {
        if (err) ErrorResponse(res, err);
        return successResponse__(res, 'Updated Order');
      });
    } else {
      return ErrorResponse(res, 'Order Not Found');
    }
  }).catch(() => ErrorResponse(res, 'Failed to update Order'));
};
