import React from "react";
import {useNavigate} from "react-router-dom";
import "./Style/Navbar.css";

export default function Navbar(){
    const navigate = useNavigate();    
    const handleClickBtn = (route) => {
        navigate(route);
    };
    
    return(
        <div className="navbar-container">
            <nav className="management-sidebar">
                <button onClick={() => handleClickBtn("/")}>Home</button>
                <button onClick={() => handleClickBtn("/contact")}>Contacts</button>
            </nav>
            <nav className="management-navbar">

            </nav>
        </div>       
    );
};