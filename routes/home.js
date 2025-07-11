const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn } = require("../middleware.js");
const homeController = require("../controllers/home.js");

//Index Route
router.route("/").get(wrapAsync(homeController.index));

router.route("/movie/:id").get(wrapAsync(homeController.showPage));

router.route("/about").get(wrapAsync(homeController.aboutPage));

router.route("/yourmovies").get(wrapAsync(homeController.yourmoviesPage));
router
  .route("/yourmovies/:id")
  .post(isLoggedIn, wrapAsync(homeController.saveMovie));

module.exports = router;
