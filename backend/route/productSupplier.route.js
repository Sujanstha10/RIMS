const express = require("express");
const router = express.Router();
const productSupplierController = require("../controller/productSupplier.contoller");
const verifyMiddleware = require("../middleware/verifacation");
const imageUpload = require("../helpers/image-uploader");

router.put("/:id",productSupplierController.addStock)
router.get("/",productSupplierController.showProductSupplier)
module.exports = router;
