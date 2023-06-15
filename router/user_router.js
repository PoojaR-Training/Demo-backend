const userController = require("../controller/user-controller");
const forgetPasswordController = require("../controller/resetpassword-controller")
const express = require("express");
const authToken = require("../middleware/auth");
const router = express.Router();
const multer = require("multer");
const upload = multer({dest:'./upload/'})

router.post("/login", userController.userLogin);
router.post("/register", userController.userRegister);
router.get("/userbyid/:id",authToken.checkToken, userController.getUserById);
router.put("/userimage/image/:id",authToken.checkToken, upload.single('image'),userController.userImageUpload);
router.get('/userbyid/:id',authToken.checkToken, userController.getUserById)
module.exports = router;