const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/posts.js");
const session = require("express-session");
const flash = require("connect-flash");
//for cookies implementation.
// const cookieParser = require("cookie-parser");

// app.use(cookieParser());
// app.use("/users",users);
// app.use("/posts",posts);

//session middleware...
app.use(session({
    secret:"mySuperString",
    resave:false,
    saveUninitialized:true,

}));
//flash middleware...
  app.use(flash());


app.get("/register",(req,res)=>{
    let {name = "anonymous"} = req.query;
    req.session.name = name;
    console.log(req.session.name);
    res.send(name);
})

app.get("/hellow",(req,res)=>{
    res.send(`hellow ${req.session.name}`);
})

// app.get("/reqcount",(req,res)=>{
//     if( req.session.count){
//          req.session.count++;
//     }else{
//          req.session.count = 1;
//     }

//     res.send(`you sent a request ${req.session.count } times`);
// });



// app.get("/test",(req,res)=>{
//     res.send("test is sussesful");
// });

// app.get("/getsingedcookie",(req,res)=>{
//     res.cookie("made-in","india", {Signed : true} );
//     res.send("Signed cookie send");
// });

// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","nameste");
//     res.cookie("name","Abhishek");
//     res.send("send some cookies");
// });

// app.get("/",(req,res)=>{
//     console.log(req.signedCookies);
//     res.send("Hi,I am Root!!");
// }); t





app.listen(3000,(req,res)=>{
    console.log("Server is Listening on Port 3000");
});
