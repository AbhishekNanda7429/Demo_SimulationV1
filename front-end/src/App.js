import React ,{  } from "react";
import {Routes, Route} from 'react-router-dom';
import Header from './Components/Common/Header';
import Home from './Components/Home';
import TableData from './Components/TableData';
import Caseform from "./Components/CaseForm";
// import UpdateCaseForm from"./Components/UpdateCaseForm";


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
      <Route path='/caseform' element={<Caseform/>} /> 
      </Routes> 
          
     </div>
    </div>
  );
}

export default App;
