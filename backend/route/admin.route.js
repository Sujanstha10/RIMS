const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin.controller")
const {validateAdmin} = require("../middleware/FormValidator")

const token = require("../middleware/verifacation")




router.post("/login",validateAdmin,adminController.login)
router.get("/me",token.verification,adminController.profile)
router.get("/",adminController.allcount)




module.exports=router