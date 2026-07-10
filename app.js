if(process.env.NODE_ENV != "production"){
    // at time of deploy we don't want to add these so!!
    require("dotenv").config();
};
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
const MongoStore = require("connect-mongo").default;
const passport = require("passport");
const Localstrategy = require("passport-local").Strategy;
const User = require("./model/user.js");
const Listing = require("./model/listing.js");
const nodemailer = require("nodemailer");

let dbUrl = process.env.ATLAS_DB_URL;

// i have to see a error part second time that is in phase 1 part 3
main().then(() => {
    console.log("Connected to Db");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

let port = 8080;
app.listen(port, () => {
    console.log("http://localhost:8080/");
});
const store = MongoStore.create({
    mongoUrl : dbUrl ,
    crypto : {
        secret : process.env.SECRET,
        // if session not change then we not reload so we add touch after
    },
    touchAfter : 24 * 3600,
})
store.on("error",()=>{
    console.log("ERROR IN MONGO SESSION STORE!! ",err);
});
let sessionOption = {
    store,
    
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {
        // store for 7 days
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000, // we convert these in milisecond so * 1000
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true  // for security purpose only!!
    }
};

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
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL,
        pass: process.env.EMAIL_PASS
    }
});

app.get("/", (req, res) => {
    res.render("listings/home.ejs");
});
app.post("/send-query", async (req, res) => {
    const { name, email, message } = req.body;
    console.log(name);
    console.log(email);
    console.log(message);

    // Validate input
    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "All fields are required."
        });
    }

    try {
        await transporter.sendMail({
            from: `"Wanderlust Website" <${process.env.GMAIL}>`,
            replyTo: email,
            to: process.env.GMAIL, // Receive emails on your Gmail
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2 style="color:#0d6efd;">📩 New Contact Form Submission</h2>

                    <table style="border-collapse: collapse; width: 100%;">
                        <tr>
                            <td style="padding:8px;"><strong>Name</strong></td>
                            <td style="padding:8px;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding:8px;"><strong>Email</strong></td>
                            <td style="padding:8px;">${email}</td>
                        </tr>
                    </table>
                    <hr>
                    <h3>Message</h3>
                    <p>${message}</p>
                    <hr>
                    <small>This email was sent from the Wanderlust Contact Form.</small>
                </div>
            `
        });

        // req.flash("msg","Mail Sent!!");
        // res.redirect("/");
        return res.status(200).json({
            success: true,
            message: "Your query has been sent successfully!"
        });

    } catch (err) {
        // req.flash("error","Mail Not Sent!!");
        // return res.redirect("/");

        return res.status(500).json({
            success: false,
            message: "Failed to send email. Please try again later."
        });
    }
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