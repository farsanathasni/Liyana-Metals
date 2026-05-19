const express=require("express")
const router=express.Router()

const {getAllUsers,deleteUser,toggleUserStatus,updateUser}=require("../controller/aUserManagementController")

router.get("/",getAllUsers)
router.delete("/:id",deleteUser)
router.patch("/:id/toggle",toggleUserStatus)
router.put("/:id",updateUser)

module.exports=router