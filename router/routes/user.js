
const express = require("express");
const router = express.Router();

//users

router.get("/",(req,res)=>{
   res.send("Get For Users");
});

router.get("/:id",(req,res)=>{
    res.send("Get For Show Users");
})

router.post("/",(req,res)=>{
    res.send("Post For Users");
})

router.delete("/:id",(req,res)=>{
    res.send("Delete For Users Id");
})

module.exports = router;