/* eslint-disable linebreak-style */
const express = require('express');
const {
  deleteOrder, addOrder, updateOrder, getSingleOrder,
  restoreOrder
} = require('../controllers/order');
const { isAuthenticated } = require('../config/passport');

const router = express.Router();

router.post('/', isAuthenticated, addOrder);

router.put('/:orderId', isAuthenticated, updateOrder);

router.put('/restore/:orderId', isAuthenticated, restoreOrder);

router.get('/:orderId', isAuthenticated, getSingleOrder);

router.delete('/:orderId', isAuthenticated, deleteOrder);

exports.default = router;
