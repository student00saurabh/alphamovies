const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {} = require("../middleware.js");
const homeController = require("../controllers/home.js");

//Index Route
router.route("/").get(wrapAsync(homeController.index));

router.route("/movie/:id").get(wrapAsync(homeController.showPage));

module.exports = router;
