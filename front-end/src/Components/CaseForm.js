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
// case_number:'',
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


// transaction_nbr:'',
// booking_number:'',
// account_code:'',
// master_customer_code:'',
// account_name:'',
// consignee_b_l:'',
// notification_persion_1:'',
// notification_party1_address_line_1:'',
// notification_party1_address_line_2:'',
// notification_party1_address_line_3:'',
// origin_port:'',
// origin_country:'',
// all_document_received_flag:'',
// inco_term_booking:'',
// export_country_name:'',
// vendor_name:'',
// shipper:'',
// destination_country:'',
// discharge_port_bl:'',
// final_destination_bl:'',
// load_port:'',
// transport_mode:'',
// service_type:'',
// load_type:'',
// shipment_type_code:'',
// shipment_type:'',
// apll_program_indicator:'',
// booked_date:'',
// mode:'',

// service_type:'',
// mode:'',
// incoterm:'',
// load_type:'',
// booking_number:'',
// po_number:'',
// bl_number:'',
// container_number:'',
// fcr_number:'',
// shipper_name:'',
// shipper_code:'',
// vessel_name:'',
// voyage_number:'',
// carrier_code:'',
// origin_country:'',
// origin_port:'',
// destination_country:'',
// destination_port:'',

// account_code:'',
// booking_status:'',
// shipment_status:'',
// latest_event:'',
// si_cutoff_date:'',
// si_timeliness:'',
// si_triggered_user:'',
// si_error:'',
// asn_send_date:'',
// asn_triggered_user:'',
// asn_error:'',
// estimated_departure_date:'',
// actual_departure_date:'',
// estimated_arrival_date:'',
// actual_arrival_date:'',
// eqipment_number:'',
// eqipment_type:'',
// total_cartoons_container_level:'',
// total_volume_cbm_container_level:'',
// total_weight_container_level:'',
// carrier_code:'',
// carrier_name:'',
// carrier_seal_number:'',
// acs123voyage:'',
// voyage:'',
// departure_date_actual_estimated:'',
// vessel_name:'',
// carrier_bill_number:'',
// booking_number:'',
// adod_dt:'',
// arrival_date_actual_estimated:'',
// ship_window_start_dt:'',
// ship_window_end_dt:'',
// ship_window_dt:'',
// planned_receipt_dt:'',
// edod_dt:'',
// etd:'',
// departure_dt_actual_estimated:'',
// departure_dt:'',
// doc_received_dt:'',
// pouch_pickup_dt:'',
// bl_receipt_dt:'',
// first_asn_dt:'',
// asn_dt:'',
// eta:'',
// arrival_dt_est:'',
// arrival_dt_act:'',
// arrival_dt:'',
// final_destination_dt_sch:'',
// final_destination_dt_est:'',
// final_destination_dt_act:'',
// contr_deli_to_consgne_act:'',
// final_destination_dt:'',
                         });
// const [fetchedData, setFetchedData] = useState([]);

const[disable]=useState('typing');

const handleInput=(e)=>{
    // const {name, value}= e.target;
    setFormValue({...formValue, [e.target.name]: e.target.value});
}

const handleSubmit=async (e)=>{
    e.preventDefault();
    window.alert('Form submitted successfully!');
    const case_var = {
        case_number: uuidv4().substring(0,5),
        ...formValue
    };
    sendToAPI(case_var);
};

const sendToAPI = (case_var) => {
    fetch('http://98.70.11.75:5000/api/post_case',{
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
                            <input type="text" name="booking_number" className="form-control" value={formValue.booking_number} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Account Code</label>
                            <input type="text" name="account_code" className="form-control" value={formValue.account_code} onChange={ handleInput}/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">PO Number No</label>
                            <input type="text" name="po_number" className="form-control" value={formValue.po_number} onChange={ handleInput}/>
                        </div>
                    </div>
                    <Sectionseparator />
                    <h3>Form</h3>
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
                    <h4>Case Information</h4>
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
                            // disabled={formValue.booking_number.length===0 || 
                            //         formValue.account_code.length===0 || 
                            //         formValue.po_number.length===0 ||
                            //         disable==='submitted'
                            // }
                            
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