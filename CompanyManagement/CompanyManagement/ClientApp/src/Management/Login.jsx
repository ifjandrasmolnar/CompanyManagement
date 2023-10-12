import './Style/Login.css';
import React from "react";

export default function Login() {
    
    const handleLoginBtn = () => {
        
    }
    
    return (
        <div className="container" >
            <span className="devforce-label">DevForce</span>
            <span className="devforce-label">Company Management system v 0.0.1</span>
            <div className="top"></div>
            <div className="bottom"></div>
            <div className="center">
                <h1>Login</h1>
                <input type="text" placeholder="username"/>
                <input type="password" placeholder="password"/>
                <button className="login-btn" onClick={() => handleLoginBtn()}>Login</button>
                <h2>&nbsp;</h2>
            </div>
        </div>
    );
}

