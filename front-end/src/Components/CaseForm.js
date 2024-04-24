import React, {useState} from "react";
// import axios from "axios";
import {v4 as uuidv4 } from 'uuid';
// import styled from  "@emotion/styled";

// Styled component for the separator
const Sectionseparator = () => {
    return (
      <div
        style={{
          borderTop: '3px solid #ccc',
          margin: '20px 0',
        //   padding: '15px'
        //   color: '#050300'
        }}
      />
    );
  };

  const Separator = () => {
    return (
      <div
        style={{
          borderTop: '3px solid #050300',
          margin: '20px 0',
          padding: '10px 0',
        //   color: '#050300'
        }}
      />
    );
  };

const Caseform = () => {
const[formValue, setFormValue]= useState({
                                        
booking_number:'',
account_code:'',
po_number:'',


subject:'',
description:'',
case_owner:'',
case_number:'',
category:'',
sub_category:'',
priority:'',


account_code:'',
account_name:'',
customer_contact_name:'',
customer_contact_email:'',
customer_contact_title:'',


notes:'',
root_cause_description:'',
root_cause_category:'',

resolution_description:'',
resolution_category:'',
case_closed:'',


transaction_nbr:'',
booking_number:'',
account_code:'',
master_customer_code:'',
account_name:'',
consignee_b_l:'',
notification_persion_1:'',
notification_party1_address_line_1:'',
notification_party1_address_line_2:'',
notification_party1_address_line_3:'',
origin_port:'',
origin_country:'',
all_document_received_flag:'',
inco_term_booking:'',
export_country_name:'',
vendor_name:'',
shipper:'',
destination_country:'',
discharge_port_bl:'',
final_destination_bl:'',
load_port:'',
transport_mode:'',
service_type:'',
load_type:'',
shipment_type_code:'',
shipment_type:'',
apll_program_indicator:'',
booked_date:'',
mode:'',

service_type:'',
mode:'',
incoterm:'',
load_type:'',
booking_number:'',
po_number:'',
bl_number:'',
container_number:'',
fcr_number:'',
shipper_name:'',
shipper_code:'',
vessel_name:'',
voyage_number:'',
carrier_code:'',
origin_country:'',
origin_port:'',
destination_country:'',
destination_port:'',

account_code:'',
booking_status:'',
shipment_status:'',
latest_event:'',
si_cutoff_date:'',
si_timeliness:'',
si_triggered_user:'',
si_error:'',
asn_send_date:'',
asn_triggered_user:'',
asn_error:'',
estimated_departure_date:'',
actual_departure_date:'',
estimated_arrival_date:'',
actual_arrival_date:'',
eqipment_number:'',
eqipment_type:'',
total_cartoons_container_level:'',
total_volume_cbm_container_level:'',
total_weight_container_level:'',
carrier_code:'',
carrier_name:'',
carrier_seal_number:'',
acs123voyage:'',
voyage:'',
departure_date_actual_estimated:'',
vessel_name:'',
carrier_bill_number:'',
booking_number:'',
adod_dt:'',
arrival_date_actual_estimated:'',
ship_window_start_dt:'',
ship_window_end_dt:'',
ship_window_dt:'',
planned_receipt_dt:'',
edod_dt:'',
adod_dt:'',
etd:'',
departure_dt_actual_estimated:'',
departure_dt:'',
doc_received_dt:'',
pouch_pickup_dt:'',
bl_receipt_dt:'',
first_asn_dt:'',
asn_dt:'',
eta:'',
arrival_dt_est:'',
arrival_dt_act:'',
arrival_dt:'',
final_destination_dt_sch:'',
final_destination_dt_est:'',
final_destination_dt_act:'',
contr_deli_to_consgne_act:'',
final_destination_dt:'',
                         });
// const [fetchedData, setFetchedData] = useState([]);

const[disable]=useState('typing');

const handleInput=(e)=>{
    // const {name, value}= e.target;
    setFormValue({...formValue, [e.target.name]: e.target.value});
}

const handleSubmit=async (e)=>{
    e.preventDefault();
    const case_var = {
        case_number: uuidv4().substring(0,5),
        ...formValue
    };
    sendToAPI(case_var);
};

const sendToAPI = (case_var) => {
    // try{
    //     await axios.post('http://localhost:3000/api/submit-form', formValue);
    //     console.log("frontend here",formValue);  
    //     // fetchedData();
    //     setDisable('submitted');
    // }catch (error) {
    //     console.log(error);
    // }
    fetch('http://13.233.235.130:5000/api/post_case',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(case_var),
        //   setDisable('submitted');
    }) 
    .then((response) => response.json())
    .then((data) => {
      // Handle the API response
      console.log('New case created:', data);
    })
    .catch((error) => {
      // Handle any errors
      console.error('Error creating new case:', error);
    });
};

