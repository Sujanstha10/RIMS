const express = require("express");
const router = express.Router();
const purchaseController = require("../controller/purchase.controller")
const verifyMiddleware = require("../middleware/verifacation")





router.post("/add",purchaseController.addpurchase)
router.get("/",purchaseController.allpurchase)
router.get("/:id",purchaseController.showpurchase)
router.delete("/delete/:id",purchaseController.deletepurchase)
router.put("/update/:id",purchaseController.updatepurchase)



module.exports=router