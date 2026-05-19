const express=require("express")
const router=express.Router()

const {registration,loginUser}=require("../controller/userController");

router.post("/register",registration)
router.post("/login",loginUser)

module.exports=router