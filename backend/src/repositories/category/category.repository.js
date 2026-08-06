const categoryReadRepository = require("./category.read.repository");
const createCategoryRepository = require("./createCategory.repository");
const updateCategoryRepository = require("./updateCategory.repository");
const deleteCategoryRepository = require("./deleteCategory.repository");

module.exports = {
    findById: (id) => categoryReadRepository.findById(id),
    findOne: (query) => categoryReadRepository.findOne(query),
    find: (query) => categoryReadRepository.find(query),
    create: (data) => createCategoryRepository.create(data),
    update: (id, data) => updateCategoryRepository.update(id, data),
    delete: (id) => deleteCategoryRepository.delete(id),
};
