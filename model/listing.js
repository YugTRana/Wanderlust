// their is many models!!
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");
const User = require("./user.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        url: String,
        filename: String
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Reviews",
        }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    category: {
        type: String,
        enum: ["rooms", "mountaines", "swimming", "trending"]
    },
    geometry: {
        type: {
            type: String,
            enum: ["Point"],
            required: true,
        },
        coordinates: {
            type : [Number],
            required : true
        }
    }
});
// these is post middleware these call automatically after findByIdAndDelete Call
listingSchema.post("findOneAndDelete", async (listing) => {
    // console.log(listing);
    if (listing) {
        let res = await Review.deleteMany({ _id: { $in: listing.reviews } });
        console.log(res);
    }
});
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;


