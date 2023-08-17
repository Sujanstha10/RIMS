const express = require("express");
const router = express.Router();
const orderController = require("../controller/order.controller")

router.post("/new/:customerId",orderController.addOrder)
router.get("/",orderController.showProductOrder)

module.exports = router;
