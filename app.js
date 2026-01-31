const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();
if(process.env.NODE_ENV !="production"){
require('dotenv').config();
};
const express = require("express"); 
const app = express();
const mongoose = require("mongoose");
const PORT = 8080;
const path  = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const Expresserror = require("./utils/expresserror.js"); 
const listingRouter = require("./router/listing.js");
const reviewRouter = require("./router/reviews.js");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const flash = require("connect-flash");
const passport =  require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const userRouter = require("./router/user.js");
const listing = require("./models/listing");



//mongo url connections
dbURL = process.env.ATLASDB_URL;

async function main() {
    await mongoose.connect(dbURL);
}

main()
.then(()=>{
    console.log("connected to DB");
})
.catch((error)=>{
    console.log(error);
    
}); 

const store = MongoStore.create({
  mongoUrl:dbURL,
  crypto: {
    secret:process.env.SECRET
  },
    touchAfter: 7 * 3600
})

store.on("error" ,()=>{
  console.log("error in mongo session store",err);
})
//middlewares for parsing data and for import-export works.
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const sessionOptions = {
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
      expires:Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge:7 * 24 * 60 * 69 * 1000,
      httpOnly:true
    }
}



app.use(session(sessionOptions));//for session connection
app.use(flash());//for flash message 
app.use(passport.initialize());//passort initalization
app.use(passport.session()); //session initialization
passport.use(new LocalStrategy(User.authenticate())); //for authentication

passport.serializeUser(User.serializeUser()); //serialization of user schema 
passport.deserializeUser(User.deserializeUser());  //deserialization of user schema 


app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user; 
  next();
})

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

app.get("/", async (req, res) => {
  const allListing = await listing.find({});
  res.render("listing/home.ejs", { allListing });
});


// app.get("/demoUser", async (req,res)=>{
//   let fakeUser = new User({
//     email:"abhishek@845gmail.com",
//     username:"Abhishek"
//   });

//   let registredUser = await User.register(fakeUser,"helloworld");
//   res.send(registredUser);

// })



//using router import 

app.use("/listing",listingRouter);
app.use("/listing/:id/reviews",reviewRouter);
app.use("/",userRouter);

app.use((req,res,next)=>{
  next(new Expresserror(404,"Page Not Found"));
})

app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Something went wrong";

  res.status(status).render("listing/Error", { 
    status,
    message
   });
});

app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
});

