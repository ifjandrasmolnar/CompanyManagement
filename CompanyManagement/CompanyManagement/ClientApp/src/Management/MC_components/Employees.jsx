import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import './style/Employees.css';

export default function Employees({jwtToken}) {
    const [refreshComponent, setRefreshComponent] = useState(false);
    const [decodedToken, setDecodedToken] = useState(jwtDecode(jwtToken));
    const [employeesList, setEmployeesList] = useState(null);
    const [roles, setRoles] = useState(null);
    const [userRoles, setUserRoles] = useState(null);
    const [newName, setNewName] = useState(null);
    const [newEmail, setNewEmail] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [newRole, setNewRole] = useState(null);

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
    }, [refreshComponent])

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
                } else {
                    console.log("User successfully deleted !");
                    setRefreshComponent(!refreshComponent)
                }
            }catch (err){
                console.log(err);
            }
        };
        fetchData();
    }

    const handleNewRole = (e) => {
        setNewRole(e.target.value);
    }

    const handleNewUsername = (e) => {
        setNewName(e.target.value);
    }

    const handleNewEmail = (e) => {
        setNewEmail(e.target.value);
    }

    const handleNewPassword = (e) => {
        setNewPassword(e.target.value);
    }

    const handleCreateUser = () => {
        if(!newName || !newEmail || !newPassword || !newRole) {
            console.log("Need to fill all field !");
        }

        const createNewUser = async () => {
            try {
                const bodyData = {
                    Username: newName,
                    Email: newEmail,
                    Password: newPassword,
                    Role: newRole
                }

                const response = await fetch(`https://localhost:7030/api/CreateUser`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwtToken}`
                    },
                    body: JSON.stringify(bodyData)
                })
                if(response.status === 200) {
                    console.log("User created successfully !");
                    setRefreshComponent(!refreshComponent)
                } else {
                    console.log("An error occured");
                }
            } catch (err) {
                console.log(err);
            }
        }
        createNewUser();
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
                        {   decodedToken.role === "Admin" ?
                            employeesList && employeesList.map((e, index) => (
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
                        )) : <span className="no-authorized-text">You are not authorized for this function !</span> }
                    </table>
                </div>
            </div>
            <div className="employees-create-container">
                <div className="employees-form-container">
                    <span className="employees-form-title">Create User</span>
                    <hr />
                    { decodedToken.role === "Admin" ?
                    <div className="employees-form-input-container">
                        <input type="text" placeholder="Username" className="create-input" onChange={(e) => handleNewUsername(e)} />
                        <input type="email" placeholder="E-mail" className="create-input" onChange={(e) => handleNewEmail(e)} />
                        <input type="password" placeholder="Password" className="create-input" onChange={(e) => handleNewPassword(e)} />
                        <select defaultValue={null} className="create-input" onChange={(e) => handleNewRole(e)}>
                            <option selected disabled>- Select Role -</option>
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>
                        <button className="employee-create-btn" onClick={handleCreateUser}>Create</button>
                    </div>
                        : <span className="no-authorized-text">You are not authorized for this function !</span> }
                </div>
            </div>
        </div>
    );
}