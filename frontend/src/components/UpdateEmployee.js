import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { getEmployeeById, updateEmployee } from "../api";

const UpdateEmployee = ( ) => {

    const { id } = useParams()
    const navigate = useNavigate() 
    const { handleLogout } = useAuth();
    const [employee, setEmployee] = useState({
        "first_name": '',
        "last_name": '',
        "email": '',
        "position": '',
        "salary": '',
        "department": ''
    });
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
    }, [navigate])

    
    const handleLogoutBtn = async () => {
        try {
            await handleLogout();

            navigate('/')
        } catch (e) {
            console.log("Error logging out: ", e)
        }
    }

    const handleSubmit = async () => {

        if (!employee.first_name || !employee.last_name || !employee.email || !employee.position || !employee.salary || !employee.department) {
            setMessage("No, really. Say more")
            window.scrollTo(0,0)
            return 
        }

        try {
            const {res} = await updateEmployee(id, employee)

            if(res.ok){
                setMessage("User sucessfully created!")
                window.scrollTo(0,0)
            } 
        } catch (e) {
            setMessage("Error: please ensure email is unique.")
            window.scrollTo(0,0)
        }
    }

    return (
        <div className="container">            
            <header>
                <h1>Employee Management App</h1>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                    <Link className="blueBtn" to='/employeeList'>Home</Link>
                    <button className="blueBtn" onClick={handleLogoutBtn}>Logout</button>
                </div>
            </header>

            <h2>{employee ? "Edit Employee" : "Add Employee"}</h2>

            <ul className="responsive-table">
                { message == '' ? 
                    <li className="table-header">say more</li> :
                    <li className="table-header">
                        <p>{message}</p>
                    </li>
                }

                {/* First Name  */}
                <li className="table-row">
                    <p className="left">First Name: </p>
                    <input
                        type="text"
                        value={employee.first_name}
                        onChange={c => setEmployee({...employee, "first_name": c.target.value})}
                    />
                </li>

                {/* Last Name */}
                <li className="table-row">
                    <p className="left">Last Name: </p>
                    <input 
                        type="text"
                        id="last_name"
                        value={employee.last_name}
                        onChange={c => setEmployee({...employee, "last_name": c.target.value})}
                    />
                </li>
                
                {/* Email */}
                <li className="table-row">
                    <p className="left">Email: </p>
                    <input
                        type="email"
                        id="email"
                        value={employee.email}
                        onChange={c => setEmployee({...employee, "email": c.target.value})}
                    />
                </li>

                {/* Department */}
                <li className="table-row">
                    <p className="left">Department: </p>
                    <input
                        type="text"
                        id="department"
                        value={employee.department}
                        onChange={c => setEmployee({...employee, "department": c.target.value})}
                    />
                </li>

                {/* Position */}
                <li className="table-row">
                    <p className="left">Position: </p>
                    <input
                        type="text"
                        id="position"
                        value={employee.position}
                        onChange={c => setEmployee({...employee, "position": c.target.value})}
                    />
                </li>

                {/* Salary */}
                <li className="table-row">
                    <p className="left">Salary: </p>
                    <input
                        type="text"
                        id="salary"
                        value={employee.salary}
                        onChange={c => setEmployee({...employee, "salary": c.target.value})}
                    />
                </li>      
                <li className="table-row">
                    <button className="blueBtn" onClick={ handleSubmit }>Update</button>
                    <Link className="blueBtn" to='/employeeList'>Back</Link>
                </li>          
            </ul>

            <footer>
                &copy; Nicole Milmine - 101462077
            </footer>
        </div>
        
    )
}

export default UpdateEmployee;