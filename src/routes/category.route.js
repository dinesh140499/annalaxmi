const express = require("express");
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const { upload } = require("../middleware/upload.middleware");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router
  .route("/")
  .get(getCategories)
  .post(protect, upload.single("image"), createCategory);

router
  .route("/:id")
  .get(getCategory)
  .put(protect, upload.single("image"), updateCategory)
  .delete(protect, deleteCategory);

module.exports = router;