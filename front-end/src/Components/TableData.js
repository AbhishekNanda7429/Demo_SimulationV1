import React,{ useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';


const TableData = () => {
    const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/getdata')
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
                        <Link to="/caseform" className="btn btn-warning">Add New Case</Link>
                       </div>
                       <table className="table table-bordered table-striped">
                        <thead>
                        <tr>
                        <th>Booking ID</th>
                        <th>Customer Code</th>
                        <th>Account Name</th>
                        <th>Case Owner</th>
                        <th>Case Number</th>
                        <th>Booking Status</th>
                        <th>Shipment Status</th>
                        </tr>
                        </thead>
                        <tbody>
                         { data.map( data =>{
                            return <tr>
                                <td>{data.booking_id}</td>
                                <td>{data.customer_code}</td>
                                <td>{data.account_name}</td>
                                <td>{data.case_owner}</td>
                                <td>{data.case_number}</td>
                                <td>{data.booking_status}</td>
                                <td>{data.shipment_status}</td>
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
