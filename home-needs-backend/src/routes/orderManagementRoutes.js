const express = require("express");
const router = express.Router();

const {getAllOrder,updateOrderStatus,deleteOrder,getOrderById} = require("../controller/aOrderManagenentController")

router.get("/", getAllOrder);
router.patch("/:id", updateOrderStatus);
router.delete("/:id", deleteOrder);
router.get("/:id", getOrderById);

module.exports = router;