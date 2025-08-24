import React from "react";

const LoadingSpinner = ({ size = "large", message = "Loading plants..." }) => {
  return (
    <div className="loading-container">
      <div className={`loading-spinner ${size}`}>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

// Skeleton loader for plant cards
export const PlantCardSkeleton = () => {
  return (
    <div className="plant-card skeleton">
      <div className="skeleton-image"></div>
      <div className="plant-details">
        <div className="skeleton-text skeleton-title"></div>
        <div className="skeleton-text skeleton-price"></div>
        <div className="skeleton-tags">
          <div className="skeleton-tag"></div>
          <div className="skeleton-tag"></div>
          <div className="skeleton-tag"></div>
        </div>
        <div className="skeleton-text skeleton-description"></div>
        <div className="skeleton-text skeleton-description short"></div>
      </div>
    </div>
  );
};

// Grid of skeleton cards
export const PlantGridSkeleton = ({ count = 12 }) => {
  return (
    <div className="plant-grid">
      {Array.from({ length: count }).map((_, index) => (
        <PlantCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default LoadingSpinner;
