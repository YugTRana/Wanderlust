const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../model/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js").default;

router.get("/signup", (req, res) => {
    res.render("user/signup.ejs");
});

router.post("/signup", async (req, res) => {
    try {
        let { username, email, password } = req.body;

        const newUser = new User({ username, email });
        const fuserData = await User.register(newUser, password);
        // console.log(fuserData);
        req.login(fuserData, (err) => {
            if (err) {
                return next(err);
            } else {
                req.flash("msg", "Welcome to Wanderlust!!");
                res.redirect("./listings");
            }
        })

    } catch (e) {

        req.flash("error", "A User is Alredy Exixst!");
        res.redirect("/signup");
    }
});

router.get("/login", (req, res) => {
    res.render("user/login.ejs");
});

// here first we check for data if exists the these miidleware store it
router.post("/login", saveRedirectUrl,passport.authenticate
    ("local",{
        failureRedirect: '/login',
        failureFlash: true
    }),
    ((req, res) => {
        req.flash("msg", "Welcome back to Wanderlust");
        if(!res.locals.newData){ // if user first click login then
            res.locals.newData = "/listings"
        }
        res.redirect(res.locals.newData);
    }));

router.get("/logout", (req, res, next) => {

    req.logout((err) => { // if any error occure then these logout() send in err
        if (err) {
            next(err);
        }

        req.flash("msg", "You Successfully Logout!!");
        res.redirect("/listings");
    });
})

module.exports = router;