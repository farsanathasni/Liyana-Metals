const express=require("express")
const router=express.Router()

const {getCategories,getToProducts,getToProductsById}=require("../controller/productsController")

router.get("/",getToProducts)
router.get("/categories", getCategories);
router.get("/:id",getToProductsById)



module.exports=router