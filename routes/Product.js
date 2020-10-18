/* eslint-disable linebreak-style */
const express = require('express');
const {
  // eslint-disable-next-line max-len
  deleteProduct, addProduct, updateProduct, getAllProduct, getSingleProduct,deleteVariation,addVariation, updateVariation, getAllProductUnderCategory
} = require('../controllers/product');

const router = express.Router();

router.post('/', addProduct);

router.put('/:productId', updateProduct);

router.get('/', getAllProduct);

router.get('/:productId', getSingleProduct);

router.get('/category/:categoryId', getAllProductUnderCategory);

router.delete('/:productId', deleteProduct);

router.delete('/variation/:productId/:variationId', deleteVariation);

router.put('/variation/:productId', updateVariation);

router.post('/variation/:productId', addVariation);

exports.default = router;
