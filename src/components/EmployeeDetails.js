import React from "react";
import { useAuth } from "../AuthContext";

export const EmployeeDetails = ({ employee }) => {

    const { handleLogout } = useAuth();
    const handleDelete = () => {

    }

    return (
        <div className="container">
            <header>
                <h1>Employee Management App</h1>
                <button className="blueBtn" onClick={handleLogout}>Logout</button>
            </header>
            <h2>Employee Details</h2>

            <ul className="responsive-table">
                {/*  Name  */}
                <li className="table-header">
                    <p>{ employee.first_name } { employee.last_name }</p>
                </li>
                
                {/* Email */}
                <li className="table-row">
                    <p className="left">Email:</p>
                    <p className="right">{ employee.email }</p>
                </li>

                {/* Department */}
                <li className="table-row">
                    <p className="left">Department:</p> 
                    <p className="right">{ employee.department }</p>
                </li>

                {/* Position */}
                <li className="table-row">
                    <p className="left">Position:</p> 
                    <p className="right">{ employee.position }</p>
                </li>

                {/* Salary */}
                <li className="table-row">
                    <p className="left">Salary:</p> 
                    <p className="right">${ employee.salary }</p>
                </li>      
                <li className="table-row">
                    <button className="blueBtn" to={`/update/${employee._id}`}>Update</button>
                    <button className="redBtn" to={ handleDelete }>Delete</button>
                    <button className="blueBtn" to={`/employeeList`}>Back</button>
                </li>          
            </ul>

            
            <footer>
                &copy; Nicole Milmine - 101462077
            </footer>
        </div >
    )
}