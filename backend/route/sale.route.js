const express = require("express");
const router = express.Router();
const saleController = require("../controller/sale.controller")
const verifyMiddleware = require("../middleware/verifacation")





router.post("/add",saleController.addsale)
router.get("/",saleController.allsale)
router.get("/:id",saleController.showsale)
router.delete("/delete/:id",saleController.deletesale)
router.put("/update/:id",saleController.updatesale)



module.exports=router