const validatePlant = (req, res, next) => {
  const { name, price, categories, availability } = req.body;
  const errors = [];

  // Validate name
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    errors.push("Plant name is required and must be a non-empty string");
  } else if (name.trim().length > 100) {
    errors.push("Plant name cannot exceed 100 characters");
  }

  // Validate price
  if (price === undefined || price === null) {
    errors.push("Price is required");
  } else if (typeof price !== "number" || isNaN(price) || price < 0) {
    errors.push("Price must be a valid positive number");
  }

  // Validate categories
  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    errors.push("At least one category is required");
  } else {
    const validCategories = [
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
    ];

    const invalidCategories = categories.filter(
      (cat) => !validCategories.includes(cat.toLowerCase().trim())
    );

    if (invalidCategories.length > 0) {
      errors.push(`Invalid categories: ${invalidCategories.join(", ")}`);
    }
  }

  // Validate availability
  if (availability !== undefined && typeof availability !== "boolean") {
    errors.push("Availability must be a boolean value");
  }

  // Validate optional fields
  const { description, imageUrl, stockQuantity } = req.body;

  if (
    description &&
    (typeof description !== "string" || description.length > 500)
  ) {
    errors.push(
      "Description must be a string and cannot exceed 500 characters"
    );
  }

  if (imageUrl && typeof imageUrl !== "string") {
    errors.push("Image URL must be a string");
  } else if (
    imageUrl &&
    imageUrl.trim() &&
    !/^https?:\/\/.+/.test(imageUrl.trim())
  ) {
    errors.push("Image URL must be a valid HTTP/HTTPS URL");
  }

  if (
    stockQuantity !== undefined &&
    (typeof stockQuantity !== "number" ||
      isNaN(stockQuantity) ||
      stockQuantity < 0)
  ) {
    errors.push("Stock quantity must be a non-negative number");
  }

  // Validate care information if provided
  const { care } = req.body;
  if (care) {
    const validLightLevels = ["low", "medium", "high", "bright indirect"];
    const validWaterLevels = ["low", "medium", "high"];
    const validDifficultyLevels = ["easy", "medium", "hard"];

    if (care.light && !validLightLevels.includes(care.light)) {
      errors.push(
        `Invalid light level. Must be one of: ${validLightLevels.join(", ")}`
      );
    }

    if (care.water && !validWaterLevels.includes(care.water)) {
      errors.push(
        `Invalid water level. Must be one of: ${validWaterLevels.join(", ")}`
      );
    }

    if (care.difficulty && !validDifficultyLevels.includes(care.difficulty)) {
      errors.push(
        `Invalid difficulty level. Must be one of: ${validDifficultyLevels.join(
          ", "
        )}`
      );
    }
  }

  // Validate tags if provided
  const { tags } = req.body;
  if (
    tags &&
    (!Array.isArray(tags) || tags.some((tag) => typeof tag !== "string"))
  ) {
    errors.push("Tags must be an array of strings");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: "Validation Error",
      details: errors,
    });
  }

  // Sanitize input
  req.body = {
    name: name.trim(),
    price: Number(price),
    categories: categories.map((cat) => cat.trim()),
    availability: availability !== undefined ? availability : true,
    ...(description && { description: description.trim() }),
    ...(imageUrl && { imageUrl: imageUrl.trim() }),
    ...(stockQuantity !== undefined && {
      stockQuantity: Number(stockQuantity),
    }),
    ...(care && { care }),
    ...(tags && { tags: tags.map((tag) => tag.trim()) }),
  };

  next();
};

module.exports = {
  validatePlant,
};
