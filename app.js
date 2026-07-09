if(process.env.NODE_ENV != "production"){
    // at time of deploy we don't want to add these so!!
    require("dotenv").config();
}
// console.log(process.env.SECRET);
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("@simonsmith/ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js").default;
const ExpressError = require("./utils/ExpressError.js");

// Routers
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const filterRoute = require("./routes/filter.js");

const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const Localstrategy = require("passport-local").Strategy;
const User = require("./model/user.js");
const Listing = require("./model/listing.js");


// i have to see a error part second time that is in phase 1 part 3
main().then(() => {
    console.log("Connected to Db");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

let port = 8080;
app.listen(port, () => {
    console.log("http://localhost:8080/");
});

let sessionOption = {
    secret : "mysupersecretcode",
    resave : false,
    saveUninitialized : true,
    cookie : {
        // store for 7 days
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000, // we convert these in milisecond so * 1000
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true  // for security purpose only!!
    }
};

app.get("/", (req, res) => {
    res.send("Hello i Am Root!!");
});

app.use(session(sessionOption));
app.use(flash()); // these line should written upper the listing and review routes

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.msg = req.flash("msg");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});
app.get("/search",async(req,res)=>{

    console.log(req.query);
    let{value} = req.query;
    console.log(value);

    let allListings = await Listing.find({title : value});
    if(allListings.length > 0){
       res.render("listings/index.ejs", { allListings });
    }else{
        req.flash("error","No Listing Found!!");
        res.redirect("/listings");
    }
});

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/filter",filterRoute);
app.use("/",userRouter);

app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});
// to ERROR!!!
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;

    res.locals.msg = req.flash("msg");
    res.locals.error = req.flash("error");

    res.status(statusCode).render("error.ejs", { err });
});



