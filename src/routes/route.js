const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)
router.get("/cowin/getByDistrictId", CowinController.getByDistrictId)
router.get("/cowin/getWeather", CowinController.getWeather)
router.get("/cowin/getCitiesSortedByTemp", CowinController.getCitiesSortedByTemp)
router.post("/cowin/createMeme", CowinController.createMeme)
router.post("/cowin/getOtp", CowinController.getOtp)


module.exports = router;