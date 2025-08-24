import React, { useState } from "react";
import { Droplets, Sun, Star, Package } from "lucide-react";

const PlantCard = ({
  plant,
  placeholderImage = "/images/placeholder-plant.png",
}) => {
  const [imageError, setImageError] = useState(false);

  const formatPrice = (price) => `₹${price?.toLocaleString() || "0"}`;

  const getCareIcon = (careType, level) => {
    switch (careType) {
      case "water":
        return <Droplets size={14} className={`care-icon care-${level}`} />;
      case "light":
        return <Sun size={14} className={`care-icon care-${level}`} />;
      case "difficulty":
        return <Star size={14} className={`care-icon care-${level}`} />;
      default:
        return null;
    }
  };

  const getCareLabel = (level) => {
    const labels = {
      low: "Low",
      medium: "Medium",
      high: "High",
      easy: "Easy",
      hard: "Hard",
      "bright indirect": "Bright Indirect",
    };
    return labels[level] || level;
  };

  return (
    <div className={`plant-card ${!plant.availability ? "out-of-stock" : ""}`}>
      {/* Plant Image */}
      <div className="plant-image-container">
        <img
          src={
            !imageError && plant.imageUrl ? plant.imageUrl : placeholderImage
          }
          alt={plant.name}
          className="plant-image"
          onError={() => setImageError(true)}
          loading="lazy"
        />

        {/* Availability Badge */}
        <div
          className={`availability-badge ${
            plant.availability ? "in-stock" : "out-of-stock"
          }`}
        >
          <Package size={12} />
          {plant.availability ? "In Stock" : "Out of Stock"}
        </div>

        {/* Stock Quantity */}
        {plant.stockQuantity && plant.availability && (
          <div className="stock-info">{plant.stockQuantity} left</div>
        )}
      </div>

      {/* Plant Details */}
      <div className="plant-details">
        <h3 className="plant-name" title={plant.name}>
          {plant.name}
        </h3>

        <p className="plant-price">{formatPrice(plant.price)}</p>

        {/* Categories */}
        <div className="plant-categories">
          {plant.categories?.slice(0, 3).map((cat, idx) => (
            <span key={idx} className="category-tag">
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </span>
          ))}
          {plant.categories?.length > 3 && (
            <span className="category-tag category-more">
              +{plant.categories.length - 3}
            </span>
          )}
        </div>

        {/* Description */}
        {plant.description && (
          <p className="plant-description" title={plant.description}>
            {plant.description.length > 100
              ? `${plant.description.substring(0, 100)}...`
              : plant.description}
          </p>
        )}

        {/* Care Information */}
        {plant.care && (
          <div className="care-info">
            <div
              className="care-item"
              title={`Light: ${getCareLabel(plant.care.light)}`}
            >
              {getCareIcon("light", plant.care.light)}
              <span>{getCareLabel(plant.care.light)}</span>
            </div>
            <div
              className="care-item"
              title={`Water: ${getCareLabel(plant.care.water)}`}
            >
              {getCareIcon("water", plant.care.water)}
              <span>{getCareLabel(plant.care.water)}</span>
            </div>
            <div
              className="care-item"
              title={`Difficulty: ${getCareLabel(plant.care.difficulty)}`}
            >
              {getCareIcon("difficulty", plant.care.difficulty)}
              <span>{getCareLabel(plant.care.difficulty)}</span>
            </div>
          </div>
        )}

        {/* Tags */}
        {plant.tags?.length > 0 && (
          <div className="plant-tags">
            {plant.tags.slice(0, 2).map((tag, idx) => (
              <span key={idx} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Button */}
        <button
          className={`add-to-cart-btn ${!plant.availability ? "disabled" : ""}`}
          disabled={!plant.availability}
        >
          {plant.availability ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
};

export default PlantCard;
