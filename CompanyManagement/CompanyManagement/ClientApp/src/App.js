import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import  Layout  from './components/Layout';
import './custom.css';
import ManagementContainer from "./Management/ManagementContainer";
import Login from "./Management/Login";

function App() {
    const [userLogged, setUserLogged] = useState(false);
    const [username, setUsername] = useState("");
    
    const handleLogin = (data) => {
        setUsername(data);
        setUserLogged(true);
    }

    const handleLogout = () => {
        setUserLogged(false);
    }
    
    return (
        <>
            { userLogged ? <ManagementContainer logout={handleLogout} username={username} /> : <Login login={handleLogin} /> }
        </>
    );
}

export default App;
