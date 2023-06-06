const propertyController = require("../controller/property-controller");
const authToken = require("../middleware/auth");
const express = require("express");
const router = express.Router();


router.get("/getproperty", authToken.checkToken,propertyController.getPropertyData);
router.get("/getproperty/:id",authToken.checkToken, propertyController.getPropertyById);
router.get("/getpropertyType/:type", authToken.checkToken,propertyController.getpropertyByType);
router.post("/postproperty",authToken.checkToken, propertyController.propertyCreate);
router.put("/updatelike/:id",authToken.checkToken, propertyController.updateLike);
router.get("/getpropertybylike",authToken.checkToken, propertyController.getPropertyByLike);
router.get("/getpropertybycity/:search",authToken.checkToken, propertyController.getpropertyByCity);
router.get("/getpropertybycitytype/:type/:search",authToken.checkToken, propertyController.getpropertyByCityType);
module.exports = router;
