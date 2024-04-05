const router = require("express").Router();

const getCountryInfoController = require("../controllers/country-info");

const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", getCountryInfoController.getAllCountryInfo);

router.get("/:id", getCountryInfoController.getCountryInfo);

router.post("/", isAuthenticated, getCountryInfoController.createCountryInfo);

router.put("/:id", isAuthenticated, getCountryInfoController.updateCountryInfo);

router.delete("/:id", isAuthenticated, getCountryInfoController.deleteCountryInfo);

module.exports = router;