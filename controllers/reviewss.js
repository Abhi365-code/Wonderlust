const Review = require("../models/review.js");
const listing = require("../models/listing.js");

module.exports.postReviewRoute = async (req, res) => {

  console.log(req.body); // must show review object

  const foundListing = await listing.findById(req.params.id);

  const newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  await newReview.save();

  foundListing.reviews.push(newReview._id);
  await foundListing.save();

  req.flash("success","New Review Created!");
  // res.send("New Review Saved");
  res.redirect(`/listing/${foundListing._id}`);
}

module.exports.deleteReviewRoute = async(req,res)=>{
  let {id,reviewId} = req.params;

  await listing.findByIdAndUpdate(id,{$pull: {reviews:reviewId}});
  await Review.findByIdAndDelete(reviewId);

  req.flash("success","Review Deleted!");
  res.redirect(`/listing/${id}`);
}