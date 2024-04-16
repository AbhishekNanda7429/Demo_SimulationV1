import React ,{  } from "react";
import {Routes, Route} from 'react-router-dom';
import Header from './Components/Common/Header';
import Home from './Components/Home';
import TableData from './Components/TableData';
import Adduser from "./Components/Adduser";
import Edituser from "./Components/Edituser";
import ExportCsv from "./Components/Exportcsv";
import Caseform from "./Components/CaseForm";
import Addmoreinput from "./Components/Addmoreinput";
import UpdateCaseForm from "./Components/UpdateCaseForm";

function App() 
{  
  return (    
    <div className="App">
     <div className='leftPanel'>    
      <Header/>
     </div>
     <div className='rightPanel'>
      <Routes>
      <Route path='/' element={<Home/>} /> 
      <Route path='/tabledata' element={<TableData/>} />  
      {/* <Route path='/adduser' element={<Adduser/>} />   */}
      {/* <Route path='/edituser/:id' element={<Edituser/>} />  */}
      {/* <Route path='/exportcsv' element={<ExportCsv/>} />  */}
      <Route path='/caseform' element={<Caseform/>} /> 
      <Route path='/updatecaseform' element={<UpdateCaseForm/>}  /> 
      {/* <Route path='/addmoreinput' element={<Addmoreinput/>} />  */}
    
     
          

      </Routes> 
          
     </div>
    </div>
  );
}

export default App;
