const express = require("express");
const router =  express.Router({mergeParams : true});
const WrapAsync = require("../utils/wrapAsync.js");
const {validateReview,isLoggedIn,isReviewAuthor} = require("../middleware.js")
const reviewController = require("../controllers/reviewss.js");


//reviews
//post route
router.post("/",
  isLoggedIn,
  validateReview, 
  WrapAsync(reviewController.postReviewRoute));

//delete review route

router.delete("/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  WrapAsync(reviewController.deleteReviewRoute));
       
module.exports = router;
