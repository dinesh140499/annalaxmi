const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema(
  {
    // Basic Information
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
    },

    sku: {
      type: String,
      unique: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    brand: {
      type: String,
      default: "",
      index: true,
    },

    description: {
      type: String,
      default: "",
    },

    // Pricing
    pricing: {
      mrp: Number,
      sellingPrice: {
        type: Number,
        required: true,
      },
      discountPrice: Number,
    },

    // Inventory
    inventory: {
      stock: {
        type: Number,
        default: 0,
      },

      sold: {
        type: Number,
        default: 0,
      },

      lowStockAlert: {
        type: Number,
        default: 5,
      },

      stockStatus: {
        type: String,
        enum: ["Available", "Out Of Stock"],
        default: "Available",
      },
    },

    // Images
    images: [
      {
        url: String,
        public_id: String,
        alt: String,
        isPrimary: {
          type: Boolean,
          default: false,
        },
      },
    ],

    // Product specifications
    specifications: {
      weight: String,
      color: String,
      spec_type: String,
      countryOfOrigin: String,
    },

    // Search tags
    tags: [String],

    // Reviews
    rating: {
      average: {
        type: Number,
        default: 0,
      },
      totalReviews: {
        type: Number,
        default: 0,
      },
    },

    // Visibility
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },

    // SEO
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },

    isTrending: {
      type: Boolean,
      default: false,
    },

    isNewArrival: {
      type: Boolean,
      default: false,
    },

    isBestSeller: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
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
