import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { getEmployees } from "../api";

const EmployeeList = () => {
    
    const navigate = useNavigate()
    const { handleLogout } = useAuth();
    const [ employees, setEmployees ] = useState([])

    useEffect(() => {
        const fetchEmp = async () => {
            try { 
                const res = await getEmployees()

                console.log(res.data)
                setEmployees(res.data?.employees || [])
            } catch (e) {
                console.log("Emp Fetch err: ", e)
                setEmployees([])
            }
        }

        fetchEmp()
    }, [navigate])

    const handleLogoutBtn = async () => {
        try {
            await handleLogout();

            navigate('/')
        } catch (e) {
            console.log("Error logging out: ", e)
        }
    }

    const handleDelete = () => {

    }

    return (
        <div className="container">
            <header>
                <h1>Employee Management App</h1>
                <button className="blueBtn" onClick={handleLogoutBtn}>Logout</button>
            </header>

            <h2>Employee List</h2>
            <div className="addBtn">
                <Link className="blueBtn" to='/addEmployee'>Add Employee</Link>
            </div>

            <ul className="responsive-table">
                <li className="table-header">
                    <div className="col-1">First Name</div>
                    <div className="col-2">Last Name</div>
                    <div className="col-3">Email</div>
                    <div className="col-4">Actions</div>
                </li>
                {   employees.length > 0 ? 
                    employees.map(emp => (
                        <li className="table-row" key={emp._id}>
                            <div className="col-1">{emp.first_name}</div>
                            <div className="col-2">{emp.last_name}</div>
                            <div className="col-3">{emp.email}</div>
                            <div className="col-4">
                                <Link className="blueBtn" to={`/updateEmployee/${emp._id}`}>Update</Link>
                                <button className="redBtn" onClick={ handleDelete }>Delete</button>
                                <Link className="blueBtn" to={`/employeeDetails/${emp._id}`}>View</Link>
                            </div>

                        </li>
                    )) :
                    <li className="table-row">
                        <p>No employees to be found (*_*)</p>
                    </li>
                }
            </ul>

            <footer>
                &copy; Nicole Milmine - 101462077
            </footer>
        </div>
    )
}

export default EmployeeList;