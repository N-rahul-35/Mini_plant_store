import React, { useState } from "react";
import { X, Plus, Minus } from "lucide-react";

const AddPlantForm = ({ categories, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    categories: [],
    availability: true,
    description: "",
    imageUrl: "",
    stockQuantity: "",
    care: {
      light: "medium",
      water: "medium",
      difficulty: "easy",
    },
    tags: [""],
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const availableCategories = [
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
    "bonsai",
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Plant name is required";
    } else if (formData.name.length > 100) {
      newErrors.name = "Plant name cannot exceed 100 characters";
    }

    if (
      !formData.price ||
      isNaN(formData.price) ||
      parseFloat(formData.price) < 0
    ) {
      newErrors.price = "Please enter a valid positive price";
    }

    if (formData.categories.length === 0) {
      newErrors.categories = "Please select at least one category";
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = "Description cannot exceed 500 characters";
    }

    if (formData.imageUrl && !/^https?:\/\/.+/.test(formData.imageUrl)) {
      newErrors.imageUrl = "Please enter a valid HTTP/HTTPS URL";
    }

    if (
      formData.stockQuantity &&
      (isNaN(formData.stockQuantity) || parseInt(formData.stockQuantity) < 0)
    ) {
      newErrors.stockQuantity = "Stock quantity must be a non-negative number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleCareChange = (careType, value) => {
    setFormData((prev) => ({
      ...prev,
      care: {
        ...prev.care,
        [careType]: value,
      },
    }));
  };

  const handleCategoryToggle = (category) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));

    if (errors.categories) {
      setErrors((prev) => ({ ...prev, categories: "" }));
    }
  };

  const handleTagChange = (index, value) => {
    const newTags = [...formData.tags];
    newTags[index] = value;
    setFormData((prev) => ({ ...prev, tags: newTags }));
  };

  const addTag = () => {
    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, ""],
    }));
  };

  const removeTag = (index) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const submitData = {
        ...formData,
        price: parseFloat(formData.price),
        stockQuantity: formData.stockQuantity
          ? parseInt(formData.stockQuantity)
          : 0,
        tags: formData.tags.filter((tag) => tag.trim() !== ""),
      };

      await onSubmit(submitData);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-plant-form">
      <div className="form-header">
        <h2>Add New Plant</h2>
        <button onClick={onCancel} className="close-btn">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="plant-form">
        <div className="form-grid">
          {/* Plant Name */}
          <div className="form-group">
            <label htmlFor="name">Plant Name *</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={errors.name ? "error" : ""}
              placeholder="e.g., Monstera Deliciosa"
              maxLength={100}
            />
            {errors.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </div>

          {/* Price */}
          <div className="form-group">
            <label htmlFor="price">Price (₹) *</label>
            <input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              className={errors.price ? "error" : ""}
              placeholder="0"
              min="0"
              step="0.01"
            />
            {errors.price && (
              <span className="error-message">{errors.price}</span>
            )}
          </div>

          {/* Stock Quantity */}
          <div className="form-group">
            <label htmlFor="stockQuantity">Stock Quantity</label>
            <input
              id="stockQuantity"
              type="number"
              value={formData.stockQuantity}
              onChange={(e) =>
                handleInputChange("stockQuantity", e.target.value)
              }
              className={errors.stockQuantity ? "error" : ""}
              placeholder="0"
              min="0"
            />
            {errors.stockQuantity && (
              <span className="error-message">{errors.stockQuantity}</span>
            )}
          </div>

          {/* Availability */}
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.availability}
                onChange={(e) =>
                  handleInputChange("availability", e.target.checked)
                }
              />
              Available for sale
            </label>
          </div>
        </div>

        {/* Categories */}
        <div className="form-group">
          <label>Categories *</label>
          <div className="category-grid">
            {availableCategories.map((category) => (
              <label key={category} className="category-checkbox">
                <input
                  type="checkbox"
                  checked={formData.categories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                />
                <span>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
              </label>
            ))}
          </div>
          {errors.categories && (
            <span className="error-message">{errors.categories}</span>
          )}
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className={errors.description ? "error" : ""}
            placeholder="Describe the plant..."
            maxLength={500}
            rows={3}
          />
          <small>{formData.description.length}/500 characters</small>
          {errors.description && (
            <span className="error-message">{errors.description}</span>
          )}
        </div>

        {/* Image URL */}
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            id="imageUrl"
            type="url"
            value={formData.imageUrl}
            onChange={(e) => handleInputChange("imageUrl", e.target.value)}
            className={errors.imageUrl ? "error" : ""}
            placeholder="https://example.com/plant-image.jpg"
          />
          {errors.imageUrl && (
            <span className="error-message">{errors.imageUrl}</span>
          )}
        </div>

        {/* Care Information */}
        <div className="care-section">
          <h3>Care Information</h3>
          <div className="care-grid">
            <div className="form-group">
              <label htmlFor="light">Light Requirements</label>
              <select
                id="light"
                value={formData.care.light}
                onChange={(e) => handleCareChange("light", e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="bright indirect">Bright Indirect</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="water">Water Needs</label>
              <select
                id="water"
                value={formData.care.water}
                onChange={(e) => handleCareChange("water", e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="difficulty">Difficulty Level</label>
              <select
                id="difficulty"
                value={formData.care.difficulty}
                onChange={(e) => handleCareChange("difficulty", e.target.value)}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="form-group">
          <label>Tags (optional)</label>
          {formData.tags.map((tag, index) => (
            <div key={index} className="tag-input-group">
              <input
                type="text"
                value={tag}
                onChange={(e) => handleTagChange(index, e.target.value)}
                placeholder="Enter a tag..."
              />
              {formData.tags.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="remove-tag-btn"
                >
                  <Minus size={16} />
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addTag} className="add-tag-btn">
            <Plus size={16} />
            Add Tag
          </button>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="cancel-btn"
            disabled={submitting}
          >
            Cancel
          </button>
          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? "Adding Plant..." : "Add Plant"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPlantForm;
