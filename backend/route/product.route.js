const express = require("express");
const router = express.Router();
const productController = require("../controller/product.controller")
const verifyMiddleware = require("../middleware/verifacation")
const imageUpload = require("../helpers/image-uploader")





router.post("/add",imageUpload.upload.single('image'),productController.addproduct)
router.get("/",productController.allproduct)
router.get("/:id",productController.showproduct)
router.delete("/delete/:id",productController.deleteproduct)
router.put("/update/:id",imageUpload.upload.single('image'),productController.updateproduct)



module.exports=router