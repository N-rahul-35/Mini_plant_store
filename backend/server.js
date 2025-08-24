// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const helmet = require("helmet");
// const rateLimit = require("express-rate-limit");
// require("dotenv").config();

// const plantRoutes = require("./routes/plants");
// const app = express();

// // Security middleware
// app.use(
//   helmet({
//     crossOriginEmbedderPolicy: false,
//   })
// );

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: {
//     error: "Too many requests from this IP, please try again later.",
//     retryAfter: "15 minutes",
//   },
//   standardHeaders: true,
//   legacyHeaders: false,
// });
// app.use(limiter);

// // CORS configuration
// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN || "http://localhost:3000",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// // Body parsing middleware
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// // Request logging in development
// if (process.env.NODE_ENV === "development") {
//   app.use((req, res, next) => {
//     console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
//     next();
//   });
// }

// // Database connection
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(
//       process.env.MONGODB_URI || "mongodb://localhost:27017/rahuldb",
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         serverSelectionTimeoutMS: 5000,
//         socketTimeoutMS: 45000,
//       }
//     );
//     console.log(`✅ Connected to MongoDB: ${conn.connection.host}`);
//     console.log(`📁 Database: ${conn.connection.name}`);
//   } catch (err) {
//     console.error("❌ MongoDB connection error:", err.message);
//     process.exit(1);
//   }
// };

// // Handle connection events
// mongoose.connection.on("disconnected", () => {
//   console.log("❌ MongoDB disconnected");
// });
// mongoose.connection.on("error", (err) => {
//   console.error("❌ MongoDB error:", err);
// });

// // Graceful shutdown
// process.on("SIGINT", async () => {
//   console.log("\n🛑 Received SIGINT. Gracefully shutting down...");
//   try {
//     await mongoose.connection.close();
//     console.log("✅ MongoDB connection closed.");
//     process.exit(0);
//   } catch (err) {
//     console.error("❌ Error during shutdown:", err);
//     process.exit(1);
//   }
// });

// // Connect to database
// connectDB();

// // Routes
// app.use("/api/plants", plantRoutes);

// // Health check
// app.get("/api/health", async (req, res) => {
//   try {
//     const dbState = mongoose.connection.readyState;
//     const dbStatus = dbState === 1 ? "connected" : "disconnected";

//     res.json({
//       status: "OK",
//       timestamp: new Date().toISOString(),
//       uptime: process.uptime(),
//       database: dbStatus,
//       environment: process.env.NODE_ENV || "development",
//     });
//   } catch (error) {
//     res.status(500).json({ status: "ERROR", error: error.message });
//   }
// });

// // API documentation endpoint
// app.get("/api", (req, res) => {
//   res.json({
//     name: "Plant Management API",
//     version: "1.0.0",
//     endpoints: {
//       plants: "/api/plants",
//       health: "/api/health",
//     },
//     database: "Plants (rahuldb)",
//     documentation: "Visit /api/plants for plant management endpoints",
//   });
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({
//     error: "Route not found",
//     path: req.originalUrl,
//     method: req.method,
//   });
// });

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error("Error:", err.stack);

//   if (err.name === "ValidationError") {
//     return res.status(400).json({
//       error: "Validation Error",
//       details: Object.values(err.errors).map((e) => e.message),
//     });
//   }
//   if (err.name === "CastError") {
//     return res.status(400).json({
//       error: "Invalid ID format",
//       field: err.path,
//       value: err.value,
//     });
//   }
//   if (err.code === 11000) {
//     const field = Object.keys(err.keyPattern)[0];
//     return res.status(400).json({
//       error: "Duplicate value",
//       field: field,
//       message: `${field} already exists`,
//     });
//   }
//   if (err.name === "JsonWebTokenError") {
//     return res.status(401).json({ error: "Invalid token" });
//   }
//   if (err.name === "TokenExpiredError") {
//     return res.status(401).json({ error: "Token expired" });
//   }

//   res.status(err.status || 500).json({
//     error: "Internal Server Error",
//     message:
//       process.env.NODE_ENV === "development"
//         ? err.message
//         : "Something went wrong",
//     ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
//   });
// });

// const PORT = process.env.PORT || 5000;
// const server = app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📱 Environment: ${process.env.NODE_ENV || "development"}`);
//   console.log(`🌐 API Base URL: http://localhost:${PORT}/api`);
//   console.log(`❤️  Health Check: http://localhost:${PORT}/api/health`);
// });

// server.on("error", (err) => {
//   if (err.code === "EADDRINUSE") {
//     console.error(`❌ Port ${PORT} is already in use`);
//     process.exit(1);
//   } else {
//     console.error("❌ Server error:", err);
//   }
// });

// module.exports = app;
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const plantRoutes = require("./routes/Plants");
const app = express();

// Security middleware
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: "Too many requests from this IP, please try again later.",
    retryAfter: "15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Request logging in development
if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
  });
}

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/rahuldb",
      {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      }
    );
    console.log(`✅ Connected to MongoDB: ${conn.connection.host}`);
    console.log(`📁 Database: ${conn.connection.name}`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on("disconnected", () => {
  console.log("❌ MongoDB disconnected");
});
mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB error:", err);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n🛑 Received SIGINT. Gracefully shutting down...");
  try {
    await mongoose.connection.close();
    console.log("✅ MongoDB connection closed.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error during shutdown:", err);
    process.exit(1);
  }
});

// Connect to database
connectDB();

// Routes
app.use("/api/plants", plantRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Health check
app.get("/api/health", async (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus =
    dbState === 1 ? "connected" : dbState === 2 ? "connecting" : "disconnected";

  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: dbStatus,
    environment: process.env.NODE_ENV || "development",
  });
});

// API documentation endpoint
app.get("/api", (req, res) => {
  res.json({
    name: "Plant Management API",
    version: "1.0.0",
    endpoints: {
      plants: "/api/plants",
      health: "/api/health",
    },
    database: "Plants (rahuldb)",
    documentation: "Visit /api/plants for plant management endpoints",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
    method: req.method,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Validation Error",
      details: Object.values(err.errors).map((e) => e.message),
    });
  }
  if (err.name === "CastError") {
    return res.status(400).json({
      error: "Invalid ID format",
      field: err.path,
      value: err.value,
    });
  }
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({
      error: "Duplicate value",
      field: field,
      message: `${field} already exists`,
    });
  }
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Invalid token" });
  }
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ error: "Token expired" });
  }

  res.status(err.status || 500).json({
    error: "Internal Server Error",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🌐 API Base URL: http://localhost:${PORT}/api`);
  console.log(`❤️  Health Check: http://localhost:${PORT}/api/health`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use`);
    process.exit(1);
  } else {
    console.error("❌ Server error:", err);
  }
});

module.exports = app;
