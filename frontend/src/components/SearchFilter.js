import React from "react";
import { Search, Filter, X } from "lucide-react";

const SearchFilter = ({
  searchTerm = "",
  selectedCategory = "",
  availabilityFilter = "",
  categories = [],
  onSearchChange,
  onCategoryChange,
  onAvailabilityChange,
  onClearFilters,
}) => {
  const hasActiveFilters = searchTerm || selectedCategory || availabilityFilter;

  const formatCategory = (category) =>
    category ? category.charAt(0).toUpperCase() + category.slice(1) : "";

  return (
    <div className="search-filter-container">
      <div className="search-filter-content">
        {/* Search Bar */}
        <div className="search-bar">
          <div className="search-input-container">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search plants by name or category..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange("")}
                className="clear-search-btn"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="filters">
          <div className="filter-group">
            <Filter size={16} className="filter-icon" />
            <span className="filter-label">Filters:</span>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="filter-select"
            >
              <option value="">All Categories</option>
              {Array.isArray(categories) &&
                categories.map((category) => (
                  <option key={category} value={category.toLowerCase()}>
                    {formatCategory(category)}
                  </option>
                ))}
            </select>

            {/* Availability Filter */}
            <select
              value={availabilityFilter}
              onChange={(e) => onAvailabilityChange(e.target.value)}
              className="filter-select"
            >
              <option value="">All Plants</option>
              <option value="true">In Stock</option>
              <option value="false">Out of Stock</option>
            </select>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="clear-filters-btn"
                title="Clear all filters"
              >
                <X size={16} />
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="active-filters">
          <span className="active-filters-label">Active filters:</span>
          <div className="filter-tags">
            {searchTerm && (
              <span className="filter-tag">
                Search: "{searchTerm}"
                <button
                  onClick={() => onSearchChange("")}
                  className="remove-filter-btn"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="filter-tag">
                Category: {formatCategory(selectedCategory)}
                <button
                  onClick={() => onCategoryChange("")}
                  className="remove-filter-btn"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {availabilityFilter && (
              <span className="filter-tag">
                {availabilityFilter === "true" ? "In Stock" : "Out of Stock"}
                <button
                  onClick={() => onAvailabilityChange("")}
                  className="remove-filter-btn"
                >
                  <X size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
