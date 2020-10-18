/* eslint-disable linebreak-style */
/* eslint-disable func-names */
const { v4: uuidv4 } = require('uuid');
const validator = require('validator');
const Product = require('../models/Product');
const Category = require('../models/Category');
const { successResponse__, ErrorResponse } = require('../utils/apiResponse');
/**
 * Delete product variation
 */
exports.deleteVariation = function (req, res) {
  const { productId, variationId } = req.params;
  if (!productId || (productId && productId.length < 5)) ErrorResponse(res, 'Product ID is required');
  Product.find({ productId }).then((product) => {
    if (!product) ErrorResponse(res, 'Product not found');
    product.variations = product.variations.filter((variation) => variation.id !== variationId);
    product.save((err, variationDeleted) => {
      if (err) ErrorResponse(res, 'Failed to delete product variation');
      return successResponse__(res, variationDeleted);
    });
  });
};

exports.updateVariation = function (req, res) {
  const {
    productId
  } = req.params;
  const { variationPrice, variationSize, variationID } = req.body;
  if (!productId || (productId && productId.length < 5)) ErrorResponse(res, 'Product ID is required');
  Product.find({ productId }).then((product) => {
    if (!product) ErrorResponse(res, 'Product not found');
    product.variations = product.variations.map((variation) => {
      let data = null;
      if (variation.id === variationID) {
        data = {
          id: variationID,
          price: variationPrice,
          size: variationSize
        };
      } else {
        data = variation;
      }
      return data;
    });

    product.save((err, variationSaved) => {
      if (err) ErrorResponse(res, 'Failed to update product variation');
      return successResponse__(res, variationSaved.variations);
    });
  });
};

exports.addVariation = async function (req, res) {
  const { productId } = req.params;
  const { variationSize, variationPrice } = req.body;
  if (!productId || (productId && productId.length < 5)) ErrorResponse(res, 'Product ID is required');
  Product.find({ productId }).then((product) => {
    if (!product) ErrorResponse(res, 'Product not found');
    // eslint-disable-next-line max-len
    const variationExists = product.variations.some((v) => v.size === variationSize && v.price === variationPrice);
    if (variationExists) {
      return ErrorResponse(res, 'Variation already exists for product');
    }
    product.variations.push({ id: uuidv4(), size: variationSize, price: variationPrice });
    product.save((err, variationSaved) => {
      if (err) {
        return ErrorResponse(res, 'Could not add variation for product');
      }
      return successResponse__(res, variationSaved, 201);
    });
  });
};

exports.getSingleProduct = async function (req, res) {
  const { productId } = req.params;
  if (!productId || (productId && productId.length < 5)) ErrorResponse(res, 'Product ID is required');
  Product.findOne({ productId }).then((product) => successResponse__(res, product));
};

exports.getAllProductUnderCategory = async function (req, res) {
  const { categoryId } = req.params;
  if (!categoryId || (categoryId && categoryId.length < 5)) ErrorResponse(res, 'Category ID is required');
  const product = await Product.find({ categoryId });
  return successResponse__(res, product);
};

exports.addProduct = async function (req, res) {
  let {
    // eslint-disable-next-line prefer-const
    name, categoryId, price, description, addOns
  } = req.body;

  if (!name) {
    return ErrorResponse(res, 'Product Name is required');
  }

  if (!name || typeof name !== 'string') {
    return ErrorResponse(res, 'Product Name must be a string and is required');
  }
  if (!categoryId || typeof categoryId !== 'string') {
    return ErrorResponse(res, 'category ID must be a string and is required');
  }
  if (!price || typeof price !== 'string') {
    return ErrorResponse(res, 'Price must be a string and is required');
  }
  name = validator.escape(name);
  categoryId = validator.escape(categoryId);
  description = validator.escape(description || '');

  Product.find({ name, categoryId }).then((product) => {
    console.log(product);
    if (product && product.length) {
      return ErrorResponse(res, 'product Already Exists');
    }

    Category.findOne({ categoryId }).then((Category) => {
      if (!Category) ErrorResponse(res, 'Invalid Category ID');
      new Product({
        name,
        status: 1,
        productId: uuidv4(),
        description,
        price,
        categoryId,
        addOns
      })
        .save((err) => {
          if (err) ErrorResponse(res, err);
          else successResponse__(res, 'Product Added', 201);
        });
    }).catch(() => ErrorResponse(res, 'Failed to fetch category'));
  });
};

exports.getAllProduct = async function (req, res) {
  const allProduct = await Product.find({ status: 1 });
  return successResponse__(res, allProduct);
};

exports.deleteProduct = async function (req, res) {
  const { productId } = req.params;

  if (!productId) ErrorResponse(res, 'Product ID not provided');

  Product.find({ productId }).then((Product) => {
    if (Product) {
      Product.status = 0;
      Product.save((err) => {
        if (err) ErrorResponse(res, err);
        return successResponse__(res, 'Deleted Product');
      });
    } else {
      return ErrorResponse(res, 'Product Not Found');
    }
  }).catch(() => ErrorResponse(res, 'Failed to delete Product'));
};

exports.restoreProduct = async function (req, res) {
  const { productId } = req.body;

  if (!productId) ErrorResponse(res, 'Product ID not provided');

  Product.find({ productId }).then((product) => {
    if (product) {
      product.status = 1;
      product.save((err) => {
        if (err) ErrorResponse(res, err);
        return successResponse__(res, 'Product Restored');
      });
    } else {
      return ErrorResponse(res, 'Product Not Found');
    }
  }).catch(() => ErrorResponse(res, 'Failed to restore Product'));
};

exports.updateProduct = async function (req, res) {
  const { productId } = req.params;
  const { name } = req.body;
  if (!productId) ErrorResponse(res, 'Product ID not provided');
  if (!name) ErrorResponse(res, 'Name not provided');

  Product.find({ productId }).then((Product) => {
    if (Product) {
      Product.name = name;
      Product.save((err) => {
        if (err) ErrorResponse(res, err);
        return successResponse__(res, 'Updated Product');
      });
    } else {
      return ErrorResponse(res, 'Product Not Found');
    }
  }).catch(() => ErrorResponse(res, 'Failed to update Product'));
};
