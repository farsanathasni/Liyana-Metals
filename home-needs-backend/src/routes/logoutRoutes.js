const express = require("express");
const router = express.Router();
const logoutRefresh = require("../controller/logoutController");

router.post("/logout", logoutRefresh);

module.exports = router;