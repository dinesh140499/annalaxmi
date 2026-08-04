const { createCategory } = require("./createCategory.service");
const { getCategories, getCategoryById } = require("./category.read.service");
const { updateCategory } = require("./updateCategory.service");
const { deleteCategory } = require("./category.delete.service");

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
