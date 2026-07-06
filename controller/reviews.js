const Listing = require("../model/listing.js");
const Review = require("../model/reviews.js");
const wrapAsync = require("../utils/wrapAsync.js").default;
const ExpressError = require("../utils/ExpressError.js");
// delete review
module.exports.deleteReview =  wrapAsync(async(req,res)=>{
    let{id , reviewid } = req.params;
    // here these will delete my review from listing 
    await Listing.findByIdAndUpdate(id , {$pull : {reviews : reviewid}});
    // these will delete from review schema
    await Review.findByIdAndDelete(reviewid);

    req.flash("msg","review Deleted!!");
    res.redirect(`/listings/${id}`);
});
//add review!!
module.exports.addReview = wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReviews = new Review(req.body.reviews);
    newReviews.reviewOwner = req.user._id.toString();
    console.log(newReviews);
    listing.reviews.push(newReviews._id);

    await newReviews.save();
    await listing.save();

    console.log("SuccessFull");
    req.flash("msg","review Added!!");
    res.redirect(`/listings/${listing._id}`);
})