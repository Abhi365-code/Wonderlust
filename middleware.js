const listing = require("./models/listing"); 
const Expresserror = require("./utils/expresserror.js"); 
const { listingSchema} = require("./schema.js");
const { reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");

module.exports.isLoggedIn = (req,res,next) =>{
    // console.log(req);
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
    req.flash("error","You must be logged in to create listing");
    return res.redirect("/login");
    }
    next();
};


module.exports.saveRedirectUrl = (req,res,next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner= async(req,res,next) =>{
  const { id } = req.params;
  const foundListing = await listing.findById(id);

  if (!foundListing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listing");
  }
  // OWNER CHECK FIRST
  if (!foundListing.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the owner. You are not able to update or delete!.");
    return res.redirect(`/listing/${id}`);
  }
  next();
};

module.exports.validateListing = (req,res,next)=>{
  let {error} = listingSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map((el)=>el.message).join(",");
    throw new Expresserror(400,errMsg);
  }else{
    next();
  }
}


module.exports.validateReview = (req,res,next)=>{
  let {error} = reviewSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map((el)=>el.message).join(",");
    throw new Expresserror(400,errMsg);
  }else{
    next();
  }
}

module.exports.isReviewAuthor= async(req,res,next) =>{
  const { id,reviewId } = req.params;
  const review = await Review.findById(reviewId);

  if (!review) {
    req.flash("error", "Listing not found");
    return res.redirect("/listing");
  }
  // OWNER CHECK FIRST
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", " You are not the author of this review.");
    return res.redirect(`/listing/${id}`);
  }
  next();
};