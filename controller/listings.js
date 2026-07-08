const Listing = require("../model/listing.js");
const wrapAsync = require("../utils/wrapAsync.js").default;
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");

// first page (All Listings!!)
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

// render add
module.exports.renderAddData = (req, res) => {
    res.render("listings/add.ejs");
};

// create data
module.exports.AddDataInDb =  wrapAsync(async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;

    // console.log(path+" ... "+filename);

    let result = listingSchema.validate(req.body);
    const newListing = new Listing(req.body.listing);
    // console.log(req);  // these is by default save by passport means all data are store in passprt
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    
    await newListing.save();
    req.flash("msg", "New Listing Created!!");  //  when new data create then flash
    res.redirect("/listings");
});

//show Particular Listing
module.exports.showParticular =  wrapAsync(async (req, res) => {
    let { id } = req.params;
    // these is known as nesting og populate
    let listing = await Listing.findById(id).populate({
        path: "reviews",
        populate: {
            path: "reviewOwner"
        }
    }).populate("owner");
    if (!listing) {
        req.flash("error", "ERROR!! NOT FOUND!!");
        throw new ExpressError(404, "Listing not found");
    }
    res.render("listings/show.ejs", { listing });
});

// Delete Listing and review's delete in Post methos of Lisiting!! 
module.exports.deleteListing =  async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);

    req.flash("msg", "Listing Deleted!!");
    res.redirect("/listings");
};

// render Edit form!!
module.exports.renderEditForm =  async (req, res) => {

    let { id } = req.params;
    const listing = await Listing.findById(id);

    res.render("listings/edit.ejs", { listing });
};

// update final!!
module.exports.updateData = wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing } , {new : true});
    if (req.file) {
        let url = req.file.path;
        let filename = req.file.filename;

        listing.image = { url, filename };
        await listing.save();
    }


    req.flash("msg", "Listing Updated!!");
    res.redirect(`/listings/${id}`);
});