import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { getEmployeeById } from "../api";

const UpdateEmployee = ( ) => {

    const { id } = useParams()
    const { handleLogout } = useAuth();
    const [ employee, setEmployee ] = useState([])

    useEffect(() => {
        const fetchEmp = async () => {
            try { 
                const res = await getEmployeeById(id)
                
                console.log(res.data.emp)
                setEmployee(res.data.emp)
            } catch (e) {
                console.log("Emp Fetch err: ", e)
                setEmployee([])
            }
        }

        fetchEmp()
    }, [])

    const handleSubmit = () => {

    }

    return (
        <div className="container">            
            <header>
                <h1>Employee Management App</h1>
                <button className="blueBtn" onClick={handleLogout}>Logout</button>
            </header>

            <form className="add-form">
                <h2>{employee ? "Edit Employee" : "Add Employee"}</h2>

                <ul className="responsive-table">
                    <li className="table-header">say more</li>

                    {/* First Name  */}
                    <li className="table-row">
                        <p className="left">First Name: </p>
                        <input
                            type="text"
                            value={employee.first_name}
                            onChange={c => setEmployee({"first_name": c.target.value})}
                        />
                    </li>

                    {/* Last Name */}
                    <li className="table-row">
                        <p className="left">Last Name: </p>
                        <input 
                            type="text"
                            id="last_name"
                            value={employee.last_name}
                            onChange={c => setEmployee({"last_name": c.target.value})}
                        />
                    </li>
                    
                    {/* Email */}
                    <li className="table-row">
                        <p className="left">Email: </p>
                        <input
                            type="email"
                            id="email"
                            value={employee.email}
                            onChange={c => setEmployee({"email": c.target.value})}
                        />
                    </li>

                    {/* Department */}
                    <li className="table-row">
                        <p className="left">Department: </p>
                        <input
                            type="text"
                            id="department"
                            value={employee.department}
                            onChange={c => setEmployee({"department": c.target.value})}
                        />
                    </li>

                    {/* Position */}
                    <li className="table-row">
                        <p className="left">Position: </p>
                        <input
                            type="text"
                            id="position"
                            value={employee.position}
                            onChange={c => setEmployee({"position": c.target.value})}
                        />
                    </li>

                    {/* Salary */}
                    <li className="table-row">
                        <p className="left">Salary: </p>
                        <input
                            type="text"
                            id="salary"
                            value={employee.salary}
                            onChange={c => setEmployee({"salary": c.target.value})}
                        />
                    </li>      
                    <li className="table-row">
                        <Link className="blueBtn" to="/update">Update</Link>
                        <Link className="blueBtn" to={`/employeeList`}>Back</Link>
                    </li>          
                </ul>
            </form >

            <footer>
                &copy; Nicole Milmine - 101462077
            </footer>
        </div>
        
    )
}

export default UpdateEmployee;