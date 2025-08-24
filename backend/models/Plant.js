// const mongoose = require("mongoose");

// const plantSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Plant name is required"],
//       trim: true,
//       maxlength: [100, "Plant name cannot exceed 100 characters"],
//       index: true, // For faster search queries
//     },
//     price: {
//       type: Number,
//       required: [true, "Price is required"],
//       min: [0, "Price cannot be negative"],
//       validate: {
//         validator: function (value) {
//           return Number.isFinite(value) && value >= 0;
//         },
//         message: "Price must be a valid positive number",
//       },
//     },
//     categories: [
//       {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         enum: {
//           values: [
//             "indoor",
//             "outdoor",
//             "succulent",
//             "air purifying",
//             "home decor",
//             "flowering",
//             "low maintenance",
//             "pet safe",
//             "medicinal",
//             "hanging",
//             "large plants",
//             "small plants",
//             "tropical",
//             "herbs",
//             "climbers",
//             "bonsai",
//           ],
//           message: "{VALUE} is not a valid category",
//         },
//       },
//     ],
//     availability: {
//       type: Boolean,
//       required: [true, "Availability status is required"],
//       default: true,
//     },
//     description: {
//       type: String,
//       trim: true,
//       maxlength: [500, "Description cannot exceed 500 characters"],
//     },
//     imageUrl: {
//       type: String,
//       trim: true,
//       validate: {
//         validator: function (value) {
//           if (!value) return true; // Allow empty URLs
//           const urlRegex = /^https?:\/\/.+/;
//           return urlRegex.test(value);
//         },
//         message: "Please provide a valid image URL",
//       },
//     },
//     stockQuantity: {
//       type: Number,
//       min: [0, "Stock quantity cannot be negative"],
//       default: 0,
//     },
//     care: {
//       light: {
//         type: String,
//         enum: ["low", "medium", "high", "bright indirect"],
//         default: "medium",
//       },
//       water: {
//         type: String,
//         enum: ["low", "medium", "high"],
//         default: "medium",
//       },
//       difficulty: {
//         type: String,
//         enum: ["easy", "medium", "hard"],
//         default: "easy",
//       },
//     },
//     tags: [String], // Additional searchable keywords
//   },
//   {
//     timestamps: true, // Adds createdAt and updatedAt
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true },
//   }
// );

// // Indexes for better query performance
// plantSchema.index({ name: "text", categories: "text", tags: "text" });
// plantSchema.index({ categories: 1 });
// plantSchema.index({ availability: 1 });
// plantSchema.index({ price: 1 });

// // Virtual for formatted price
// plantSchema.virtual("formattedPrice").get(function () {
//   return `₹${this.price.toFixed(2)}`;
// });

// // Virtual for in stock status
// plantSchema.virtual("inStock").get(function () {
//   return this.availability && this.stockQuantity > 0;
// });

// // Pre-save middleware to ensure at least one category
// plantSchema.pre("save", function (next) {
//   if (!this.categories || this.categories.length === 0) {
//     return next(new Error("Plant must have at least one category"));
//   }

//   // Remove duplicate categories
//   this.categories = [...new Set(this.categories)];

//   next();
// });

// // Static method to get all unique categories
// plantSchema.statics.getAllCategories = function () {
//   return this.aggregate([
//     { $unwind: "$categories" },
//     { $group: { _id: "$categories" } },
//     { $sort: { _id: 1 } },
//     { $project: { _id: 0, category: "$_id" } },
//   ]);
// };

// // Static method for advanced search
// plantSchema.statics.searchPlants = function (searchTerm, filters = {}) {
//   const query = {};

//   // Text search
//   if (searchTerm && searchTerm.trim()) {
//     query.$or = [
//       { name: { $regex: searchTerm.trim(), $options: "i" } },
//       { categories: { $regex: searchTerm.trim(), $options: "i" } },
//       { tags: { $regex: searchTerm.trim(), $options: "i" } },
//       { description: { $regex: searchTerm.trim(), $options: "i" } },
//     ];
//   }

//   // Category filter
//   if (filters.category) {
//     query.categories = filters.category.toLowerCase();
//   }

//   // Availability filter
//   if (filters.availability !== undefined) {
//     query.availability = filters.availability === "true";
//   }

