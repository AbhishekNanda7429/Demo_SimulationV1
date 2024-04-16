const express = require('express');
const mongoose = require('mongoose');
const DataModel = require('./models/dataModel');
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json())
// app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/CamundaDB');

//to get the data rom the DB
app.get('/api/get_all_cases', async(req,res)=>{
  try{
    const data = await DataModel.find();
    res.json(data);
  }catch(error){
    res.status(400).send("Error in fetching data");
  }
    // DataModel.find()
    // .then(data => res.json(data))
    // .catch(err => res.json(err))
});



//to post the data to the db from the FORM
app.post('/api/post_case', async(req,res)=>{
  try{
    // const {booking_number,account_code,po_number,subject,description,case_owner,category,sub_category,priority} = req.body;
    const data = req.body
    // const postData = new DataModel({booking_number,account_code,po_number,subject,description,case_owner,category,sub_category,priority});
    const postData = new DataModel(data);
    await postData.save();
    console.log("i m here",postData)
    res.status(200).json({message:'Data has been submitted'})
  } catch(error){
      console.log("Error in posting data");
      res.status(400).send("Unable to submit data")
  }
});

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });