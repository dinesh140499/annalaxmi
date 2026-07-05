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
      unique: true,
    },
    sku: {
      // Stock Keeping In Unit
      type: String,
      unique: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      index: true,
    },
    brand: {
      type: String,
      index: true, // if users filter by brand
    },
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
      spec_type: String,
    },
    tags: [String],
    rating: {
      average: Number,
      totalReviews: Number,
    },
    isFeatured: {
      type: Boolean,
      index: true,
    },
    isActive: Boolean,
  },
  {
    timestamps: true,
  },
);

productSchema.index({ createdAt: -1 });

productSchema.pre("save", function () {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
      trim: true,
    });
  }
});

module.exports = mongoose.model("Product", productSchema);
