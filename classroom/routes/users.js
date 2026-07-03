const express = require("express");
const router = express.Router();


router.get("/" , (req,res)=>{
    res.send(" Hello in User main!!");
});
router.post("/:id" , (req,res)=>{
    res.send(" Hello in User Id!!");
});

module.exports = router;