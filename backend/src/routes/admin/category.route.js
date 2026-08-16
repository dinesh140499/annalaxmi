const express = require('express')
const router = express.Router()

const { createCategory } = require("../../controllers/category/createCategory.controller");
const { updateCategory } = require("../../controllers/category/updateCategory.controller");
const { deleteCategory } = require("../../controllers/category/category.delete.controller");

const { protect } = require("../../middleware/auth.middleware");
const { upload } = require("../../middleware/upload.middleware");
const { authorize } = require("../../middleware/role.middleware");
const { validate } = require("../../middleware/validate.middleware");
const { createCategorySchema, updateCategorySchema } = require("../../schemas/category.schema");

router.use(protect, authorize("admin", "superadmin"));

router
    .route('/')
    .post(upload.single("image"), validate(createCategorySchema), createCategory)

router
    .route('/:id')
    .put(upload.single("image"), validate(updateCategorySchema), updateCategory)
    .delete(deleteCategory)

module.exports = router
