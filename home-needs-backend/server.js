const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const userRoutes=require("./src/routes/userRoutes.js")
const productsRoutes=require("./src/routes/productRoutes.js")
const cartRoutes=require("./src/routes/cartRoutes.js")
const wishlistRoutes=require("./src/routes/wishlisttRoutes.js")
const orderRoutes=require("./src/routes/orderRoutes")
const dashboardRoutes=require("./src/routes/dashboardRoutes.js")
const userManagementRoutes=require("./src/routes/userManagementRoutes.js")
const orderManagementRoutes=require("./src/routes/orderManagementRoutes.js")
const productManagementRoutes=require("./src/routes/productManagementRoutes.js")
const refreshRoutes = require("./src/routes/refreshRoutes.js");
const logoutRoutes=require("./src/routes/logoutRoutes.js")
const paymentRoutes = require("./src/routes/paymentRoutes.js");


// "---------------------------------"
const connectDB = require("./src/config/db.js");
// "---------------------------------"

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://liyana-metals-iota.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());


const PORT = process.env.PORT

connectDB();




app.use("/api/users",userRoutes)
app.use("/api/products",productsRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/wishlist",wishlistRoutes)
app.use("/api/order",orderRoutes)
app.use("/api/dashboard",dashboardRoutes)
app.use("/api/admin/users",userManagementRoutes)
app.use("/api/admin/order",orderManagementRoutes)
app.use("/api/admin/products",productManagementRoutes)
app.use("/api/auth", refreshRoutes);
app.use("/api/auth", logoutRoutes);
app.use("/api/payment", paymentRoutes);










app.get("/", (req, res) => {
    res.send("backend is running");
});


app.listen(PORT, () => {
    console.log("server is running on " + PORT);
});