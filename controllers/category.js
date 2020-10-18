/* eslint-disable linebreak-style */
/* eslint-disable func-names */
const { v4: uuidv4 } = require('uuid');
const validator = require('validator');
const Category = require('../models/Category');
const { successResponse__, ErrorResponse } = require('../utils/apiResponse');

exports.addCategory = async function (req, res) {
  let { name } = req.body;

  if (!name) {
    return ErrorResponse(res, 'Category Name is required');
  }

  name = validator.escape(name);

  Category.find({ name }).then((category) => {
    console.log(category);
    if (category && category.length) {
      return ErrorResponse(res, 'Cateory Already Exists');
    }
    const newCategory = new Category({
      name,
      status: 1,
      categoryId: uuidv4()
    });
    newCategory.save((err) => {
      if (err) ErrorResponse(res, err);
      return successResponse__(res, 'Category Added', 201);
    });
  });
};

exports.getAllCategory = async function (req, res) {
  const allCategory = await Category.find({ status: 1 });
  return successResponse__(res, allCategory);
};

exports.deleteCategory = async function (req, res) {
  const { categoryId } = req.body;

  if (!categoryId) ErrorResponse(res, 'Category ID not provided');

  Category.find({ categoryId }).then((category) => {
    if (category) {
      category.status = 0;
      category.save((err) => {
        if (err) ErrorResponse(res, err);
        return successResponse__(res, 'Deleted category');
      });
    } else {
      return ErrorResponse(res, 'Category Not Found');
    }
  }).catch(() => ErrorResponse(res, 'Failed to delete category'));
};

exports.restoreCategory = async function (req, res) {
  const { categoryId } = req.body;

  if (!categoryId) ErrorResponse(res, 'Category ID not provided');

  Category.find({ categoryId }).then((category) => {
    if (category) {
      category.status = 1;
      category.save((err) => {
        if (err) ErrorResponse(res, err);
        return successResponse__(res, 'Category Restored');
      });
    } else {
      return ErrorResponse(res, 'Category Not Found');
    }
  }).catch(() => ErrorResponse(res, 'Failed to restore category'));
};

exports.updateCategory = async function (req, res) {
  const { categoryId, name } = req.body;

  if (!categoryId) ErrorResponse(res, 'Category ID not provided');
  if (!name) ErrorResponse(res, 'Name not provided');

  Category.find({ categoryId }).then((category) => {
    if (category) {
      category.name = name;
      category.save((err) => {
        if (err) ErrorResponse(res, err);
        return successResponse__(res, 'Updated category');
      });
    } else {
      return ErrorResponse(res, 'Category Not Found');
    }
  }).catch(() => ErrorResponse(res, 'Failed to update category'));
};
