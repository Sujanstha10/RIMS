const express = require("express");
const router = express.Router();
const orderController = require("../controller/order.controller")

router.post("/new",orderController.addOrder)

module.exports = router;
