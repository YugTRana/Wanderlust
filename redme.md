Express Router :   it is a way to organize a express router!!
Cokkies : Small Block of data thata Store on browser!!

[Object: null prototype] { 'made-in': 'india' }    when cookies value is correct 
[Object: null prototype] {}                 when cookies value is totally changes
[Object: null prototype] { 'made-in': false }  when cookies only content chnage!!


STATE :: 
  statefull protocol : require server for save the session and status information
  stateless protocol : not require server for save the session and status information


Express-session : these npm package is use to store a session require information
  we first require these in our file and then we set  a --> resave to false and ---> saveUninitialized to true and main we add a secret value
  if we write a req.session then we get a particullar information about session 
  we also add a variable in session like req.session.name here we add a name in session and we use these name variable in anywhere in every session!!

Connect-flash : these is NOM Package!!
    use to flash the message!!

Authentication : is the process of verifying who someone is 
autherization :  is the process of verifying that which user has how much access of files!!


we never store a password as it is  we store their hashing form!!

Passport : Passport is Express-compatible authentication middleware for Node.js. 


user Model --- 

MVC - model view controller
model -  to store a models
view - put files that we want to render
Controllers - add backend core functionality

router.route 
: to add a same request at same place!!

use multer for a  uploding image file!!

use cloudinary for uploading a files

dotenv : these is package that we use to work means to aceess the data of .env file
npm i multer-storage-cloudinary
npm i cloudinary 

there is two type of npm package that is basically made for Cloudinary!!