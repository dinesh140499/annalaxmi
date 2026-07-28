const express = require("express");
const { protect } = require("../middleware/auth.middleware");
const {
  addAddresses,
  getAddresses,
  updateAddress,
  deleteAddress,
} = require("../controllers/users/address.controller");

const router = express.Router();

router.post("/address", protect, addAddresses);
router.get("/address", protect, getAddresses);
router.patch("/address/:id", protect, updateAddress);
router.delete("/address/:id", protect, deleteAddress);

module.exports = router;
