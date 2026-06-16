const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    sku: {
      type: String,
      unique: true,
      index: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    brand: String,
    description: String,
    pricing: {
      price: Number,
      discountPrice: Number,
    },
    inventory: {
      stock: Number,
      stockStatus: {
        type: String,
        enum: ["Available", "Out Of Stock"],
      },
    },
    images: [
      {
        url: String,
        public_id: String,
      },
    ],
    specifications: {
      weight: String,
      color: String,
      type: String,
    },
    tags: [String],
    rating: {
      average: Number,
      totalReviews: Number,
    },
    isFeatured: Boolean,
    isActive: Boolean,
  },
  {
    timestamps: true,
  },
);

productSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
      trim: true,
    });
  }

  next();
});

module.exports = mongoose.model("Product", productSchema);
