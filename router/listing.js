const express = require("express");
const router =  express.Router();
const WrapAsync = require("../utils/wrapAsync.js");
const listing = require("../models/listing.js");
const { isLoggedIn,isOwner,validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudconfig.js");
const upload = multer({ storage });

//index Route
//create post route 
router
.route("/")
.get( WrapAsync(listingController.index))
.post(
  isLoggedIn,
  upload.single('listing[image]'),
  validateListing,
  WrapAsync(listingController.createPostRoute));

router.get("/search",WrapAsync(listingController.searchRoute))

//new route 
router.get("/new",
  isLoggedIn,
  listingController.newFormRender
 );

//show route
router
.route("/:id")
.get(
  WrapAsync(listingController.showRoute))
.put(
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  WrapAsync(listingController.updateRoute))
.delete(
  isLoggedIn,
  isOwner,
  WrapAsync(listingController.destroyRoute));

//Edit Route 
router.get("/:id/edit",
  isLoggedIn,
  isOwner,
  WrapAsync(listingController.editRoute));

//update route old code hold for some reuse!!
// app.put("/listing/:id",async (req,res)=>{
//     let {id} = req.params;
//     await listing.findByIdAndUpdate(id,{...req.body.listing});
//     res.redirect("/listing");
// })


module.exports = router;
