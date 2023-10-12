import React from "react";
import "./Style/ManagementContainer.css";
import Navbar from "./Navbar";
import {Route, Routes} from "react-router-dom";
import LandingPage from "./LandingPage";
import Contacts from "./Contacts";

export default function ManagementContainer({logout, username}){    
    return(
        <div className="app-container">
            <Navbar logout={logout} username={username}/>
            <div className="workspace-container">
                <Routes>
                    <Route path='/' element= {
                        <LandingPage/>
                    }/>
                    <Route path='/contact' element= {
                        <Contacts/>
                    }/>
                </Routes>
            </div>
        </div>
    );
};