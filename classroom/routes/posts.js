const express = require("express");
const router = express.Router();


router.get("/" , (req,res)=>{
    res.send(" Hello in Post main!!");
});
router.post("/:id" , (req,res)=>{
    res.send(" Hello in Post Id!!");
});

module.exports = router;    