const express = require("express");
const Plant = require("../models/Plant");
const { validatePlant } = require("../middleware/validation");

const router = express.Router();

// GET /api/plants - Get all plants with search and filter
router.get("/", async (req, res) => {
  try {
    const {
      search,
      category,
      availability,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    // Build filters object
    const filters = {};
    if (category) filters.category = category;
    if (availability !== undefined) filters.availability = availability;
    if (minPrice !== undefined) filters.minPrice = minPrice;
    if (maxPrice !== undefined) filters.maxPrice = maxPrice;

    // Execute search
    let query = Plant.searchPlants(search, filters);

    // Sorting
    const sortObj = {};
    sortObj[sortBy] = sortOrder === "asc" ? 1 : -1;
    query = query.sort(sortObj);

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    query = query.skip(skip).limit(parseInt(limit));

    // Execute query
    const plants = await query;

    // Get total count for pagination
    const totalQuery = Plant.searchPlants(search, filters);
    const total = await Plant.countDocuments(totalQuery.getQuery());

    res.json({
      success: true,
      data: plants,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("Error fetching plants:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch plants",
      message: error.message,
    });
  }
});

// GET /api/plants/categories - Get all unique categories
// Get all categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Plant.getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// GET /api/plants/:id - Get single plant
router.get("/:id", async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);

    if (!plant) {
      return res.status(404).json({
        success: false,
        error: "Plant not found",
      });
    }

    res.json({
      success: true,
      data: plant,
    });
  } catch (error) {
    console.error("Error fetching plant:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch plant",
      message: error.message,
    });
  }
});

// POST /api/plants - Add new plant (Admin feature)
router.post("/", validatePlant, async (req, res) => {
  try {
    const plantData = {
      ...req.body,
      categories: req.body.categories.map((cat) => cat.toLowerCase().trim()),
    };

    const plant = new Plant(plantData);
    await plant.save();

    res.status(201).json({
      success: true,
      message: "Plant added successfully",
      data: plant,
    });
  } catch (error) {
    console.error("Error adding plant:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: "Validation Error",
        details: Object.values(error.errors).map((e) => e.message),
      });
    }

    res.status(500).json({
      success: false,
      error: "Failed to add plant",
      message: error.message,
    });
  }
});

// PUT /api/plants/:id - Update plant
router.put("/:id", validatePlant, async (req, res) => {
  try {
    const plantData = {
      ...req.body,
      categories: req.body.categories.map((cat) => cat.toLowerCase().trim()),
    };

    const plant = await Plant.findByIdAndUpdate(req.params.id, plantData, {
      new: true,
      runValidators: true,
    });

    if (!plant) {
      return res.status(404).json({
        success: false,
        error: "Plant not found",
      });
    }

    res.json({
      success: true,
      message: "Plant updated successfully",
      data: plant,
    });
  } catch (error) {
    console.error("Error updating plant:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: "Validation Error",
        details: Object.values(error.errors).map((e) => e.message),
      });
    }

    res.status(500).json({
      success: false,
      error: "Failed to update plant",
      message: error.message,
    });
  }
});

// DELETE /api/plants/:id - Delete plant
router.delete("/:id", async (req, res) => {
  try {
    const plant = await Plant.findByIdAndDelete(req.params.id);

    if (!plant) {
      return res.status(404).json({
        success: false,
        error: "Plant not found",
      });
    }

    res.json({
      success: true,
      message: "Plant deleted successfully",
      data: plant,
    });
  } catch (error) {
    console.error("Error deleting plant:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete plant",
      message: error.message,
    });
  }
});

// PATCH /api/plants/:id/toggle-availability - Toggle plant availability
router.patch("/:id/toggle-availability", async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);

    if (!plant) {
      return res.status(404).json({
        success: false,
        error: "Plant not found",
      });
    }

    await plant.toggleAvailability();

    res.json({
      success: true,
      message: `Plant availability ${
        plant.availability ? "enabled" : "disabled"
      }`,
      data: plant,
    });
  } catch (error) {
    console.error("Error toggling availability:", error);
    res.status(500).json({
      success: false,
      error: "Failed to toggle availability",
      message: error.message,
    });
  }
});

module.exports = router;
