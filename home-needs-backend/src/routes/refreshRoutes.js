const express = require("express");
const router = express.Router();
const refreshAccessToken = require("../controller/refreshController");

router.post("/refresh", refreshAccessToken);

module.exports = router;