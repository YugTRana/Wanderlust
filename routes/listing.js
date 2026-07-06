const express = require("express");
const router = express.Router();
const Listing = require("../model/listing.js");
const Review = require("../model/reviews.js");
const wrapAsync = require("../utils/wrapAsync.js").default;
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const { isLoggedin, isOwner , validListing } = require("../middleware.js");
const listingController = require("../controller/listings.js");

// show all listing
router.get("/", listingController.index);

// render Add Data!!
router.get("/newData", isLoggedin, listingController.renderAddData);

// create route
// here wrapAsync handle a error
router.post("/",isLoggedin,validListing,listingController.AddDataInDb);

// show route
router.get("/:id",listingController.showParticular);

// delete
// deleting of review sin hels in routes that is post method then call after findByIdAndDelete
router.delete("/:id", isLoggedin,isOwner,listingController.deleteListing);

//edit
router.get("/:id/edit", isLoggedin,isOwner,listingController.renderEditForm);
// update
router.put("/:id", isLoggedin,isOwner, listingController.updateData);

// export routes
module.exports = router;