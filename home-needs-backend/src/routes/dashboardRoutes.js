const express=require("express")
const router=express.Router()

const {getDashboard}=require("../controller/aDashboardController")

router.get("/",getDashboard)

module.exports=router