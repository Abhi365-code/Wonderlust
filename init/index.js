const mongoose = require("mongoose");
const data = require("./data.js");
const listing = require("../models/listing.js");

const MONGO_URL = 'mongodb://127.0.0.1:27017/wonderlust' 

async function main() {
    await mongoose.connect(MONGO_URL);
};

const initDB = async ()=>{
    await listing.deleteMany({});
    data.data = data.data.map((obj)=>({...obj,owner:"6959788b6266507d3663584a"}));
    await listing.insertMany(data.data)
    console.log("data was initilized");
}


main()
.then(initDB)
.catch((error)=>{
    console.log(error);
});




