const express = require("express");
const router = express.Router();
const Listing = require("../model/listing.js");
const wrapAsync = require("../utils/wrapAsync.js").default;
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");

router.get("/trending",async (req,res)=>{
    let allListings = await Listing.find({ category : "trending" });
    if(!allListings){
        return res.render("listings/noData.ejs");
    }
    res.render("listings/index.ejs",{allListings});
});
router.get("/rooms",async(req,res)=>{
     let allListings = await Listing.find({ category : "rooms" });
    if(!allListings){

        return res.render("listings/noData.ejs");
    }
    res.render("listings/index.ejs",{allListings})
});
router.get("/mountains",async(req,res)=>{
     let allListings = await Listing.find({ category : "mountaines" });
    if(!allListings){

        return res.render("listings/noData.ejs");
    }
    res.render("listings/index.ejs",{allListings})
});
router.get("/swimming",async(req,res)=>{
    // swimmingpool
     let allListings = await Listing.find({ category : "swimmingpool" });
    if(!allListings){

        return res.render("listings/noData.ejs");
    }
    res.render("listings/index.ejs",{allListings})
});
module.exports = router;