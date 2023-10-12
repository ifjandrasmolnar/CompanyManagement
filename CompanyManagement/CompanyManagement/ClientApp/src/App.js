import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import  Layout  from './components/Layout';
import './custom.css';
import ManagementContainer from "./Management/ManagementContainer";
import Login from "./Management/Login";

function App() {
    return (
        <Login/>
    );
}

export default App;
