const express = require("express");
const {
  getProducts,
  getSingleProduct,
  createProduct,
} = require("../controllers/product.controller");
const { upload } = require("../middleware/upload.middleware");
const { validate } = require("../middleware/validate.middleware");
const { productSchema } = require("../schemas/product.schema");

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getSingleProduct);

router.post(
  "/",
  upload.array("images", 2),
  validate(productSchema),
  createProduct,
);

module.exports = router;
