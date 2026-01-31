const express = require("express");
const router =  express.Router();
const WrapAsync = require("../utils/wrapAsync.js");
const passport =  require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");


router
.route("/signUp")
.get(userController.newSignUp)
.post( WrapAsync(userController.postSignUpRoute));

router
.route("/login")
.get(userController.getLogin)
.post(
    saveRedirectUrl, 
    passport.authenticate(
        'local', { failureRedirect: '/login' ,failureFlash:true}), 
        userController.postLoginRoute
     );

router.get("/logout",userController.userLogOut);


module.exports = router;
