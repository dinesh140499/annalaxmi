const express = require("express");

const {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProductPermanently
} = require("../controllers/product.controller");

const { upload } = require("../middleware/upload.middleware");
const { validate } = require("../middleware/validate.middleware");
const { protect } = require("../middleware/auth.middleware");

const {
  createProductSchema,
  updateProductSchema,
} = require("../schemas/product.schema");

const router = express.Router();

// Collection routes
router
  .route("/")
  .get(getProducts)
  .post(
    protect,
    upload.array("images", 5),
    validate(createProductSchema),
    createProduct,
  );

// Single product routes
router
  .route("/:id")
  .get(getSingleProduct)
  .patch(protect, upload.array("images", 5), validate(updateProductSchema), updateProduct)
  .delete(protect, deleteProduct);

// Single product routes
router
  .route("/:id/permanent")
  .delete(protect, deleteProductPermanently)

module.exports = router;
