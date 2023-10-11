import './Style/Login.css';
import React from "react";

export default function Login() {
    return (
        <div className="container" >
            <div className="top"></div>
            <div className="bottom"></div>
            <div className="center">
                <h1>Login</h1>
                <input type="text" placeholder="username"/>
                <input type="password" placeholder="password"/>
                <h2>&nbsp;</h2>
            </div>
        </div>
    );
}

