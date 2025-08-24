import { useState, useEffect, useCallback } from "react";
import { plantsAPI } from "../services/api";

export const usePlants = () => {
  const [plants, setPlants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 50,
  });

  // Fetch plants with filters
  const fetchPlants = useCallback(async (filters = {}, page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        page,
        limit: 50,
        ...filters,
      };

      const response = await plantsAPI.getPlants(params);

      if (response.success) {
        setPlants(response.data);
        setPagination(response.pagination);

        // Extract unique categories from plants if categories are not already fetched
        const uniqueCategories = Array.from(
          new Set(response.data.flatMap((p) => p.categories || []))
        );
        setCategories(uniqueCategories);
      } else {
        throw new Error(response.error || "Failed to fetch plants");
      }
    } catch (err) {
      console.error("Error fetching plants:", err);
      setError(err.message || "Failed to load plants. Please try again.");
      setPlants([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add new plant
  const addPlant = useCallback(async (plantData) => {
    try {
      const response = await plantsAPI.createPlant(plantData);
      if (response.success) {
        setPlants((prev) => [...prev, response.data]);
        // Update categories if new categories were added
        const newCategories = response.data.categories || [];
        setCategories((prev) =>
          Array.from(new Set([...prev, ...newCategories]))
        );
        return response.data;
      } else {
        throw new Error(response.error || "Failed to add plant");
      }
    } catch (err) {
      console.error("Error adding plant:", err);
      throw err;
    }
  }, []);

  // Other actions (update, delete, toggleAvailability, getPlant)
  const updatePlant = useCallback(async (plantId, plantData) => {
    try {
      const response = await plantsAPI.updatePlant(plantId, plantData);
      if (response.success) {
        setPlants((prev) =>
          prev.map((plant) => (plant._id === plantId ? response.data : plant))
        );
        return response.data;
      } else {
        throw new Error(response.error || "Failed to update plant");
      }
    } catch (err) {
      console.error("Error updating plant:", err);
      throw err;
    }
  }, []);

  const deletePlant = useCallback(async (plantId) => {
    try {
      const response = await plantsAPI.deletePlant(plantId);
      if (response.success) {
        setPlants((prev) => prev.filter((plant) => plant._id !== plantId));
        return true;
      } else {
        throw new Error(response.error || "Failed to delete plant");
      }
    } catch (err) {
      console.error("Error deleting plant:", err);
      throw err;
    }
  }, []);

  const togglePlantAvailability = useCallback(async (plantId) => {
    try {
      const response = await plantsAPI.toggleAvailability(plantId);
      if (response.success) {
        setPlants((prev) =>
          prev.map((plant) => (plant._id === plantId ? response.data : plant))
        );
        return response.data;
      } else {
        throw new Error(response.error || "Failed to toggle availability");
      }
    } catch (err) {
      console.error("Error toggling availability:", err);
      throw err;
    }
  }, []);

  const getPlant = useCallback(async (plantId) => {
    try {
      const response = await plantsAPI.getPlant(plantId);
      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.error || "Failed to fetch plant");
      }
    } catch (err) {
      console.error("Error fetching plant:", err);
      throw err;
    }
  }, []);

  // Load initial data
  useEffect(() => {
    fetchPlants();
  }, [fetchPlants]);

  return {
    plants,
    categories,
    loading,
    error,
    pagination,
    fetchPlants,
    addPlant,
    updatePlant,
    deletePlant,
    togglePlantAvailability,
    getPlant,
  };
};
