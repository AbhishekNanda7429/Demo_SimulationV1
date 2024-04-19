import React from "react";
import landing_color from './svg/landing_color.svg';

function Home()
{
    // return(
    //     <React.Fragment>
    //         <div className="container">
    //             <div className="row">
    //                 <div className="col-md-12">
    //                 <h5 className="mt-2">CRM Demo Simulation V1</h5>
    //                 <mySVG />
    //                 </div>
    //             </div>
    //         </div>
            
    //     </React.Fragment>
    // );
    return (
        <div className="home">
          <h1>CRM Demo Simulation V1</h1>
          <img src={landing_color} alt="My SVG Image"/>
        </div>
      );
}

export default Home;