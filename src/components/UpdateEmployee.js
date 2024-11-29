import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const UpdateEmployee = ({ employee }) => {

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [position, setPosition] = useState("");
    const [salary, setSalary] = useState("");
    const [department, setDepartment] = useState("");

    useEffect(() => {
        if (employee) {
            setFirstName(employee.first_name || "");
            setLastName(employee.last_name || "");
            setEmail(employee.email || "");
            setPosition(employee.position || "");
            setSalary(employee.salary || "");
            setDepartment(employee.department || "");
        }
    }, [employee]);

    const handleSubmit = () => {

    }

    return (
        <form className="add-form">
            <h2>{employee ? "Edit Employee" : "Add Employee"}</h2>

            <ul className="responsive-table">
                <li className="table-header">say more</li>

                {/* First Name  */}
                <li className="table-row">
                    <p className="left">First Name: </p>
                    <input
                        type="text"
                        id="first_name"
                        value={first_name}
                        onChange={c => setFirstName(c.target.value)}
                    />
                </li>

                {/* Last Name */}
                <li className="table-row">
                    <p className="left">Last Name: </p>
                    <input 
                        type="text"
                        id="last_name"
                        value={last_name}
                        onChange={c => setLastName(c.target.value)}
                    />
                </li>
                
                {/* Email */}
                <li className="table-row">
                    <p className="left">Email: </p>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={c => setEmail(c.target.value)}
                    />
                </li>

                {/* Department */}
                <li className="table-row">
                    <p className="left">Department: </p>
                    <input
                        type="text"
                        id="department"
                        value={department}
                        onChange={c => setDepartment(c.target.value)}
                    />
                </li>

                {/* Position */}
                <li className="table-row">
                    <p className="left">Position: </p>
                    <input
                        type="text"
                        id="position"
                        value={position}
                        onChange={c => setPosition(c.target.value)}
                    />
                </li>

                {/* Salary */}
                <li className="table-row">
                    <p className="left">Salary: </p>
                    <input
                        type="text"
                        id="salary"
                        value={salary}
                        onChange={c => setSalary(c.target.value)}
                    />
                </li>      
                <li className="table-row">
                    { employee ? 
                        <Link className="blueBtn" to="/create" >Submit</Link> :
                        <Link className="blueBtn" to="/update">Update</Link>
                    }
                </li>          
            </ul>
        </form >
    )
}