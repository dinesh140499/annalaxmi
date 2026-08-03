const express = require("express");
const { protect } = require("../../middleware/auth.middleware");
const { validate } = require("../../middleware/validate.middleware");
const {
  createAddressSchema,
  updateAddressSchema,
} = require("../../schemas/address.schema");
const {
  addAddresses,
  getAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} = require("../../controllers/user/address.controller");

const router = express.Router();

router.post("/address", protect, validate(createAddressSchema), addAddresses);
router.get("/address", protect, getAddresses);
router.get("/address/:id", protect, getAddressById);
router.patch("/address/:id", protect, validate(updateAddressSchema), updateAddress);
router.patch("/address/:id/default", protect, setDefaultAddress);
router.delete("/address/:id", protect, deleteAddress);

module.exports = router;
