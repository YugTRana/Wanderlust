const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user.js");

const reviewSchema = new Schema({
    comment : String ,
    rating : {
        type : Number,
        min : 1 ,
        max : 5
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    reviewOwner : {
        type :  Schema.Types.ObjectId,
        ref : "User",
    }
});

let Reviews = mongoose.model("Reviews",reviewSchema);
module.exports = Reviews;