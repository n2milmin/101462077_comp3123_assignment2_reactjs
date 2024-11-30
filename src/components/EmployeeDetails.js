import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getEmployeeById, deleteEmployee } from "../api";

const EmployeeDetails = ( ) => {

    const { id } = useParams()
    const navigate = useNavigate()
    const { handleLogout } = useAuth();
    const [ employee, setEmployee ] = useState([])
    const [ message, setMessage ] = useState('')

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
        setMessage('')
    }, [navigate])

    
    const handleLogoutBtn = async () => {
        try {
            await handleLogout();

            navigate('/')
        } catch (e) {
            console.log("Error logging out: ", e)
        }
    }

    const handleDelete = async () => {
        try{
            await deleteEmployee(id)
            setMessage('')
            navigate('/employeeList')
        } catch (e) {
            setMessage("Delete error: ", e.message)
        }
    }

    return (
        <div className="container">
            <header>
                <h1>Employee Management App</h1>
                <button className="blueBtn" onClick={handleLogoutBtn}>Logout</button>
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

                { message !== '' && 
                    <li className="table-row">
                        <p>{message}</p>
                    </li>
                }
                <li className="table-row">
                    <Link className="blueBtn" to={`/updateEmployee/${employee._id}`}>Update</Link>
                    <button className="redBtn" onClick={ handleDelete }>Delete</button>
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