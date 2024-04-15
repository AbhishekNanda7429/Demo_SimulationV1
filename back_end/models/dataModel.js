const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  // booking_id: String,
  // customer_code: String,
  // account_name: String,
  // case_owner: String,
  // case_number: String,
  // booking_status: String,
  // shipment_status: String,
  booking_number:String,
  account_code:String,
  po_number:String,
  subject:String,
  description:String,
  case_owner:String,
  case_number:String,
  category:String,
  sub_category:String,
  priority:String,
  customer_code:String,
  account_name:String,
  customer_contact_name:String,
  customer_contact_email:String,
  customer_contact_title:String,
  case_id:String
});

const DataModel = mongoose.model('finaldb', dataSchema);

module.exports = DataModel;
