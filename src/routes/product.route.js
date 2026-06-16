const express = require("express");
const {
  getProducts,
  createProduct,
} = require("../controllers/product.controller");
const { upload } = require("../middleware/upload.middleware");
const { validate } = require("../middleware/validate.middleware");

const { productSchema } = require("../schemas/product.schema");

const router = express.Router();

router.get("/", getProducts);
router.post(
  "/",
  validate(productSchema),
  upload.array("images", 6),
  createProduct,
);

module.exports = router;
