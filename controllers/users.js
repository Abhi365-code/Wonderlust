const User = require("../models/user.js");

module.exports.newSignUp = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.postSignUpRoute = async(req,res)=>{
        try{
             let {username,email,password} = req.body;
             const newUser = new User({email,username});
             const registredUser = await User.register(newUser,password);
             console.log(registredUser);
             req.login(registredUser,(err)=>{
                if(err){
                     return next(err)
                }
                   req.flash("success","Welcome to WonderLust");
                   res.redirect("/listing");
             });
           }catch(e){
             req.flash("error",e.message);
             res.redirect("/signUp");
          }

};

module.exports.getLogin = (req,res)=>{
    res.render("users/login.ejs")
};

module.exports.postLoginRoute = async(req,res)=>{
    req.flash("success","Welcome back to WonderLust!");
    let redirectUrl = res.locals.redirectUrl || "/listing";
    res.redirect(redirectUrl);
};

module.exports.userLogOut = (req,res)=>{
   req.logout((err)=>{
    if(err){
        next(err);
    }
    req.flash("success","You Are Logged Out!!");
    res.redirect("/listing");
   })
};