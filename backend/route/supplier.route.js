const express = require("express");
const router = express.Router();
const supplierController = require("../controller/supplier.controller")
const verifyMiddleware = require("../middleware/verifacation")





router.post("/add",supplierController.addsupplier)
router.get("/",supplierController.allsupplier)
router.get("/:id",supplierController.showsupplier)
router.delete("/delete/:id",supplierController.deletesupplier)
router.put("/update/:id",supplierController.updatesupplier)



module.exports=router