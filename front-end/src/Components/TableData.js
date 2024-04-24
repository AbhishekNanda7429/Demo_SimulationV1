import React,{ useEffect, useState } from "react";
// import { Link } from "react-router-dom";
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
                        <th>category</th>
                        <th>sub_category</th>
                        <th>priority</th>

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
                                <td>{data.reference.booking_number}</td>
                                <td>{data.reference.account_code}</td>
                                <td>{data.reference.po_number}</td>
                                <td>{data.form.case_info.subject}</td>
                                <td>{data.form.case_info.description}</td>
                                <td>{data.form.case_info.case_owner}</td>
                                <td>{data.form.case_info.category}</td>
                                <td>{data.form.case_info.sub_category}</td>
                                <td>{data.form.case_info.priority}</td>
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
