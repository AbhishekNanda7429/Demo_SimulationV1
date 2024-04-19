import React,{ useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import axios from 'axios';


const TableData = () => {
    const [data, setData] = useState([]);

  useEffect(() => {
    // axios.get('http://localhost:3000/api/get_all_cases')
    axios.get('http://127.0.0.1:5000/api/get_all_case')
    .then(data => setData(data.data))
    .catch(err=> console.log(err))
  }, []);
 
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
                        <th>case_number</th>
                        <th>booking_number</th>
                        <th>account_code</th>
                        <th>po_number</th>
                        <th>subject</th>
                        <th>description</th>
                        <th>case_owner</th>
                        {/* <th>case_number</th> */}
                        <th>category</th>
                        <th>sub_category</th>
                        <th>priority</th>
                        {/* <th>customer_code</th>
                        <th>account_name</th>
                        <th>customer_contact_name</th>
                        <th>customer_contact_email</th>
                        <th>customer_contact_title</th> */}
                        

                        </tr>
                        </thead>
                        <tbody>
                         { data.map( data =>{
                            return <tr>
                                <td>{data.case_number}</td>
                                <td>{data.booking_number}</td>
                                <td>{data.account_code}</td>
                                <td>{data.po_number}</td>
                                <td>{data.subject}</td>
                                <td>{data.description}</td>
                                <td>{data.case_owner}</td>
                                <td>{data.category}</td>
                                <td>{data.sub_category}</td>
                                <td>{data.priority}</td>
                                
                                
                            </tr>
                            })
                            }                        
                        </tbody>
                        </table>                            
                    </div>
                </div>
            </div>
            
        </React.Fragment>
    );
};

export default TableData;
