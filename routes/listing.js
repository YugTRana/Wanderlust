const express = require("express");
const router = express.Router();
const Listing = require("../model/listing.js");
const Review = require("../model/reviews.js");
const wrapAsync = require("../utils/wrapAsync.js").default;
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const { isLoggedin, isOwner } = require("../middleware.js");

const validListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(" , ");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};
// show all listing
router.get("/", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});

router.get("/newData", isLoggedin, (req, res) => {
    res.render("listings/add.ejs");
});
// create route
// here wrapAsync handle a error
router.post("/", validListing, isLoggedin, wrapAsync(async (req, res, next) => {
    let result = listingSchema.validate(req.body);
    console.log(result);
    const newListing = new Listing(req.body.listing);
    console.log(req);  // these is bydefault save by passport means all data are store in passprt
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("msg", "New Listing Created!!");  //  when new data create then flash
    res.redirect("/listings");
}));

// show route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate({
        path: "reviews",
        populate: {
            path: "reviewOwner"
        }
    }).populate("owner");
    //  console.log(listing);

    if (!listing) {
        req.flash("error", "ERROR!! NOT FOUND!!");
        throw new ExpressError(404, "Listing not found");
    }
    res.render("listings/show.ejs", { listing });
}));

// delete
router.delete("/:id", isLoggedin,isOwner, async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);

    req.flash("msg", "Listing Deleted!!");
    res.redirect("/listings");
});
//edit
router.get("/:id/edit", isLoggedin,isOwner, async (req, res) => {

    let { id } = req.params;
    const listing = await Listing.findById(id);

    res.render("listings/edit.ejs", { listing });
});
// update
router.put("/:id", isLoggedin,isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    req.flash("msg", "Listing Updated!!");
    res.redirect(`/listings/${id}`);
}));
module.exports = router;