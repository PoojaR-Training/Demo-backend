const forgetPasswordController = require("../controller/resetpassword-controller")
const express = require("express");
const router = express.Router();


router.post("/forgetpassword", forgetPasswordController.forgetPassword);
router.post("/resetpassword/:id",forgetPasswordController.ResetPassword);
module.exports = router;