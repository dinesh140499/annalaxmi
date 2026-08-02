const { getCategories, getCategory } = require("../category/category.read.controller");
const { createCategory } = require("../category/createCategory.controller");
const { updateCategory } = require("../category/updateCategory.controller");
const { deleteCategory } = require("../category/category.delete.controller");

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
