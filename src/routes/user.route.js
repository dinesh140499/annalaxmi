const express = require("express");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/profile",protect, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

module.exports = router;
