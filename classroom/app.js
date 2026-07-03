const express = require("express");
const app = express();
const users = require("./routes/users.js");
const posts = require("./routes/posts.js");
var cookieParser = require('cookie-parser');
const path = require("path");
const flash = require("connect-flash");

// now we use a express Session
const session = require("express-session");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));


// app.use(cookieParser("secretcode"));
app.listen(3000, () => {
    console.log(" Working on 3000!!");
});

app.use(session({ secret: "mysupersecretcode", resave: false, saveUninitialized: true }));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errMsg = req.flash("error");

    next();
})

app.get("/register",(req,res)=>{
    let{name = "anonymous"} = req.query;
    req.session.name = name;
   
    if(name === "anonymous"){
        req.flash("error","Un Authorised!!");
    }else{
        req.flash("success","Authorised!!");
    }
    
    // req.flash("success","User Registerd Successfully!!");
    res.redirect("/new")
});
app.get("/new" , (req,res)=>{
    //  msg : req.flash("success")  ,
    res.render("page.ejs",{ name : req.session.name});
});


// app.get("/test", (req, res) => {
//    if(req.session.count){
//     req.session.count++;
//    }else{
//     req.session.count = 1;
//    }

//    res.send(` hello count : ${req.session.count}`);
// });



// app.get("/",(req,res)=>{
//     let{name = "anonymous"} = req.cookies;
//     res.send(`Hello ${name}`);
// });
// app.get("/page",(req,res)=>{
//     res.render("index.ejs");
// })
// app.get("/login",(req,res)=>{
//     let{name} = req.query;
//     console.log(name);
//     res.cookie("name",`${name}`);
//     res.redirect("/");
// });

// app.get("/login2",(req,res)=>{
//     let{name = "anonymous"} = req.cookies;
//     res.send(` these website is build by ${name}`);

// });
// app.get("/show",(req,res)=>{
//      let{name = "anonymous"} = req.cookies;
//      if(name === "yug"){

//         res.send(" WELCOME ADMIN!!!! ");
//      }else{
//         res.send(" NOT ACEESS!! ");
//      }
// });

// app.get("/getsignerdcokkies" , (req,res)=>{
//     res.cookie("made-in" , "india" , {signed : true});
//     res.send("signed Cookies!!");
// });

// app.get("/verify" , (req,res)=>{
//     console.log(req.signedCookies);
//     res.send("Verified!!");
// })

// app.get("/getCookies",(req,res)=>{
//     res.cookie("India","Made and Make in India")
//     res.cookie("greet" , "hello!!");
//     res.cookie("name","Yug Rana");
//     res.send(" Hello Cookies!! ");
// });
// app.use("/users",users);
// app.use("/posts",posts);
