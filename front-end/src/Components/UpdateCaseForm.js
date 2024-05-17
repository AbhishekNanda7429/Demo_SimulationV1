// // UpdateCaseForm.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UpdateCaseForm = ({ match }) => {
//   const [caseDetails, setCaseDetails] = useState(null);

//   useEffect(() => {
//     const fetchCaseDetails = async () => {
//       try {
//         const response = await axios.get(`http://98.70.11.75:5000/api/get_case/${match.params.case_number}`);//http://98.70.11.75:5000/api/get_case/${caseNumber}
//         setCaseDetails(response.data);
//       } catch (error) {
//         console.error('Error fetching case details:', error);
//       }
//     };

//     fetchCaseDetails();
//   }, [match.params.case_number]);

//   if (!UpdateCaseForm) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>Case Details</h2>
//       {/* Render form fields with case details */}
//       {Object.entries(caseDetails).map(([key, value]) => (
//         <div key={key}>
//           <label>{key}:</label>
//           <input type="text" value={value} readOnly />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default UpdateCaseForm;