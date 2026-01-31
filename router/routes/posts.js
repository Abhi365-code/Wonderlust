const express = require("express");
const router = express.Router();

//posts router

router.get("/",(req,res)=>{
    res.send("Get For Post");
});

router.get("/:id",(req,res)=>{
    res.send("Get For Show Post");
});

router.post("/",(req,res)=>{
    res.send("Post For Posts");
});

router.delete("/:id",(req,res)=>{
    res.send("Delete For Posts Id");
});

module.exports = router;
