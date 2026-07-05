const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../model/listing.js");

main().then(()=>{
    console.log("Connected to Db");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDb = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>{
        // ...obj here "..." is a spread operator that use to make a copies of cyrrent data!!
        // always map return a new array
        return ({...obj , owner : "6a47581f7987854a11ad3d26"});
    })
    await Listing.insertMany(initData.data);
    console.log("Data Is Initialized!!");
}

initDb();