let express = require("express");
let mongoose = require("mongoose");
let enquiryModel = require("./models/enquiry.model");
require("dotenv").config();

//connect to MongoDb

let app = express();
app.use(express.json());
app.post("/api/enquiry-insert", (req, res) => {
  let { sName, sEmail, sPhone, sMessage } = req.body;
  let enquiry = new enquiryModel({
    name: sName,
    email: sEmail,
    phone: sPhone,
    message: sMessage,
  });
  enquiry
    .save()
    .then(() => {
      res.send({ status: 1, message: "Enquiry Saved Successfully" });
    })
    .catch((error) => {
      res.send({ status: 0, message: "Error while saving Enquiry",error:error });
    });
});

app.get("/api/enquiry-list",(req,res)=>{
  res.send({status:1,message:"Enquiry List",data:[]})
})

mongoose.connect(process.env.DBURL).then(() => {
  console.log("Connected to MongoDb");
  app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
  });
});
