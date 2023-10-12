import React, { useState } from "react";
import './Style/Login.css';

export default function Login({login}) {
    const [username, setUsername] = useState("");
    const handleLoginBtn = () => {
        login(username);
    }
    
    const handleUsername = (e) => {
        setUsername(e.target.value);
    }
    
    return (
        <div className="container" >
            <div className="devforce-box">
                <img className="devforce-logo" src="/images/devforce_logo.png" />
                <span className="devforce-label">Company Management System</span>
            </div>
            <div className="top"></div>
            <div className="bottom"></div>
            <div className="center">
                <h1>Login</h1>
                <input onChange={(e) => handleUsername(e)} type="text" placeholder="username"/>
                <input type="password" placeholder="password"/>
                <button className="login-btn" onClick={() => handleLoginBtn()}>Login</button>
                <h2>&nbsp;</h2>
            </div>
        </div>
    );
}

