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
      console.log( res.locals.newData);
   }
   next();
}