const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    default: "",
  },
  provided_by:{
    type:String,
    default:""
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

module.exports = new mongoose.model("Product", productSchema);
