const listing = require("../models/listing.js");
const axios = require("axios");

module.exports.index = async (req,res)=>{
    const allListing = await listing.find({});
    res.render("listing/index.ejs",{allListing});

};

module.exports.newFormRender =  (req,res)=>{
  // console.log(req.user);
  res.render("listing/new");
};

module.exports.showRoute = async (req,res)=>{
    let {id} = req.params // <---extracts the id form each 
    const Foundlisting = await listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");  //find ele by id 
     if (!Foundlisting) {
      req.flash("error","Requested Listing Does Not Exist!")
      return res.redirect("/listing");
     }
    // console.log(Foundlisting);
    res.render("listing/show",{listing:Foundlisting});
    

}

module.exports.searchRoute = async(req,res) => {
 const {location} = req.query;

 let allListing;
   if (!location || location.trim() === "") {
    allListing = await listing.find({});
  } else {
    allListing = await listing.find({
      $or: [
        { location: { $regex: location, $options: "i" } },
        { country: { $regex: location, $options: "i" } },
        { title: { $regex: location, $options: "i" } }
      ]
    });
      res.render("listing/index.ejs", { allListing });
  }


}

module.exports.createPostRoute = module.exports.createPostRoute = async (req, res, next) => {

  console.log(req.file);
  console.log(req.body);

  if (!req.file) {
    req.flash("error", "Image upload failed");
    return res.redirect("/listing/new");
  }

  let url = req.file.secure_url;
  let filename = req.file.public_id;

  console.log(url, "..", filename);

   let { title, description, price, country, location } = req.body.listing;

   const geoData = await axios.get(
  "https://nominatim.openstreetmap.org/search",
  {
    params: {
      q: location,
      format: "json",
      limit: 1
    },
    headers: {
      "User-Agent": "WonderLust-App"
    }
  }
);


  if (!geoData.data.length) {
    req.flash("error", "Location not found on map");
    return res.redirect("/listing/new");
  }

  const lat = geoData.data[0].lat;
  const lon = geoData.data[0].lon; 

 

  const newListing = new listing({
    title,
    description,
    price,
    country,
    location,
    image: { url, filename },
     geometry: {
      type: "Point",
      coordinates: [lon, lat]
    }
  });

  newListing.owner = req.user._id;
  await newListing.save();
  console.log(newListing.geometry);

  req.flash("success", "New Listing Created!");
  res.redirect("/listing");
};

module.exports.editRoute = async (req,res)=>{
     let {id} = req.params;
     const Foundlisting = await listing.findById(id);      
    res.render("listing/edit",{listing:Foundlisting});
};

module.exports.updateRoute = async (req, res) => {
  const { id } = req.params;

  if (!req.body.listing) {
    throw new Expresserror(400, "Invalid Listing Data");
  }

  let { title, description, price, country, location } = req.body.listing;

  
  const geoData = await axios.get(
    "https://nominatim.openstreetmap.org/search",
    {
      params: {
        q: location,
        format: "json",
        limit: 1
      }
    }
  );

  if (!geoData.data.length) {
    req.flash("error", "Location not found on map");
    return res.redirect(`/listing/${id}/edit`);
  }

  const lat = parseFloat(geoData.data[0].lat);
  const lon = parseFloat(geoData.data[0].lon);

  const updatedListing = await listing.findByIdAndUpdate(
    id,
    {
      title,
      description,
      price,
      country,
      location,
      geometry: {
        type: "Point",
        coordinates: [lon, lat]
      }
    },
    { new: true, runValidators: true }
  );

  if (req.file) {
    let url = req.file.secure_url;
    let filename = req.file.public_id;
    updatedListing.image = { url, filename };
    await updatedListing.save();
  }

  req.flash("success", "Listing Updated Successfully!");
  res.redirect(`/listing/${id}`);
};


module.exports.destroyRoute = async(req,res)=>{
  const { id } = req.params;
   const deletelisting = await listing.findByIdAndDelete(id);
   req.flash("success"," Listing Deleted!");
   res.redirect("/listing");
};