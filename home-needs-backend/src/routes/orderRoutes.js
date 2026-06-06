const expres=require("express")
const router=expres.Router()

const protect = require("../middleware/authMiddleware");

const {placeOrder,getToOrder}=require("../controller/orderController")

router.post("/place",protect,placeOrder)
router.get("/:userId",protect,getToOrder)

module.exports = router;