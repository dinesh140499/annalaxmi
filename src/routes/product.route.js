const express = require("express");

const {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const { upload } = require("../middleware/upload.middleware");
const { validate } = require("../middleware/validate.middleware");
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
    upload.array("images", 5),
    validate(createProductSchema),
    createProduct,
  );

// Single product routes
router
  .route("/:id")
  .get(getSingleProduct)
  .patch(upload.array("images", 5), validate(updateProductSchema), updateProduct)
  .delete(deleteProduct);

module.exports = router;
