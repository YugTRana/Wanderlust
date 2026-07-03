const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../model/listing.js");
const Review = require("../model/reviews.js");
const wrapAsync = require("../utils/wrapAsync.js").default;
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const {isLoggedin} =require("../middleware.js");

const validReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(" , ");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

// delete review
// $pull that delete a value that it has
router.delete("/:reviewid" , isLoggedin, wrapAsync(async(req,res)=>{
    let{id , reviewid } = req.params;
    // here these will delete my review from listing 
    await Listing.findByIdAndUpdate(id , {$pull : {reviews : reviewid}});
    // these will delete from review schema
    await Review.findByIdAndDelete(reviewid);

    req.flash("msg","review Deleted!!");
    res.redirect(`/listings/${id}`);
}));
// reviews 
router.post("/", validReview,isLoggedin, wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReviews = new Review(req.body.reviews);

    listing.reviews.push(newReviews);

    await newReviews.save();
    await listing.save();

    console.log("SuccessFull");
    req.flash("msg","review Added!!");
    res.redirect(`/listings/${listing._id}`);
}));

module.exports = router;