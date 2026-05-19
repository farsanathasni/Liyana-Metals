const express=require("express")
const router=express.Router()

const protect = require("../middleware/authMiddleware");

const {addToWishlist,removeToWishlist,getToWishlist}=require("../controller/wishlistController")
const { route } = require("./cartRoutes")

router.get("/:userId",protect, getToWishlist)
router.post("/add",protect,addToWishlist)
router.delete("/delete/:id",protect,removeToWishlist)

module.exports=router