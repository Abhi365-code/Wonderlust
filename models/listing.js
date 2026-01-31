const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        url:String,
        filename:String, 
        // set: (v)=>
        //     v ===""
        // ? "https://plus.unsplash.com/premium_photo-1763304299348-fa91c6dc25ef?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
    },
    price:{
        type:Number,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"review",
        },
    ],
    owner: {
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    geometry: {
      type: {
      type: String,
      enum: ["Point"],
      default: "Point",
      required: true
  },
    coordinates: {
    type: [Number],
    required: true
  }
}
})

listingSchema.post("findOneAndDelete",async(listing) => {
    if(listing){
        await Review.deleteMany({_id: { $in: listing.review }});
    }
})


const listing = mongoose.model("listing",listingSchema);
module.exports = listing;