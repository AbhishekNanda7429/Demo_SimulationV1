import React, {useState} from "react";
// import axios from "axios";
import {v4 as uuidv4 } from 'uuid';

const Caseform = () => {
const[formValue, setFormValue]= useState({
                                        booking_number:'', 
                                        account_code:'', 
                                        po_number:'', 
                                        subject:'', 
                                        description:'', 
                                        case_owner:'', 
                                        category:'',
                                        sub_category:'',
                                        priority:'',
                                        });
// const [fetchedData, setFetchedData] = useState([]);

const[disable, setDisable]=useState('typing');

const handleInput=(e)=>{
    // const {name, value}= e.target;
    setFormValue({...formValue, [e.target.name]: e.target.value});
}

const handleSubmit=async (e)=>{
    e.preventDefault();
    const case_var = {
        case_id: uuidv4().substring(0,5),
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
    fetch('http://localhost:3000/api/submit-form',{
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
            <h5 className="mt-2">Case Form</h5>
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
                    {/* <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Case Number</label>
                            <input type="text" name="case_number" className="form-control" value={formValue.case_number} onChange={ handleInput} />
                        </div>
                    </div> */}
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
                    {/* <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Customer Code</label>
                            <input type="text" name="customer_code" className="form-control" value={formValue.subject} onChange={ handleInput} />
                        </div>
                    </div> */}
                    {/* <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Account Name</label>
                            <input type="text" name="account_name" className="form-control" value={formValue.subject} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Customer Contact Name</label>
                            <input type="text" name="customer_contact_name" className="form-control" value={formValue.subject} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Customer Contact Email</label>
                            <input type="text" name="customer_contact_email" className="form-control" value={formValue.subject} onChange={ handleInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-lable">Customer Contact Title</label>
                            <input type="text" name="customer_contact_title" className="form-control" value={formValue.subject} onChange={ handleInput} />
                        </div>
                    </div> */}

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
                                    // formValue.subject.length===0 ||
                                    // formValue.description.length===0 ||
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