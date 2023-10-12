import React from "react";
import {useNavigate} from "react-router-dom";
import "./Style/Navbar.css";

export default function Navbar({logout, username}){
    const navigate = useNavigate();    
    const handleClickBtn = (route) => {
        navigate(route);
    };
    
    const handleLogout = () => {
        logout();
    }
    
    return(
        <div className="navbar-container">
            <nav className="management-sidebar">
                <div className="sidebar-devforce">
                    <span>DevForce</span><br />
                    <span>Management System</span>
                </div>
                <div className="sidebar-menu-container">
                    <div className="sidebar-menu-item">
                        <span>Company Overview</span>
                    </div>
                    <div className="sidebar-menu-item">
                        <span>Employees</span>
                    </div>
                    <div className="sidebar-menu-item">
                        <span>Rules</span>
                    </div>
                    <div className="sidebar-menu-item">
                        <span>Statistics</span>
                    </div>
                </div>
            </nav>
            <nav className="management-navbar">
                <div className="navbar-items1"></div>
                <div className="navbar-items2">
                    <div className="navbar-language-box">
                        <span>Languages</span>
                        <div className="language-container">
                            <img src="/images/english.png" width="40px" height="40px" />
                            <img src="/images/hungarian.png" width="40px" height="40px" />
                        </div>
                    </div>
                    <div className="navbar-username-container">
                        <span className="navbar-username">{username}</span>
                        <span>SysAdmin</span>
                    </div>
                    <div className="navbar-avatar-box" style={{backgroundImage: "url(/images/default_avatar.png)"}}></div>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
            </nav>
        </div>       
    );
};