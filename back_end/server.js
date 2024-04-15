const express = require('express');
const mongoose = require('mongoose');
const DataModel = require('./models/dataModel');
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/CamundaDB');

app.get('/api/getdata', (req,res)=>{
    DataModel.find()
    .then(data => res.json(data))
    .catch(err => res.json(err))
});
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });