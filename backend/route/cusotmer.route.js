const express = require("express");
const router = express.Router();
const customerController = require("../controller/customer.controller")
const verifyMiddleware = require("../middleware/verifacation")





router.post("/add", customerController.addCustomer)
router.get("/", customerController.allCustomer)
router.get("/:id", customerController.showCustomer)
router.delete("/delete/:id", customerController.deleteCustomer)
router.put("/update/:id", customerController.updateCustomer)



module.exports = router