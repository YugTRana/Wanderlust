const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../model/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js").default;
const userController = require("../controller/users.js");

router.get("/signup", (req, res) => {
    res.render("user/signup.ejs");
});

router.post("/signup", userController.addUserInDb);

router.get("/login", (req, res) => {
    res.render("user/login.ejs");
});

// here first we check for data if exists the these miidleware store it
router.post("/login", saveRedirectUrl, passport.authenticate
    ("local", {
        failureRedirect: '/login',
        failureFlash: true
    }),
    userController.authenticationViaPassport);

router.get("/logout",userController.logout);

module.exports = router;