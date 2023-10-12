import React, { useState, useEffect } from "react";
import {Navbar} from "reactstrap";
import Chart1 from "./Charts/Chart1";
import Chart2 from "./Charts/Chart2";
export default function LandingPage(){
    
    
    return(
        <div className="management-main-container">
            <Chart1 />
            <Chart2 />
        </div>
    );
};
