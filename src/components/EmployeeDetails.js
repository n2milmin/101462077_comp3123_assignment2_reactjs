import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { Link, useParams } from "react-router-dom";
import { getEmployeeById } from "../api";

const EmployeeDetails = ( ) => {

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
                    <Link className="blueBtn" to={`/updateEmployee/${employee._id}`}>Update</Link>
                    <button className="redBtn" to={ handleDelete }>Delete</button>
                    <Link className="blueBtn" to={`/employeeList`}>Back</Link>
                </li>          
            </ul>

            
            <footer>
                &copy; Nicole Milmine - 101462077
            </footer>
        </div >
    )
}

export default EmployeeDetails;