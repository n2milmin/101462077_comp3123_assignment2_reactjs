import React, { useState } from "react";

export const AddEmployee = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [position, setPosition] = useState("");
    const [salary, setSalary] = useState("");
    const [department, setDepartment] = useState("");

    const handleSubmit = () => {

    }

    return (
        <form className="add-form">
            <h2>Add Employee</h2>

            <ul className="responsive-table">
                <li className="table-header">say more</li>

                {/* First Name  */}
                <li className="table-row">
                    <p>First Name: </p>
                    <input
                        type="text"
                        id="first_name"
                        value={firstName}
                        onChange={c => setFirstName(c.target.value)}
                    />
                </li>

                {/* Last Name */}
                <li className="table-row">
                    <p className="input-name">Last Name: </p>
                    <input
                        type="text"
                        id="last_name"
                        value={lastName}
                        onChange={c => setLastName(c.target.value)}
                    />
                </li>
                
                {/* Email */}
                <li className="table-row">
                    <p>Email: </p>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={c => setEmail(c.target.value)}
                    />
                </li>

                {/* Department */}
                <li className="table-row">
                    <p>Department: </p>
                    <input
                        type="text"
                        id="department"
                        value={department}
                        onChange={c => setDepartment(c.target.value)}
                    />
                </li>

                {/* Position */}
                <li className="table-row">
                    <p>Position: </p>
                    <input
                        type="text"
                        id="position"
                        value={position}
                        onChange={c => setPosition(c.target.value)}
                    />
                </li>

                {/* Salary */}
                <li className="table-row">
                    <p>Salary: </p>
                    <input
                        type="text"
                        id="salary"
                        value={salary}
                        onChange={c => setSalary(c.target.value)}
                    />
                </li>      
                <li className="table-row">
                    <button className="blueBtn" onClick={ handleSubmit }>Submit</button>
                </li>          
            </ul>
        </form >
    )
}