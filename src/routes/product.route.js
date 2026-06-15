const express = require("express");
const {products} = require('../controllers/product.controller')

const router = express.Router();
router.get('/',products)

module.exports = router;