//   // Price range filter
//   if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
//     query.price = {};
//     if (filters.minPrice !== undefined)
//       query.price.$gte = Number(filters.minPrice);
//     if (filters.maxPrice !== undefined)
//       query.price.$lte = Number(filters.maxPrice);
//   }

//   return this.find(query).sort({ createdAt: -1 });
// };

// // Instance method to toggle availability
// plantSchema.methods.toggleAvailability = function () {
//   this.availability = !this.availability;
//   return this.save();
// };

// module.exports = mongoose.model("Plant", plantSchema);
const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Plant name is required"],
      trim: true,
      maxlength: [100, "Plant name cannot exceed 100 characters"],
      index: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
      validate: {
        validator: function (value) {
          return Number.isFinite(value) && value >= 0;
        },
        message: "Price must be a valid positive number",
      },
    },
    categories: [
      {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        enum: {
          values: [
            "indoor",
            "outdoor",
            "succulent",
            "air purifying",
            "home decor",
            "flowering",
            "low maintenance",
            "pet safe",
            "medicinal",
            "hanging",
            "large plants",
            "small plants",
            "tropical",
            "herbs",
            "climbers",
            "climbing",
            "bonsai",
          ],
          message: "{VALUE} is not a valid category",
        },
      },
    ],
    availability: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    imageUrl: {
      type: String,
      trim: true,
      validate: {
        validator: function (value) {
          if (!value) return true; // allow empty URLs
          const urlRegex = /^https?:\/\/.+/;
          return urlRegex.test(value);
        },
        message: "Please provide a valid image URL",
      },
    },
    stockQuantity: {
      type: Number,
      min: [0, "Stock quantity cannot be negative"],
      default: 0,
    },
    care: {
      light: {
        type: String,
        enum: ["low", "medium", "high", "bright indirect"],
        default: "medium",
      },
      water: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium",
      },
      difficulty: {
        type: String,
        enum: ["easy", "medium", "hard"],
        default: "easy",
      },
    },
    tags: [String],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//
// ✅ Indexes for performance
//
plantSchema.index({
  name: "text",
  categories: "text",
  tags: "text",
  description: "text",
});
plantSchema.index({ categories: 1 });
plantSchema.index({ availability: 1 });
plantSchema.index({ price: 1 });

//
// ✅ Virtuals
//
plantSchema.virtual("formattedPrice").get(function () {
  return `₹${this.price.toFixed(2)}`;
});

plantSchema.virtual("inStock").get(function () {
  return this.availability && this.stockQuantity > 0;
});

//
// ✅ Pre-save middleware
//
plantSchema.pre("save", function (next) {
  if (!this.categories || this.categories.length === 0) {
    return next(new Error("Plant must have at least one category"));
  }

  // Remove duplicate categories
  this.categories = [...new Set(this.categories)];
  next();
});

//
// ✅ Static methods
//
plantSchema.statics.getAllCategories = function () {
  return this.aggregate([
    { $unwind: "$categories" },
    { $group: { _id: "$categories" } },
    { $sort: { _id: 1 } },
    { $project: { _id: 0, category: "$_id" } },
  ]);
};

plantSchema.statics.searchPlants = function (searchTerm = "", filters = {}) {
  const query = {};

  // 🔍 Full-text search
  if (searchTerm.trim()) {
    query.$or = [
      { name: { $regex: searchTerm.trim(), $options: "i" } },
      { categories: { $regex: searchTerm.trim(), $options: "i" } },
      { tags: { $regex: searchTerm.trim(), $options: "i" } },
      { description: { $regex: searchTerm.trim(), $options: "i" } },
    ];
  }

  // Filter by category
  if (filters.category) {
    query.categories = filters.category.toLowerCase();
  }

  // Filter by availability
  if (filters.availability !== undefined) {
    query.availability =
      filters.availability === "true" || filters.availability === true;
  }

  // Price range filter
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    query.price = {};
    if (filters.minPrice !== undefined)
      query.price.$gte = Number(filters.minPrice);
    if (filters.maxPrice !== undefined)
      query.price.$lte = Number(filters.maxPrice);
  }

  return this.find(query).sort({ createdAt: -1 });
};

//
// ✅ Instance methods
//
plantSchema.methods.toggleAvailability = function () {
  this.availability = !this.availability;
  return this.save();
};

module.exports = mongoose.model("Plant", plantSchema);
