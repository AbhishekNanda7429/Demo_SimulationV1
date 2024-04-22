import React,{ useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import axios from 'axios';


const TableData = () => {
    const [data, setData] = useState([]);
    const [caseData, setCaseData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/get_all_cases')
    // axios.get('http://13.233.235.130:5000/api/get_all_cases')
    .then(data => setData(data.data))
    .catch(err=> console.log(err))
  }, []);

  const handleCaseClick = async (caseNumber)=>{
    try{
        const response = await axios.get(`http://localhost:5000/api/get_case/${caseNumber}`);
        console.log("response",response)
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
                            return <tr key={data.case_number}>
                                <td>
                                    <a href="#" 
                                    onClick={()=> handleCaseClick(data.case_number)}>
                                    {data.case_number}
                                    </a>
                                </td>
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
                        <h5 className="mt-2">CASE DETAIL</h5>
                        {caseData && <pre>{JSON.stringify(caseData,null,2)}</pre>}                      
                    </div>
                </div>
            </div>
            
        </React.Fragment>
    );
};

export default TableData;
