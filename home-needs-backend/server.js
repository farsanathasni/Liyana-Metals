const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

// Routes
const userRoutes = require("./src/routes/userRoutes.js");
const productsRoutes = require("./src/routes/productRoutes.js");
const cartRoutes = require("./src/routes/cartRoutes.js");
const wishlistRoutes = require("./src/routes/wishlisttRoutes.js");
const orderRoutes = require("./src/routes/orderRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes.js");
const userManagementRoutes = require("./src/routes/userManagementRoutes.js");
const orderManagementRoutes = require("./src/routes/orderManagementRoutes.js");
const productManagementRoutes = require("./src/routes/productManagementRoutes.js");
const refreshRoutes = require("./src/routes/refreshRoutes.js");
const logoutRoutes = require("./src/routes/logoutRoutes.js");
const paymentRoutes = require("./src/routes/paymentRoutes.js");

// DB
const connectDB = require("./src/config/db.js");

const app = express();

// -------------------- CORS --------------------
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "https://liyana-metals-iota.vercel.app",
];

// Dynamically add FRONTEND_URL from env if provided (useful for Render+Vercel deployments)
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, Postman, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // Return a rejection (403), NOT an Error (which causes HTTP 500)
      callback(null, false);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Handle OPTIONS preflight requests explicitly for all routes
// app.options("*", cors(corsOptions));

// -------------------- MIDDLEWARE --------------------
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// -------------------- DB CONNECTION --------------------
connectDB();

// -------------------- ROUTES --------------------
app.use("/api/users", userRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use("/api/admin/users", userManagementRoutes);
app.use("/api/admin/order", orderManagementRoutes);
app.use("/api/admin/products", productManagementRoutes);

app.use("/api/auth", refreshRoutes);
app.use("/api/auth", logoutRoutes);

app.use("/api/payment", paymentRoutes);

// -------------------- TEST ROUTE --------------------
app.get("/", (req, res) => {
  res.send("backend is running");
});

// -------------------- SERVER --------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server is running on " + PORT);
});
