import React from "react";
import "./Style/ManagementContainer.css";
import Navbar from "./Navbar";
import {Route, Routes} from "react-router-dom";
import LandingPage from "./MC_components/LandingPage";
import Employees from "./MC_components/Employees";
import Contacts from "./Contacts";

export default function ManagementContainer({logout, username, jwtToken, jwtOriginal}){    
    return(
        <div className="app-container">
            <Navbar logout={logout} username={username} jwtToken={jwtToken}/>
            <div className="workspace-container">
                <Routes>
                    <Route path='/' element= {
                        <LandingPage/>
                    }/>
                    <Route path='/employees' element= {
                        <Employees
                            jwtToken={jwtOriginal}
                        />
                    }/>
                </Routes>
            </div>
        </div>
    );
};