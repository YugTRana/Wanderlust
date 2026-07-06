let Listing  = require("./model/listing.js");
let {listingSchema , reviewSchema} = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

// for listing Backend Validation
module.exports.validListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(" , ");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};
// for Review Backend Validation!!
module.exports.validReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(" , ");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}


module.exports.isLoggedin = (req,res,next)=>{
   // console.log(`${req.originalUrl} and  ${req.path}`);
     if(!req.isAuthenticated()){
      // if user not login then we save a data of user
      req.session.redirectUrl = req.originalUrl; // here we save a data in session
      req.flash("error","You Must Logged in to create Listing!!");
       return res.redirect("/login");
    }
    next();
}

// after login the passprt is erase the session information so we add a data in locals first 
module.exports.saveRedirectUrl = (req,res,next)=>{

   
   if(req.session.redirectUrl){ // if exist then
      res.locals.newData = req.session.redirectUrl; // we save in newData
      console.log(res.locals.newData);
   }
   next();
}

module.exports.isOwner = async(req,res,next)=>{

   let{id} = req.params;
    let listing = await Listing.findById(id);
       console.log(listing);
       if(!listing.owner.equals(res.locals.currUser._id)){
           req.flash("error","Not access!!");
           return res.redirect(`/listings/${id}`);
       }
       next();
}