return(
<React.Fragment>
    <div className="container">
        <div className="row">
            <div className="col-md-12">
            <h1 className="mt-2">NEW CASE FORM</h1>
            <Separator />
            <h3>Reference</h3>
            <p className="text-success"> {  } </p>
            <form method= "POST" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Booking Number</label>
                            <input type="text" name="booking_number" className="form-control" value={formValue.reference.booking_number} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Account Code</label>
                            <input type="text" name="account_code" className="form-control" value={formValue.reference.account_code} onChange={ handleInput}/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">PO Number No</label>
                            <input type="text" name="po_number" className="form-control" value={formValue.reference.po_number} onChange={ handleInput}/>
                        </div>
                    </div>
                    <Sectionseparator />
                    <h3>Form</h3>
                    <h4>Case Information</h4>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Case Number</label>
                            <input type="text" name="case_number" className="form-control" value={formValue.case_number} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Subject</label>
                            <input type="text" name="subject" className="form-control" value={formValue.subject} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Description</label>
                            <input type="text" name="description" className="form-control" value={formValue.description} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Case Owner</label>
                            <input type="text" name="case_owner" className="form-control" value={formValue.case_owner} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Category</label>
                            <input type="text" name="category" className="form-control" value={formValue.category} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Sub Category</label>
                            <input type="text" name="sub_category" className="form-control" value={formValue.sub_category} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Priority</label>
                            <input type="text" name="priority" className="form-control" value={formValue.priority} onChange={ handleInput} />
                        </div>
                    </div>
                    <h4>Customer Information</h4>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Account Code</label>
                            <input type="text" name="account_code" className="form-control" value={formValue.account_code} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Account Name</label>
                            <input type="text" name="account_name" className="form-control" value={formValue.account_name} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Customer Contact Name</label>
                            <input type="text" name="customer_contact_name" className="form-control" value={formValue.customer_contact_name} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Customer Contact Email</label>
                            <input type="text" name="customer_contact_email" className="form-control" value={formValue.customer_contact_email} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Customer Contact Title</label>
                            <input type="text" name="customer_contact_title" className="form-control" value={formValue.customer_contact_title} onChange={ handleInput} />
                        </div>
                    </div>
                    <h4>Triage</h4>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Notes</label>
                            <input type="text" name="notes" className="form-control" value={formValue.notes} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Root Cause description</label>
                            <input type="text" name="root_cause_description" className="form-control" value={formValue.root_cause_description} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Root Cause Category</label>
                            <input type="text" name="root_cause_category" className="form-control" value={formValue.root_cause_category} onChange={ handleInput} />
                        </div>
                    </div>
                    <h4>Case Resolution</h4>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Resolution description</label>
                            <input type="text" name="resolution_description" className="form-control" value={formValue.resolution_description} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Resolution Category</label>
                            <input type="text" name="resolution_category" className="form-control" value={formValue.resolution_category} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Case Closed</label>
                            <input type="text" name="case_closed" className="form-control" value={formValue.case_closed} onChange={ handleInput} />
                        </div>
                    </div>
                    <Sectionseparator />
                    <h3>Booking Details</h3>
                    <h4>Bookig header</h4>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Transaction Number</label>
                            <input type="text" name="transaction_nbr" className="form-control" value={formValue.transaction_nbr} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Master Customer Code</label>
                            <input type="text" name="master_customer_code" className="form-control" value={formValue.master_customer_code} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Account Code</label>
                            <input type="text" name="account_code" className="form-control" value={formValue.account_code} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Account Name</label>
                            <input type="text" name="account_name" className="form-control" value={formValue.account_name} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Consignee (B/L)</label>
                            <input type="text" name="consignee_b_l" className="form-control" value={formValue.consignee_b_l} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Notification Person 1 </label>
                            <input type="text" name="notification_persion_1" className="form-control" value={formValue.notification_persion_1} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Notification Party1 Address Line 1</label>
                            <input type="text" name="notification_party1_address_line_1" className="form-control" value={formValue.notification_party1_address_line_1} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Notification Party1 Address Line 2</label>
                            <input type="text" name="notification_party1_address_line_2" className="form-control" value={formValue.notification_party1_address_line_2} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Notification Party1 Address Line 3</label>
                            <input type="text" name="notification_party1_address_line_3" className="form-control" value={formValue.notification_party1_address_line_3} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Origin Port</label>
                            <input type="text" name="origin_port" className="form-control" value={formValue.origin_port} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Origin Country</label>
                            <input type="text" name="origin_country" className="form-control" value={formValue.origin_country} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">All Documents Received Flag</label>
                            <input type="text" name="all_document_received_flag" className="form-control" value={formValue.all_document_received_flag} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Inco Terms (Booking)</label>
                            <input type="text" name="inco_term_booking" className="form-control" value={formValue.inco_term_booking} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Export Country Name</label>
                            <input type="text" name="export_country_name" className="form-control" value={formValue.export_country_name} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Vendor Name</label>
                            <input type="text" name="vendor_name" className="form-control" value={formValue.vendor_name} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Shipper</label>
                            <input type="text" name="shipper" className="form-control" value={formValue.shipper} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Destination Country</label>
                            <input type="text" name="destination_country" className="form-control" value={formValue.destination_country} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Discharge Port (BL)</label>
                            <input type="text" name="discharge_post_bl" className="form-control" value={formValue.discharge_post_bl} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Final Destination (BL)</label>
                            <input type="text" name="final_destination_bl" className="form-control" value={formValue.final_destination_bl} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Load Port</label>
                            <input type="text" name="load_post" className="form-control" value={formValue.load_post} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Transport Mode(Booking)</label>
                            <input type="text" name="transport_mode_booking" className="form-control" value={formValue.transport_mode_booking} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Service Type</label>
                            <input type="text" name="service_type" className="form-control" value={formValue.service_type} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Load Type</label>
                            <input type="text" name="load_type" className="form-control" value={formValue.load_type} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Shipment Type Code</label>
                            <input type="text" name="shipment_type_code" className="form-control" value={formValue.shipment_type_code} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Shipment Type</label>
                            <input type="text" name="shipment_type" className="form-control" value={formValue.shipment_type} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">APLL Program Indicator</label>
                            <input type="text" name="apll_program_indicator" className="form-control" value={formValue.apll_program_indicator} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Booked Date</label>
                            <input type="text" name="booked_date" className="form-control" value={formValue.booked_date} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Mode</label>
                            <input type="text" name="mode" className="form-control" value={formValue.mode} onChange={ handleInput} />
                        </div>
                    </div>
                    <Sectionseparator />
                    <h3>Shipment Details</h3>
                    <h4>Shipment reference</h4>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Service type</label>
                            <input type="text" name="service_type" className="form-control" value={formValue.service_type} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Mode</label>
                            <input type="text" name="mode" className="form-control" value={formValue.mode} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Incoterm</label>
                            <input type="text" name="incoterm" className="form-control" value={formValue.incoterm} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Load type</label>
                            <input type="text" name="load_type" className="form-control" value={formValue.load_type} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">BL Number</label>
                            <input type="text" name="bl_number" className="form-control" value={formValue.bl_number} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Container Number</label>
                            <input type="text" name="container_number" className="form-control" value={formValue.container_number} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">FCR Numbers</label>
                            <input type="text" name="fcr_number" className="form-control" value={formValue.fcr_number} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Shipper Name</label>
                            <input type="text" name="shipper_name" className="form-control" value={formValue.shipper_name} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Shipper Code</label>
                            <input type="text" name="shipper_code" className="form-control" value={formValue.shipper_code} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Vessel Name</label>
                            <input type="text" name="vessel_name" className="form-control" value={formValue.vessel_name} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable"> A Voyage Number</label>
                            <input type="text" name="voyage_number" className="form-control" value={formValue.voyage_number} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Carrier Code</label>
                            <input type="text" name="carrier_code" className="form-control" value={formValue.carrier_code} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Origin Country</label>
                            <input type="text" name="origin_country" className="form-control" value={formValue.origin_country} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Origin Port</label>
                            <input type="text" name="origin_port" className="form-control" value={formValue.origin_port} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Destination Country</label>
                            <input type="text" name="destination_country" className="form-control" value={formValue.destination_country} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Destination Port</label>
                            <input type="text" name="destination_port" className="form-control" value={formValue.destination_port} onChange={ handleInput} />
                        </div>
                    </div>
                    <h4> Shipment Status</h4>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Account Code</label>
                            <input type="text" name="account_code" className="form-control" value={formValue.account_code} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Booking Status</label>
                            <input type="text" name="booking_status" className="form-control" value={formValue.booking_status} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Shipment Status</label>
                            <input type="text" name="shipment_status" className="form-control" value={formValue.shipment_status} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Latest event</label>
                            <input type="text" name="latest_event" className="form-control" value={formValue.latest_event} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">SI Cutoff Date</label>
                            <input type="text" name="si_cutoff_date" className="form-control" value={formValue.si_cutoff_date} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">SI Timeliness</label>
                            <input type="text" name="si_timeliness" className="form-control" value={formValue.si_timeliness} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">SI triggered user</label>
                            <input type="text" name="si_triggered_user" className="form-control" value={formValue.si_triggered_user} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">SI errors</label>
                            <input type="text" name="si_error" className="form-control" value={formValue.si_error} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">ASN sent Date</label>
                            <input type="text" name="asn_send_date" className="form-control" value={formValue.asn_send_date} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">ASN triggered user</label>
                            <input type="text" name="asn_triggered_user" className="form-control" value={formValue.asn_triggered_user} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">ASN errors</label>
                            <input type="text" name="asn_error" className="form-control" value={formValue.asn_error} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Estimated Departure Date</label>
                            <input type="text" name="estimated_departure_date" className="form-control" value={formValue.estimated_departure_date} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Actual Departure Date</label>
                            <input type="text" name="actual_departure_date" className="form-control" value={formValue.actual_departure_date} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Estimated Arrival Date</label>
                            <input type="text" name="estimated_arrival_date" className="form-control" value={formValue.estimated_arrival_date} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Actual Departure Date</label>
                            <input type="text" name="actual_arrival_date" className="form-control" value={formValue.actual_arrival_date} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Equipment  Number</label>
                            <input type="text" name="eqipment_number" className="form-control" value={formValue.eqipment_number} onChange={ handleInput} />
                        </div>
                    </div>                    
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Equipment Type</label>
                            <input type="text" name="eqipment_type" className="form-control" value={formValue.eqipment_type} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Total cartons (On container level)</label>
                            <input type="text" name="total_cartoons_container_level" className="form-control" value={formValue.total_cartoons_container_level} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Total volume/CBM (On container level)</label>
                            <input type="text" name="total_volume_cbm_container_level" className="form-control" value={formValue.total_volume_cbm_container_level} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Total Weight (On container level)</label>
                            <input type="text" name="total_weight_container_level" className="form-control" value={formValue.total_weight_container_level} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Carrier Code</label>
                            <input type="text" name="carrier_code" className="form-control" value={formValue.carrier_code} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Carrier Name</label>
                            <input type="text" name="carrier_name" className="form-control" value={formValue.carrier_name} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Carrier Seal Number</label>
                            <input type="text" name="carrier_seal_number" className="form-control" value={formValue.carrier_seal_number} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">ACS123 Voyage</label>
                            <input type="text" name="acs123voyage" className="form-control" value={formValue.acs123voyage} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Voyage</label>
                            <input type="text" name="voyage" className="form-control" value={formValue.voyage} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Departure Date (Actual/Estimated)</label>
                            <input type="text" name="departure_date_actual/estimated" className="form-control" value={formValue.departure_date_actual_estimated} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Vessel Name</label>
                            <input type="text" name="vessel_name" className="form-control" value={formValue.vessel_name} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Carrier Bill Number</label>
                            <input type="text" name="carrier_bill_number" className="form-control" value={formValue.carrier_bill_number} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Booking Number</label>
                            <input type="text" name="booking_number" className="form-control" value={formValue.booking_number} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">ADOD Date</label>
                            <input type="text" name="adod_dt" className="form-control" value={formValue.adod_dt} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Arrival Date(Actual/Estimated)</label>
                            <input type="text" name="arrival_date_actual/estimated" className="form-control" value={formValue.arrival_date_actual_estimated} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Ship Window Start Date</label>
                            <input type="text" name="ship_window_start_dt" className="form-control" value={formValue.ship_window_start_dt} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Ship Window End Date</label>
                            <input type="text" name="ship_window_end_dt" className="form-control" value={formValue.ship_window_end_dt} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Ship Window Date</label>
                            <input type="text" name="ship_window_dt" className="form-control" value={formValue.ship_window_dt} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Planned Receipt Date</label>
                            <input type="text" name="planned_receipt_dt" className="form-control" value={formValue.planned_receipt_dt} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">EDOD Date</label>
                            <input type="text" name="edod_dt" className="form-control" value={formValue.edod_dt} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">ADOD Date</label>
                            <input type="text" name="adod_dt" className="form-control" value={formValue.adod_dt} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">ETD</label>
                            <input type="text" name="etd" className="form-control" value={formValue.etd} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Departure Date (Act/Est)</label>
                            <input type="text" name="departure_dt_actual/estimated" className="form-control" value={formValue.departure_dt_actual_estimated} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Departure Date</label>
                            <input type="text" name="departure_dt" className="form-control" value={formValue.departure_dt} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Docs Received Date</label>
                            <input type="text" name="doc_received_dt" className="form-control" value={formValue.doc_received_dt} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Pouch Pickup Date</label>
                            <input type="text" name="pouch_pickup_dt" className="form-control" value={formValue.pouch_pickup_dt} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">BL Receipt Date</label>
                            <input type="text" name="bl_receipt_dt" className="form-control" value={formValue.bl_receipt_dt} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">First ASN Date</label>
                            <input type="text" name="first_asn_dt" className="form-control" value={formValue.first_asn_dt} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">ASN Date</label>
                            <input type="text" name="asn_dt" className="form-control" value={formValue.asn_dt} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">ETA</label>
                            <input type="text" name="eta" className="form-control" value={formValue.eta} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Arrival Date(Est)</label>
                            <input type="text" name="arrival_dt_est" className="form-control" value={formValue.arrival_dt_est} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Arrival Date (Act)</label>
                            <input type="text" name="arrival_dt_act" className="form-control" value={formValue.arrival_dt_act} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Arrival Date</label>
                            <input type="text" name="arrival_dt" className="form-control" value={formValue.arrival_dt} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Final Destination Date (Sch)</label>
                            <input type="text" name="final_destination_dt_sch" className="form-control" value={formValue.final_destination_dt_sch} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Final Destination Date (Est)</label>
                            <input type="text" name="final_destination_dt_est" className="form-control" value={formValue.final_destination_dt_est} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">First ASN Date</label>
                            <input type="text" name="first_asn_dt" className="form-control" value={formValue.first_asn_dt} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Final Destination Date (Act)</label>
                            <input type="text" name="final_destination_dt_act" className="form-control" value={formValue.final_destination_dt_act} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Contr Deli to Consgne (Act)</label>
                            <input type="text" name="contr_deli_to_consgne_act" className="form-control" value={formValue.contr_deli_to_consgne_act} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Final Destination Date</label>
                            <input type="text" name="final_destination_dt" className="form-control" value={formValue.final_destination_dt} onChange={ handleInput} />
                        </div>
                    </div>
                    {/* <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Description</label>
                            <select className="form-control" name="description" value={formValue.description} onChange={ handleInput}>
                                <option value="">--Please Select--</option>
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </select>
                        </div>
                    </div> */}                    
                    
                    <div className="col-md-12">
                        <div className="mb-3">
                            <label className="form-lable"></label>
                            <button className="btn btn-success btn-lg"
                            disabled={formValue.booking_number.length===0 || 
                                    formValue.account_code.length===0 || 
                                    formValue.po_number.length===0 ||
                                    disable==='submitted'
                            
                            }
                            
                            >Submit</button>
                            </div>
                    </div>
                </div>
            </form>
            </div>
        </div>
    </div>
    
</React.Fragment>
);
}

export default Caseform;