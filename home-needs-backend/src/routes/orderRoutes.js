const expres=require("express")
const router=expres.Router()

const protect = require("../middleware/authMiddleware");

const {placeOrder,getToOrder}=require("../controller/orderController")

router.get("/:userId",protect,getToOrder)
router.post("/place",protect,placeOrder)

module.exports = router;