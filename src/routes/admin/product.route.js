const express = require('express')
const router = express.Router()

const { createProduct } = require("../../controllers/product/createProduct.controller");
const { updateProduct } = require("../../controllers/product/updateProduct.controller");
const { deleteProduct, deleteProductPermanently } = require("../../controllers/product/product.delete.controller");

const { protect } = require("../../middleware/auth.middleware");
const { upload } = require("../../middleware/upload.middleware");
const { validate } = require("../../middleware/validate.middleware");
const { createProductSchema, updateProductSchema } = require("../../schemas/product.schema");
const { authorize } = require("../../middleware/role.middleware");

router
    .route('/')
    .post(protect, authorize("admin"), upload.array("images", 5), validate(createProductSchema), createProduct)

router
    .route('/:id')
    .put(protect, authorize("admin"), upload.array("images", 5), validate(updateProductSchema), updateProduct)
    .delete(protect, authorize("admin"), deleteProduct)

router
    .route('/:id/permanent')
    .delete(protect, authorize("admin"), deleteProductPermanently)

module.exports = router
