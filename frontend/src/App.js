import React, { useState, useEffect } from "react";
import PlantGrid from "./components/PlantGrid";
import SearchFilter from "./components/SearchFilter";
import AddPlantForm from "./components/AddPlantForm";
import LoadingSpinner from "./components/LoadingSpinner";
import { usePlants } from "./hooks/usePlants";
import { Plus, Leaf } from "lucide-react";
import "./App.css";

function App() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [toast, setToast] = useState(null);

  const { plants, categories, loading, error, fetchPlants, addPlant } =
    usePlants();

  // Fetch plants when filters change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchPlants({
        search: searchTerm,
        category: selectedCategory,
        availability: availabilityFilter,
      });
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedCategory, availabilityFilter, fetchPlants]);

  // Toast helper
  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  // Automatically clear toast after 3 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleAddPlant = async (plantData) => {
    try {
      await addPlant(plantData);
      setShowAddForm(false);
      showToast("Plant added successfully! 🌱");
      fetchPlants(); // Refresh the list
    } catch (error) {
      showToast(error.message || "Failed to add plant", "error");
    }
  };

  const handleSearchChange = (value) => setSearchTerm(value);
  const handleCategoryChange = (category) => setSelectedCategory(category);
  const handleAvailabilityChange = (availability) =>
    setAvailabilityFilter(availability);
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setAvailabilityFilter("");
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <Leaf className="logo-icon" />
              <h1>Mini Plant Store</h1>
            </div>
            <button
              className="add-plant-btn"
              onClick={() => setShowAddForm(true)}
            >
              <Plus size={20} />
              Add Plant
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          {/* Search and Filters */}
          <SearchFilter
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            availabilityFilter={availabilityFilter}
            categories={categories}
            onSearchChange={handleSearchChange}
            onCategoryChange={handleCategoryChange}
            onAvailabilityChange={handleAvailabilityChange}
            onClearFilters={clearFilters}
          />

          {/* Plants Grid */}
          {error && (
            <div className="error-message">
              <p>❌ {error}</p>
              <button onClick={() => fetchPlants()} className="retry-btn">
                Try Again
              </button>
            </div>
          )}

          {loading ? (
            <LoadingSpinner />
          ) : (
            <PlantGrid
              plants={plants}
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              placeholderImage="/images/placeholder-plant.png" // optional fallback
            />
          )}
        </div>
      </main>

      {/* Add Plant Modal */}
      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <AddPlantForm
              categories={categories}
              onSubmit={handleAddPlant}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>{toast.message}</div>
      )}
    </div>
  );
}

export default App;
