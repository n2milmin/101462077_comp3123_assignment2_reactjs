import React from "react";

export const EmployeeDetails = ({ employee }) => {

    const handleUpdate = () => {

    }

    return (
        <div className="">
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
                    <button className="blueBtn" onClick={ handleUpdate }>Update</button>
                </li>          
            </ul>
        </div >
    )
}