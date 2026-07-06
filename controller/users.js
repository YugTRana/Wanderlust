const User = require("../model/user.js");

module.exports.addUserInDb = async (req, res) => {
    try {
        let { username, email, password } = req.body;

        const newUser = new User({ username, email });
        const fuserData = await User.register(newUser, password);
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
};

module.exports.authenticationViaPassport = ((req, res) => {
        req.flash("msg", "Welcome back to Wanderlust");
        if(!res.locals.newData){ // if user first click login then
            res.locals.newData = "/listings"
        }
        res.redirect(res.locals.newData);
    });

module.exports.logout =  (req, res, next) => {

    req.logout((err) => { // if any error occure then these logout() send in err
        if (err) {
            next(err);
        }
        req.flash("msg", "You Successfully Logout!!");
        res.redirect("/listings");
    });
};