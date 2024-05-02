import React,{ useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';


const TableData = () => {
    const [data, setData] = useState([]);
    const [caseData, setCaseData] = useState(null);

  useEffect(() => {
    // axios.get('http://localhost:3000/api/get_all_cases')
    axios.get('http://13.233.235.130:5000/api/get_all_cases')
    .then(data => setData(data.data))
    .catch(err=> console.log(err))
  }, []);

  const handleCaseClick = async (caseNumber)=>{
    try{
        const response = await axios.get(`http://13.233.235.130:5000/api/get_case/${caseNumber}`);
        setCaseData(response.data)
    } catch(error){
        alert("Error retrieving case data");
    }
  };

  const sendWebhook = async (case_number) => {
    try {
      const response = await axios.post('http://13.233.235.130:5000/api/send_webhook', { case_number });
      if (response.data.success) {
        console.log('Webhook sent successfully');
      } else {
        console.error('Error sending webhook:', response.data.error);
      }
    } catch (error) {
      console.error('Error sending webhook:', error);
    }
  };

    return(
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                    <h5 className="mt-2">CASE LIST</h5>
                       <div className="d-grid d-md-flex justify-content-md-end mb-3">
                        {/* <Link to="/caseform" className="btn btn-warning">Add New Case</Link> */}
                       </div>
                       <table className="table table-bordered table-striped">
                        <thead>
                        <tr>
                        <th>Case Number</th>
                        <th>Booking Number</th>
                        <th>Account Code</th>
                        <th>PO Number</th>
                        <th>Subject</th>
                        <th>Description</th>
                        <th>Case Owner</th>
                        <th>Category</th>
                        <th>Sub Category</th>
                        <th>Priority</th>
                        <th>Action</th>

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
                                <td>{data.form.case_info.case_number}</td>
                                <td>{data.reference.booking_number}</td>
                                <td>{data.reference.account_code}</td>
                                <td>{data.reference.po_number}</td>
                                <td>{data.form.case_info.subject}</td>
                                <td>{data.form.case_info.description}</td>
                                <td>{data.form.case_info.case_owner}</td>
                                <td>{data.form.case_info.category}</td>
                                <td>{data.form.case_info.sub_category}</td>
                                <td>{data.form.case_info.priority}</td>
                                {/* <td>
                                    <Link to={`/updatecaseform/${data.form.case_info.case_number}`}>
                                    <button>View Details</button>
                                    </Link>
                                </td> */}
                                <td>                               
                                    <button onClick={() => sendWebhook(data.form.case_info.case_number)}>View Details</button>
                                </td>
                            </tr>
                            })
                            }                        
                        </tbody>
                        </table>      
                        <h5 className="mt-2">CASE DETAIL</h5>
                        {caseData && <pre>{JSON.stringify(caseData,null,2)}</pre>}                      
                    </div>
                </div>
            </div>
            
        </React.Fragment>
    );
};

export default TableData;
