let express = require('express');
let app = express();
require('dotenv').config();
let bodyParser = require("body-parser");

//#1 = Meet the Node console
      // in package.json file = "start": "node --watch server.js" 
      console.log("Hello World");

//#2 = Start a Working Express Server
   app.get('/', function (req, res) {
      res.send('Hello Express');
   })

   var server = app.listen(5000, function () {
      console.log("Express App running at http://127.0.0.1:5000/");
   })

//#3 = Serve an HTML File
   app.get('/', function (req, res) {
      res.sendFile(__dirname + "/views/index.html");
      res.send('Hello Express');
   })


//#4 = Serve Static Assets
      app.use("/public", express.static(__dirname + "/public"));
      app.get('/', function (req, res) {

         res.sendFile(__dirname + "/views/index.html");
         res.send('Hello Express');
      })


//#5 = Serve JSON on a Specific Route
      app.use("/public", express.static(__dirname + "/public"));
      app.get('/json', function (req, res) {
      
         res.sendFile(__dirname + "/views/index.html");
         // res.send('Hello Express');
         res.json({"message": "Hello json"});
      })
      // o/p=
      // https://3000-freecodecam-boilerplate-lbk105nky24.ws-us115.gitpod.io/json
      // {"message": "Hello json"}



//#6 = Use the .env File
         app.get('/json', function (req, res) {
         if(process.env["MESSAGE_STYLE"] === "uppercase") {
            res.json({"message": "HELLO JSON"});
         }else{
            res.json({"message": "Hello json"});
         };
         //o/p=
         // https://3000-freecodecam-boilerplate-lbk105nky24.ws-us115.gitpod.io/json
         // {"message":"HELLO JSON"}


//#7 = Implement a Root-Level Request Logger Middleware
      app.use((req,res,next)=>{
         console.log(`${req.method} ${req.path} - ${req.ip}`);
         next();
      })
      //o/p=
      //In console = it gets GET /json - 35.230.86.62

//#8 = Chain Middleware to Create a Time Server
      app.get('/now',(req, res,next) => {
         req.time= new Date().toString();
         next();
      }, (req,res)=>{
         res.json({'time': req.time})
      })
   // o/p=
   // https://3000-freecodecam-boilerplate-lbk105nky24.ws-us115.gitpod.io/now
   // {"time":"Sun Aug 04 2024 12:26:08 GMT+0000 (Coordinated Universal Time)"}
   


//#9 = Get Route Parameter Input from the Client
      app.get('/:word/echo',(req,res)=>{
         res.json({echo : req.params.word});
      })
      //    o/p = 
      // https://3000-freecodecam-boilerplate-lbk105nky24.ws-us115.gitpod.io/any/echo
      // {"word":"any"}

 //#10 = Get Query Parameter Input from the Client
      app.get('/name',(req,res)=>{
         res.json({ name : req.query.first + " "+ req.query.last})
      })
      // o/p = https://3000-freecodecam-boilerplate-lbk105nky24.ws-us115.gitpod.io/name?first=Mick&last=Jagger
      // {"name":"Mick Jagger"}

 //#11 = Use body-parser to Parse POST Requests
   app.use(bodyParser.urlencoded({extended: false}));

 //#12 = Get Data from POST Requests
   app.post('/name', (req,res) => {
      res.json({name : req.body.first + " "+ req.body.last});
   })
   // o/p= https://3000-freecodecam-boilerplate-lbk105nky24.ws-us115.gitpod.io
   // {"name":"John Doe"}


   var server = app.listen(5000, function () {
      console.log("Express App running at http://127.0.0.1:5000/");
   })
  
})

 module.exports = app;
