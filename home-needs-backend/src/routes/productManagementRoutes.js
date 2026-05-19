const express=require("express")
const router=express.Router()

const{getAllProducts,updateProducts,addProducts,deleteProducts}=require("../controller/aProductManagementController")
const uploads = require("../middleware/uploads")

router.get("/",getAllProducts)
router.post("/add",uploads.single("image"),addProducts)
router.put("/:id",updateProducts)
router.delete("/:id",deleteProducts)


module.exports=router