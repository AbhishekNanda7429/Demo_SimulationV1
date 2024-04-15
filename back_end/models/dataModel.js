const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  booking_id: String,
  customer_code: String,
  account_name: String,
  case_owner: String,
  case_number: String,
  booking_status: String,
  shipment_status: String,
});

const DataModel = mongoose.model('tempdbs', dataSchema);

module.exports = DataModel;
