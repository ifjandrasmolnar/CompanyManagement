import React, { useState, useEffect } from 'react';
import './style/Employees.css';

export default function Employees({jwtToken}) {
    const [employeesList, setEmployeesList] = useState(null);
    const [roles, setRoles] = useState(null);
    const [userRoles, setUserRoles] = useState(null);
    
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch(`https://localhost:7030/api/GetEmployees`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                })
                if(response.status === 200) {
                    console.log("Role is correct !");
                    const data = await response.json();
                    console.log(data.employees);
                    console.log(data.roles);
                    console.log(data.userRoles);
                    setEmployeesList(data.employees);
                    setRoles(data.roles);
                    setUserRoles(data.userRoles);
                } else {
                    console.log("Something went wrong !");
                }
            } catch (err) {
                console.log(err);
            }
        }
        
        fetchEmployees();
    }, [])

    const handleOnClickDelete = (id) => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://localhost:7030/api/DeleteUser`,{
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', Authorization: `Bearer ${jwtToken}`},
                    body: JSON.stringify({Id : id})
                });
                if(res.status === 404){
                    console.log("User not found!");
                }             
                
            }catch (err){
                console.log(err);
            }
        };
        fetchData();
    }
    
    return(
        <div className="employees-container">
            <div className="employees-list-container">
                <span className="employees-list-title">Employees List</span>
                <div className="employees-list-box">
                    <table className="employees-table">
                        <tr className="table-tr-1">
                            <td width="40%">Username</td>
                            <td width="20%">Role</td>
                            <td width="20%">Position</td>
                            <td width="20%">Actions</td>
                        </tr>
                        {employeesList && employeesList.map((e, index) => (
                            <tr 
                                key={index}
                                className="table-tr-2"
                                style={index % 2 === 0 ? {backgroundColor: "#574e4e"} : {backgroundColor: "#7a6868"} }
                            >
                                <td>{e.userName}</td>
                                <td>{roles.find(x => x.id === userRoles.find(x => x.userId === e.id).roleId).name}</td>
                                <td>Software Developer</td>
                                <td>
                                    <i 
                                        className="fa-solid fa-user-pen employee-action-icon"
                                    ></i>&nbsp;&nbsp;
                                    <i 
                                        className="fa-solid fa-envelope employee-action-icon"
                                    ></i>&nbsp;&nbsp;
                                    <i 
                                        className="fa-solid fa-trash employee-action-icon"
                                        onClick={() => handleOnClickDelete(e.id)}
                                    ></i>
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
            <div className="employees-create-container">

            </div>
        </div>
    );
}