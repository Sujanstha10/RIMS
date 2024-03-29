const express = require("express");
const router = express.Router();
const productSupplierController = require("../controller/productSupplier.contoller");
const verifyMiddleware = require("../middleware/verifacation");
const imageUpload = require("../helpers/image-uploader");

router.put("/addstock/:id",productSupplierController.addStock)
router.get("/",productSupplierController.showProductSupplier)
router.get("/:id",productSupplierController.showProductSupplierById)
// router.get("/total",productSupplierController.fetchSimilarProductsAndCalculateTotal)
module.exports = router;
