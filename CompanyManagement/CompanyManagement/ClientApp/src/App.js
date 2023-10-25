import React, { useState } from 'react';
import './custom.css';
import ManagementContainer from "./Management/ManagementContainer";
import Login from "./Management/Login";
import jwt_Decode from "jwt-decode";

function App() {
    const [userLogged, setUserLogged] = useState(false);
    const [username, setUsername] = useState("");
    const [jwtToken, setJwtToken] = useState(null);
    
    const handleLogin = (data) => {
        const decodedToken = jwt_Decode(data.token);
        setUsername(decodedToken.username);
        setJwtToken(decodedToken);
        setUserLogged(true);
    }

    const handleLogout = () => {
        setUserLogged(false);
        setUsername("");
        setJwtToken(null);
    }
    
    return (
        <>
            { userLogged ? <ManagementContainer logout={handleLogout} username={username} jwtToken={jwtToken} /> : <Login login={handleLogin} /> }
        </>
    );
}

export default App;
