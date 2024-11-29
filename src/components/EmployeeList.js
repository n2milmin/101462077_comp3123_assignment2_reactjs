import React, { useState } from "react";
import { useAuth } from "../AuthContext";

export const EmployeeList = () => {
    
    const { handleLogout } = useAuth();
    const employees = useState('')

    return (
        <div className="container">
            <header>
                <h1>Employee Management App</h1>
                <button className="blueBtn" onClick={handleLogout}>Logout</button>
            </header>

            <h2>Employee List</h2>
            <div className="addBtn">
                <button className="blueBtn" to={`/add}`}>Add Employee</button>
            </div>

            <ul className="responsive-table">
                <li className="table-header">
                    <div className="col-1">First Name</div>
                    <div className="col-2">Last Name</div>
                    <div className="col-3">Email</div>
                    <div className="col-4">Actions</div>
                </li>
                {
                    employees.map(emp => (
                        <li className="table-row">
                            <div className="col-1">{emp.first_name}</div>
                            <div className="col-2">{emp.last_name}</div>
                            <div className="col-3">{emp.email}</div>
                            <div className="col-4">
                                <button className="blueBtn" to={`/update/${emp._id}`}>Update</button>
                                <button className="redBtn" to={`/update/${emp._id}`}>Delete</button>
                                <button className="blueBtn" to={`/update/${emp._id}`}>View</button>
                            </div>

                        </li>
                    ))
                }
            </ul>

            <footer>
                &copy; Nicole Milmine - 101462077
            </footer>
        </div>
    )
}