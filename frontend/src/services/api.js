import axios from "axios";

// Create axios instance with default config
// const api = axios.create({
//   baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

//Create axios instance with default config
const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    "https://mini-plant-store-1-l2wf.onrender.com/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle different error cases
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      if (status === 404) {
        throw new Error("Resource not found");
      } else if (status === 400) {
        throw new Error(
          data.details ? data.details.join(", ") : data.error || "Bad request"
        );
      } else if (status === 500) {
        throw new Error("Server error. Please try again later.");
      } else {
        throw new Error(data.error || `HTTP ${status} error`);
      }
    } else if (error.request) {
      // Network error
      throw new Error(
        "Network error. Please check your connection and try again."
      );
    } else {
      // Other error
      throw new Error(error.message || "An unexpected error occurred");
    }
  }
);

// Plants API functions
export const plantsAPI = {
  // Get all plants with optional filters
  getPlants: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();

      // Add non-empty parameters
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          queryParams.append(key, value);
        }
      });

      const url = `/plants${
        queryParams.toString() ? `?${queryParams.toString()}` : ""
      }`;
      return await api.get(url);
    } catch (error) {
      console.error("Error fetching plants:", error);
      throw error;
    }
  },

  // Get single plant by ID
  getPlant: async (plantId) => {
    try {
      return await api.get(`/plants/${plantId}`);
    } catch (error) {
      console.error("Error fetching plant:", error);
      throw error;
    }
  },

  // Create new plant
  createPlant: async (plantData) => {
    try {
      return await api.post("/plants", plantData);
    } catch (error) {
      console.error("Error creating plant:", error);
      throw error;
    }
  },

  // Update existing plant
  updatePlant: async (plantId, plantData) => {
    try {
      return await api.put(`/plants/${plantId}`, plantData);
    } catch (error) {
      console.error("Error updating plant:", error);
      throw error;
    }
  },

  // Delete plant
  deletePlant: async (plantId) => {
    try {
      return await api.delete(`/plants/${plantId}`);
    } catch (error) {
      console.error("Error deleting plant:", error);
      throw error;
    }
  },

  // Toggle plant availability
  toggleAvailability: async (plantId) => {
    try {
      return await api.patch(`/plants/${plantId}/toggle-availability`);
    } catch (error) {
      console.error("Error toggling availability:", error);
      throw error;
    }
  },

  // Get all categories
  getCategories: async () => {
    try {
      return await api.get("/plants/categories");
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },
};

// Health check function
export const healthCheck = async () => {
  try {
    return await api.get("/health");
  } catch (error) {
    console.error("Health check failed:", error);
    throw error;
  }
};

// Search plants with advanced options
export const searchPlants = async (searchTerm, filters = {}) => {
  try {
    const params = {
      search: searchTerm,
      ...filters,
    };
    return await plantsAPI.getPlants(params);
  } catch (error) {
    console.error("Error searching plants:", error);
    throw error;
  }
};

export default api;
