const express = require("express");
const router = express.Router();

const {getAllOrder,updateOrderStatus,deleteOrder} = require("../controller/aOrderManagenentController")

router.get("/", getAllOrder);
router.patch("/:id", updateOrderStatus);
router.delete("/:id", deleteOrder);

module.exports = router;