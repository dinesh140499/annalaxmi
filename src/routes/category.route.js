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

router.get("/", getCategories);
router.get("/:id", getCategory);

router.post("/", protect, upload.single("image"), createCategory);

router.put("/:id", protect, upload.single("image"), updateCategory);

router.delete("/:id", protect, deleteCategory);

module.exports = router;
