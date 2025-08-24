import React from "react";
import PlantCard from "./PlantCard";

const PlantGrid = ({ plants = [], searchTerm = "", selectedCategory = "" }) => {
  if (!plants.length) {
    return (
      <div className="empty-state">
        <div className="empty-content">
          <span className="empty-icon">🌱</span>
          <h3>No plants found</h3>
          <p>
            {searchTerm || selectedCategory
              ? "Try adjusting your search filters to find more plants."
              : "No plants available at the moment. Check back later!"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="plant-grid-container">
      <div className="results-info">
        <p className="results-count">
          {plants.length} plant{plants.length !== 1 ? "s" : ""} found
          {searchTerm && <span> for "{searchTerm}"</span>}
          {selectedCategory && <span> in "{selectedCategory}"</span>}
        </p>
      </div>

      <div className="plant-grid">
        {plants.map((plant, index) => (
          <PlantCard key={plant._id || index} plant={plant} />
        ))}
      </div>
    </div>
  );
};

export default PlantGrid;
