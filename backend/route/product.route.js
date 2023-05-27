const express = require("express");
const router = express.Router();
const productController = require("../controller/product.controller")
const verifyMiddleware = require("../middleware/verifacation")





router.post("/add",productController.addproduct)
router.get("/",productController.allproduct)
router.get("/:id",productController.showproduct)
router.delete("/delete/:id",productController.deleteproduct)
router.put("/update/:id",productController.updateproduct)



module.exports=router