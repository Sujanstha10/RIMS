const express = require("express");
const router = express.Router();
const categoryController = require("../controller/category.controller")
const verifyMiddleware = require("../middleware/verifacation")





router.post("/add",categoryController.addcategory)
router.get("/",categoryController.allcategory)
router.get("/:id",categoryController.showcategory)
router.delete("/delete/:id",categoryController.deletecategory)
router.put("/update/:id",categoryController.updatecategory)



module.exports=router