import React, {useEffect, useState} from "react";
import './Style/Login.css';

export default function Login({login}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const handleLoginBtn = () => {
        fetchData();
    }
    
    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const fetchData = async () => {
        try {
            const res = await fetch(`https://localhost:7030/Auth/Login`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username :  username, password : password})
            });
            if(res.status === 500){
               console.log("Username not found!"); 
            }
            const data = await res.json();
            login(data);
        }catch (err){
            console.log(err);
        }
    };
    
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
                <input onChange={(e) => handlePassword(e)} type="password" placeholder="password"/>
                <button className="login-btn" onClick={() => handleLoginBtn()}>Login</button>
                <h2>&nbsp;</h2>
            </div>
        </div>
    );
}

