const express = require('express')
const router = express.Router()

const { createCategory } = require("../../controllers/category/createCategory.controller");
const { updateCategory } = require("../../controllers/category/updateCategory.controller");
const { deleteCategory } = require("../../controllers/category/category.delete.controller");

const { protect } = require("../../middleware/auth.middleware");
const { upload } = require("../../middleware/upload.middleware");

router
    .route('/')
    .post(protect, upload.single("image"), createCategory)

router
    .route('/:id')
    .put(protect, upload.single("image"), updateCategory)
    .delete(protect, deleteCategory)

module.exports = router
