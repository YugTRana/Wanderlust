const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../model/listing.js");
const Review = require("../model/reviews.js");
const wrapAsync = require("../utils/wrapAsync.js").default;
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const {isLoggedin , validReview} =require("../middleware.js");
const reviewController = require("../controller/reviews.js");



// delete review
// $pull that delete a value that it has
router.delete("/:reviewid" , isLoggedin, reviewController.deleteReview);
// reviews add
router.post("/",isLoggedin, validReview, reviewController.addReview);

module.exports = router;