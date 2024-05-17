import React,{ useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import axios from 'axios';

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



const TableData = () => {
    const [data, setData] = useState([]);
    const [caseData, setCaseData] = useState(null);

  useEffect(() => {
    // axios.get('http://localhost:3000/api/get_all_cases')
    axios.get('http://98.70.11.75:5000/api/get_all_cases')
    .then(data => setData(data.data))
    .catch(err=> console.log(err))
  }, []);

  const handleCaseClick = async (caseNumber)=>{
    try{
        const response = await axios.get(`http://98.70.11.75:5000/api/get_case/${caseNumber}`);
        setCaseData(response.data)
    } catch(error){
        alert("Error retrieving case data");
    }
  };

  const sendWebhook = async (case_number) => {
    try {
      const response = await axios.post('http://98.70.11.75:5000/api/send_webhook', { case_number });
      if (response.data.success) {
        console.log('Webhook sent successfully');
        window.alert('Data fetched successfully!');
      } else {
        console.error('Error sending webhook:', response.data.error);
        window.alert('Error sending webhook!');
      }
    } catch (error) {
      console.error('Error sending webhook:', error);
      window.alert('Error sending webhook!');
    }
  };

    return(
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                    <h1 className="mt-2">CASE LIST</h1>
                       <div className="d-grid d-md-flex justify-content-md-end mb-3">
                        {/* <Link to="/caseform" className="btn btn-warning">Add New Case</Link> */}
                       </div>
                       <table className="table table-bordered table-striped">
                        <thead>
                        <tr>
                        <th style={{ textAlign: 'center' }}>Case Number</th>
                        <th style={{ textAlign: 'center' }}>Triage Note</th>
                        <th style={{ textAlign: 'center' }}>Booking Number</th>
                        <th style={{ textAlign: 'center' }}>Account Code</th>
                        <th style={{ textAlign: 'center' }}>PO Number</th>
                        <th style={{ textAlign: 'center' }}>Subject</th>
                        {/* <th style={{ textAlign: 'center' }}>Description</th> */}
                        <th style={{ textAlign: 'center' }}>Case Owner</th>
                        <th style={{ textAlign: 'center' }}>Category</th>
                        {/* <th style={{ textAlign: 'center' }}>Sub Category</th> */}
                        <th style={{ textAlign: 'center' }}>Priority</th>
                        <th style={{ textAlign: 'center' }}>Action</th>

                        </tr>
                        </thead>
                        <tbody>
                         { data.map( data =>{
                            return <tr key={data.form.case_info.case_number}>
                                <td>
                                    <a href="#" 
                                    onClick={()=> handleCaseClick(data.form.case_info.case_number)}>
                                    {data.form.case_info.case_number}
                                    </a>
                                </td>
                                <td>{data.form.triage.notes}</td>
                                <td>{data.reference.booking_number}</td>
                                <td>{data.reference.account_code}</td>
                                <td>{data.reference.po_number}</td>
                                <td>{data.form.case_info.subject}</td>
                                {/* <td>{data.form.case_info.description}</td> */}
                                <td>{data.form.case_info.case_owner}</td>
                                <td>{data.form.case_info.category}</td>
                                {/* <td>{data.form.case_info.sub_category}</td> */}
                                <td>{data.form.case_info.priority}</td>
                                <td>                               
                                    <button onClick={() => sendWebhook(data.form.case_info.case_number)}>Update Shipping Details</button>
                                </td>
                            </tr>
                            })
                            }                        
                        </tbody>
                        </table>      
                        {/* <h5 className="mt-2">CASE DETAIL</h5> */}
                        {/* {caseData && <pre>{JSON.stringify(caseData,null,2)}</pre>} */}
                        {caseData && <CaseDetailsForm caseData={caseData}/>}
                    </div>
                </div>
            </div>
            
        </React.Fragment>
    );
}

function CaseDetailsForm({caseData}){
    console.log('Case Details:', caseData);

    return (
        <div className="container">
        <div className="row">
            <div className="col-md-12">
            <h1 className="mt-2">CASE DETAILS</h1>
            <Separator />
            <h3>Reference</h3>
            <p className="text-success"> {  } </p>
            <form>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Booking Number</label>
                            <input type="text" name="booking_number" className="form-control" value={caseData.reference.booking_number} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Account Code</label>
                            <input type="text" name="account_code" className="form-control" value={caseData.reference.account_code}  readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">PO Number No</label>
                            <input type="text" name="po_number" className="form-control" value={caseData.reference.po_number} readOnly />
                        </div>
                    </div>
                    <Sectionseparator />
                    <h3>Form</h3>
                    <h4>Triage</h4>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Notes</label>
                            <input type="text" name="notes" className="form-control" value={caseData.form.triage.notes} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Root Cause description</label>
                            <input type="text" name="root_cause_description" className="form-control" value={caseData.form.triage.root_cause_description} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Root Cause Category</label>
                            <input type="text" name="root_cause_category" className="form-control" value={caseData.form.triage.root_cause_category} readOnly />
                        </div>
                    </div>
                    <h4>Case Information</h4>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Subject</label>
                            <input type="text" name="subject" className="form-control" value={caseData.form.case_info.subject} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Description</label>
                            <input type="text" name="description" className="form-control" value={caseData.form.case_info.description} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Case Owner</label>
                            <input type="text" name="case_owner" className="form-control" value={caseData.form.case_info.case_owner} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Category</label>
                            <input type="text" name="category" className="form-control" value={caseData.form.case_info.category} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Sub Category</label>
                            <input type="text" name="sub_category" className="form-control" value={caseData.form.case_info.sub_category} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Priority</label>
                            <input type="text" name="priority" className="form-control" value={caseData.form.case_info.priority} readOnly  />
                        </div>
                    </div>
                    <h4>Customer Information</h4>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Account Code</label>
                            <input type="text" name="account_code" className="form-control" value={caseData.form.customer_info.account_code} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Account Name</label>
                            <input type="text" name="account_name" className="form-control" value={caseData.form.customer_info.account_name} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Customer Contact Name</label>
                            <input type="text" name="customer_contact_name" className="form-control" value={caseData.form.customer_info.customer_contact_name} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Customer Contact Email</label>
                            <input type="text" name="customer_contact_email" className="form-control" value={caseData.form.customer_info.customer_contact_email} readOnly  />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Customer Contact Title</label>
                            <input type="text" name="customer_contact_title" className="form-control" value={caseData.form.customer_info.customer_contact_title} readOnly />
                        </div>
                    </div>
                    <h4>Case Resolution</h4>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Resolution description</label>
                            <input type="text" name="resolution_description" className="form-control" value={caseData.form.case_resolution.resolution_description} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Resolution Category</label>
                            <input type="text" name="resolution_category" className="form-control" value={caseData.form.case_resolution.resolution_category} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Case Closed</label>
                            <input type="text" name="case_closed" className="form-control" value={caseData.form.case_resolution.case_closed} readOnly  />
                        </div>
                    </div>
                    <Sectionseparator />
                    <h3>Booking Details</h3>
                    <h4>Bookig header</h4>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Transaction Number</label>
                            <input type="text" name="transaction_nbr" className="form-control" value={caseData.booking_details.booking_header.transaction_nbr} readOnly  />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Master Customer Code</label>
                            <input type="text" name="master_customer_code" className="form-control" value={caseData.booking_details.booking_header.master_customer_code} readOnly  />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Account Code</label>
                            <input type="text" name="account_code" className="form-control" value={caseData.booking_details.booking_header.account_code} readOnly  />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Account Name</label>
                            <input type="text" name="account_name" className="form-control" value={caseData.booking_details.booking_header.account_name} readOnly  />
                        </div>
                    </div>
                    {/* <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Consignee (B/L)</label>
                            <input type="text" name="consignee_b_l" className="form-control" value={caseData.booking_details.booking_header.consignee_b_l} readOnly  />
                        </div>
                    </div> */}
                    {/* <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Notification Person 1 </label>
                            <input type="text" name="notification_persion_1" className="form-control" value={caseData.booking_details.booking_header.notification_persion_1} readOnly  />
                        </div>
                    </div> */}
                    {/* <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Notification Party1 Address Line 1</label>
                            <input type="text" name="notification_party1_address_line_1" className="form-control" value={caseData.booking_details.booking_header.notification_party1_address_line_1} readOnly  />
                        </div>
                    </div> */}
                    {/* <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Notification Party1 Address Line 2</label>
                            <input type="text" name="notification_party1_address_line_2" className="form-control" value={caseData.booking_details.booking_header.notification_party1_address_line_2} readOnly  />
                        </div>
                    </div> */}
                    {/* <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Notification Party1 Address Line 3</label>
                            <input type="text" name="notification_party1_address_line_3" className="form-control" value={caseData.booking_details.booking_header.notification_party1_address_line_3} readOnly  />
                        </div>
                    </div> */}
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Origin Port</label>
                            <input type="text" name="origin_port" className="form-control" value={caseData.booking_details.booking_header.origin_port} readOnly  />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Origin Country</label>
                            <input type="text" name="origin_country" className="form-control" value={caseData.booking_details.booking_header.origin_country} readOnly  />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">All Documents Received Flag</label>
                            <input type="text" name="all_document_received_flag" className="form-control" value={caseData.booking_details.booking_header.all_document_received_flag} readOnly  />
                        </div>
                    </div>
                    {/* <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Inco Terms (Booking)</label>
                            <input type="text" name="inco_term_booking" className="form-control" value={caseData.booking_details.booking_header.inco_term_booking} readOnly  />
                        </div>
                    </div> */}
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Export Country Name</label>
                            <input type="text" name="export_country_name" className="form-control" value={caseData.booking_details.booking_header.export_country_name} readOnly  />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Vendor Name</label>
                            <input type="text" name="vendor_name" className="form-control" value={caseData.booking_details.booking_header.vendor_name} readOnly  />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Shipper</label>
                            <input type="text" name="shipper" className="form-control" value={caseData.booking_details.booking_header.shipper} readOnly  />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Destination Country</label>
                            <input type="text" name="destination_country" className="form-control" value={caseData.booking_details.booking_header.destination_country} readOnly  />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Discharge Port (BL)</label>
                            <input type="text" name="discharge_port_bl" className="form-control" value={caseData.booking_details.booking_header.discharge_port_bl} readOnly  />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Final Destination (BL)</label>
                            <input type="text" name="final_destination_bl" className="form-control" value={caseData.booking_details.booking_header.final_destination_bl} readOnly  />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Load Port</label>
                            <input type="text" name="load_port" className="form-control" value={caseData.booking_details.booking_header.load_port} readOnly  />
                        </div>
                    </div>
                    {/* <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Transport Mode(Booking)</label>
                            <input type="text" name="transport_mode_booking" className="form-control" value={caseData.booking_details.booking_header.transport_mode_booking} readOnly  />
                        </div>
                    </div> */}
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Service Type</label>
                            <input type="text" name="service_type" className="form-control" value={caseData.booking_details.booking_header.service_type} readOnly  />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Load Type</label>
                            <input type="text" name="load_type" className="form-control" value={caseData.booking_details.booking_header.load_type} readOnly  />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Shipment Type Code</label>
                            <input type="text" name="shipment_type_code" className="form-control" value={caseData.booking_details.booking_header.shipment_type_code} readOnly  />
                        </div>
                    </div>
                    {/* <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Shipment Type</label>
                            <input type="text" name="shipment_type" className="form-control" value={caseData.booking_details.booking_header.shipment_type} readOnly  />
                        </div>
                    </div> */}
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">APLL Program Indicator</label>
                            <input type="text" name="apll_program_indicator" className="form-control" value={caseData.booking_details.booking_header.apll_program_indicator} readOnly  />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Booked Date</label>
                            <input type="text" name="booked_date" className="form-control" value={caseData.booking_details.booking_header.booked_date} readOnly  />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Mode</label>
                            <input type="text" name="mode" className="form-control" value={caseData.booking_details.booking_header.mode} readOnly  />
                        </div>
                    </div>
                    <Sectionseparator />
                    <h3>Shipment Details</h3>
                    <h4>Shipment reference</h4>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Service type</label>
                            <input type="text" name="service_type" className="form-control" value={caseData.shipment_details.shipment_reference.service_type} readOnly  />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Mode</label>
                            <input type="text" name="mode" className="form-control" value={caseData.shipment_details.shipment_reference.mode} readOnly  />
                        </div>
                    </div>
                    {/* <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Incoterm</label>
                            <input type="text" name="incoterm" className="form-control" value={caseData.shipment_details.shipment_reference.incoterm} readOnly  />
                        </div>
                    </div> */}
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Load type</label>
                            <input type="text" name="load_type" className="form-control" value={caseData.shipment_details.shipment_reference.load_type} readOnly  />
                        </div>
                    </div>
                    {/* <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Booking Number</label>
                            <input type="text" name="booking_number" className="form-control" value={caseData.shipment_details.shipment_reference.booking_number} readOnly  />
                        </div>
                    </div> */}
                    {/* <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">PO Number</label>
                            <input type="text" name="po_number" className="form-control" value={caseData.shipment_details.shipment_reference.po_number} readOnly  />
                        </div>
                    </div> */}
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">BL Number</label>
                            <input type="text" name="bl_number" className="form-control" value={caseData.shipment_details.shipment_reference.bl_number} readOnly  />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Container Number</label>
                            <input type="text" name="container_number" className="form-control" value={caseData.shipment_details.shipment_reference.container_number} readOnly  />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">FCR Numbers</label>
                            <input type="text" name="fcr_number" className="form-control" value={caseData.shipment_details.shipment_reference.fcr_number} readOnly  />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Shipper Name</label>
                            <input type="text" name="shipper_name" className="form-control" value={caseData.shipment_details.shipment_reference.shipper_name} readOnly  />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Shipper Code</label>
                            <input type="text" name="shipper_code" className="form-control" value={caseData.shipment_details.shipment_reference.shipper_code} readOnly  />
                        </div>
                    </div>
                    {/* <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Vessel Name</label>
                            <input type="text" name="vessel_name" className="form-control" value={caseData.shipment_details.shipment_reference.vessel_name} readOnly  />
                        </div>
                    </div> */}
                    {/* <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable"> A Voyage Number</label>
                            <input type="text" name="voyage_number" className="form-control" value={caseData.shipment_details.shipment_reference.voyage_number} readOnly  />
                        </div>
                    </div> */}
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Carrier Code</label>
                            <input type="text" name="carrier_code" className="form-control" value={caseData.shipment_details.shipment_reference.carrier_code} readOnly  />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Origin Country</label>
                            <input type="text" name="origin_country" className="form-control" value={caseData.shipment_details.shipment_reference.origin_country} readOnly  />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Origin Port</label>
                            <input type="text" name="origin_port" className="form-control" value={caseData.shipment_details.shipment_reference.origin_port} readOnly  />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Destination Country</label>
                            <input type="text" name="destination_country" className="form-control" value={caseData.shipment_details.shipment_reference.destination_country} readOnly  />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Destination Port</label>
                            <input type="text" name="destination_port" className="form-control" value={caseData.shipment_details.shipment_reference.destination_port} readOnly  />
                        </div>
                    </div>
                    <h4> Shipment Status</h4>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Account Code</label>
                            <input type="text" name="account_code" className="form-control" value={caseData.shipment_details.Shipment_status.account_code} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Booking Status</label>
                            <input type="text" name="booking_status" className="form-control" value={caseData.shipment_details.Shipment_status.booking_status} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Shipment Status</label>
                            <input type="text" name="shipment_status" className="form-control" value={caseData.shipment_details.Shipment_status.shipment_status} readOnly />
                        </div>
                    </div>
                    {/* <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Latest event</label>
                            <input type="text" name="latest_event" className="form-control" value={caseData.shipment_details.Shipment_status.latest_event} readOnly />
                        </div>
                    </div> */}
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">SI Cutoff Date</label>
                            <input type="text" name="si_cutoff_date" className="form-control" value={caseData.shipment_details.Shipment_status.si_cutoff_date} readOnly />
                        </div>
                    </div>
                    {/* <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">SI Timeliness</label>
                            <input type="text" name="si_timeliness" className="form-control" value={caseData.shipment_details.Shipment_status.si_timeliness} readOnly />
                        </div>
                    </div> */}
                    {/* <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">SI triggered user</label>
                            <input type="text" name="si_triggered_user" className="form-control" value={caseData.shipment_details.Shipment_status.si_triggered_user} readOnly />
                        </div>
                    </div> */}
                    {/* <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">SI errors</label>
                            <input type="text" name="si_error" className="form-control" value={caseData.shipment_details.Shipment_status.si_error} readOnly />
                        </div>
                    </div> */}
                    {/* <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">ASN sent Date</label>
                            <input type="text" name="asn_send_date" className="form-control" value={caseData.shipment_details.Shipment_status.asn_send_date} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">ASN triggered user</label>
                            <input type="text" name="asn_triggered_user" className="form-control" value={caseData.shipment_details.Shipment_status.asn_triggered_user} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">ASN errors</label>
                            <input type="text" name="asn_error" className="form-control" value={caseData.shipment_details.Shipment_status.asn_error} readOnly />
                        </div>
                    </div> */}
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Estimated Departure Date</label>
                            <input type="text" name="estimated_departure_date" className="form-control" value={caseData.shipment_details.Shipment_status.estimated_departure_date} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Actual Departure Date</label>
                            <input type="text" name="actual_departure_date" className="form-control" value={caseData.shipment_details.Shipment_status.actual_departure_date} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Estimated Arrival Date</label>
                            <input type="text" name="estimated_arrival_date" className="form-control" value={caseData.shipment_details.Shipment_status.estimated_arrival_date} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Actual Arrival Date</label>
                            <input type="text" name="actual_arrival_date" className="form-control" value={caseData.shipment_details.Shipment_status.actual_arrival_date} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Equipment  Number</label>
                            <input type="text" name="eqipment_number" className="form-control" value={caseData.shipment_details.Shipment_status.eqipment_number} readOnly />
                        </div>
                    </div>                    
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Equipment Type</label>
                            <input type="text" name="eqipment_type" className="form-control" value={caseData.shipment_details.Shipment_status.eqipment_type} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Total cartons (On container level)</label>
                            <input type="text" name="total_cartoons_container_level" className="form-control" value={caseData.shipment_details.Shipment_status.total_cartoons_container_level} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Total volume/CBM (On container level)</label>
                            <input type="text" name="total_volume_cbm_container_level" className="form-control" value={caseData.shipment_details.Shipment_status.total_volume_cbm_container_level} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Total Weight (On container level)</label>
                            <input type="text" name="total_weight_container_level" className="form-control" value={caseData.shipment_details.Shipment_status.total_weight_container_level} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Carrier Code</label>
                            <input type="text" name="carrier_code" className="form-control" value={caseData.shipment_details.Shipment_status.carrier_code} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Carrier Name</label>
                            <input type="text" name="carrier_name" className="form-control" value={caseData.shipment_details.Shipment_status.carrier_name} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Carrier Seal Number</label>
                            <input type="text" name="carrier_seal_number" className="form-control" value={caseData.shipment_details.Shipment_status.carrier_seal_number} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">ACS123 Voyage</label>
                            <input type="text" name="acs123voyage" className="form-control" value={caseData.shipment_details.Shipment_status.acs123voyage} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Voyage</label>
                            <input type="text" name="voyage" className="form-control" value={caseData.shipment_details.Shipment_status.voyage} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Departure Date (Actual/Estimated)</label>
                            <input type="text" name="departure_date_actual_estimated" className="form-control" value={caseData.shipment_details.Shipment_status.departure_date_actual_estimated} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Vessel Name</label>
                            <input type="text" name="vessel_name" className="form-control" value={caseData.shipment_details.Shipment_status.vessel_name} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Carrier Bill Number</label>
                            <input type="text" name="carrier_bill_number" className="form-control" value={caseData.shipment_details.Shipment_status.carrier_bill_number} readOnly />
                        </div>
                    </div>
                    {/* <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Booking Number</label>
                            <input type="text" name="booking_number" className="form-control" value={caseData.shipment_details.Shipment_status.booking_number} readOnly />
                        </div>
                    </div> */}
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Arrival Date(Actual/Estimated)</label>
                            <input type="text" name="arrival_date_actual_estimated" className="form-control" value={caseData.shipment_details.Shipment_status.arrival_date_actual_estimated} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Ship Window Start Date</label>
                            <input type="text" name="ship_window_start_dt" className="form-control" value={caseData.shipment_details.Shipment_status.ship_window_start_dt} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Ship Window End Date</label>
                            <input type="text" name="ship_window_end_dt" className="form-control" value={caseData.shipment_details.Shipment_status.ship_window_end_dt} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Ship Window Date</label>
                            <input type="text" name="ship_window_dt" className="form-control" value={caseData.shipment_details.Shipment_status.ship_window_dt} readOnly />
                        </div>
                    </div>
                    {/* <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Planned Receipt Date</label>
                            <input type="text" name="planned_receipt_dt" className="form-control" value={caseData.shipment_details.Shipment_status.planned_receipt_dt} readOnly />
                        </div>
                    </div> */}
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">EDOD Date</label>
                            <input type="text" name="edod_dt" className="form-control" value={caseData.shipment_details.Shipment_status.edod_dt} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">ADOD Date</label>
                            <input type="text" name="adod_dt" className="form-control" value={caseData.shipment_details.Shipment_status.adod_dt} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">ETD</label>
                            <input type="text" name="etd" className="form-control" value={caseData.shipment_details.Shipment_status.etd} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Departure Date (Act/Est)</label>
                            <input type="text" name="departure_dt_actual_estimated" className="form-control" value={caseData.shipment_details.Shipment_status.departure_dt_actual_estimated} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Departure Date</label>
                            <input type="text" name="departure_dt" className="form-control" value={caseData.shipment_details.Shipment_status.departure_dt} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Docs Received Date</label>
                            <input type="text" name="doc_received_dt" className="form-control" value={caseData.shipment_details.Shipment_status.doc_received_dt} readOnly />
                        </div>
                    </div>
                    {/* <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Pouch Pickup Date</label>
                            <input type="text" name="pouch_pickup_dt" className="form-control" value={caseData.shipment_details.Shipment_status.pouch_pickup_dt} readOnly />
                        </div>
                    </div> */}
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">BL Receipt Date</label>
                            <input type="text" name="bl_receipt_dt" className="form-control" value={caseData.shipment_details.Shipment_status.bl_receipt_dt} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">First ASN Date</label>
                            <input type="text" name="first_asn_dt" className="form-control" value={caseData.shipment_details.Shipment_status.first_asn_dt} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">ASN Date</label>
                            <input type="text" name="asn_dt" className="form-control" value={caseData.shipment_details.Shipment_status.asn_dt} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">ETA</label>
                            <input type="text" name="eta" className="form-control" value={caseData.shipment_details.Shipment_status.eta} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Arrival Date(Est)</label>
                            <input type="text" name="arrival_dt_est" className="form-control" value={caseData.shipment_details.Shipment_status.arrival_dt_est} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Arrival Date (Act)</label>
                            <input type="text" name="arrival_dt_act" className="form-control" value={caseData.shipment_details.Shipment_status.arrival_dt_act} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Arrival Date</label>
                            <input type="text" name="arrival_dt" className="form-control" value={caseData.shipment_details.Shipment_status.arrival_dt} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Final Destination Date (Sch)</label>
                            <input type="text" name="final_destination_dt_sch" className="form-control" value={caseData.shipment_details.Shipment_status.final_destination_dt_sch} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Final Destination Date (Est)</label>
                            <input type="text" name="final_destination_dt_est" className="form-control" value={caseData.shipment_details.Shipment_status.final_destination_dt_est} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Final Destination Date (Act)</label>
                            <input type="text" name="final_destination_dt_act" className="form-control" value={caseData.shipment_details.Shipment_status.final_destination_dt_act} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Contr Deli to Consgne (Act)</label>
                            <input type="text" name="contr_deli_to_consgne_act" className="form-control" value={caseData.shipment_details.Shipment_status.contr_deli_to_consgne_act} readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Final Destination Date</label>
                            <input type="text" name="final_destination_dt" className="form-control" value={caseData.shipment_details.Shipment_status.final_destination_dt} readOnly />
                        </div>
                    </div>
                    {/* <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Description</label>
                            <select className="form-control" name="description" value={caseData.description} >
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
                            // disabled={caseData.booking_number.length===0 || 
                            //         caseData.account_code.length===0 || 
                            //         caseData.po_number.length===0 ||
                            //         disable==='submitted'
                            // }
                            
                            >Download</button>
                            </div>
                    </div>
                </div>
            </form>
            </div>
        </div>
    </div>
    )
}

export default TableData;
