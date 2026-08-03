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
      res.send({
        status: 0,
        message: "Error while saving Enquiry",
        error: error,
      });
    });
});

app.get("/api/enquiry-list", async (req, res) => {
  let enquireList = await enquiryModel.find();
  res.send({ status: 1, message: "Enquiry List", data: enquireList });
});

app.delete("/api/enquiry-delete/:id", async (req, res) => {
  let enquiryId = req.params.id;
  let deletedEnquiry=await enquiryModel.deleteOne({_id:enquiryId});
  res.send({
    status: 1,
    message: "Enquiry Deleted Successfully",
    id: enquiryId,
    delRes:deletedEnquiry
  });
});

mongoose.connect(process.env.DBURL).then(() => {
  console.log("Connected to MongoDb");
  app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
  });
});
