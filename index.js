let express = require("express");
let mongoose = require("mongoose");
require("dotenv").config();

//connect to MongoDb

let app = express();



mongoose.connect(process.env.DBURL).then(() => {
  console.log("Connected to MongoDb");
  app.listen(process.env.PORT,(()=>{
    console.log("Server is running on port " + process.env.PORT);
  }));
});
