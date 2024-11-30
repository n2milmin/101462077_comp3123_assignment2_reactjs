import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, handleLogout } from "../AuthContext";
import { getEmployees, deleteEmployee, department, position } from "../api";

const EmployeeList = () => {
    
    const navigate = useNavigate()
    const { handleLogout } = useAuth();
    const [ employees, setEmployees ] = useState([])
    const [ message, setMessage ] = useState('')
    const [searchCriteria, setSearchCriteria] = useState({
        "kind": '',
        "type": ''
    });

    const fetchEmp = async () => {
        try { 
            if(searchCriteria.kind == ''){
                const res = await getEmployees()    
                console.log(res)
                setEmployees(res.data?.employees || [])
                setMessage('')

            } else if(searchCriteria.kind == "department") {
                setEmployees([])
                console.log("fetchEmp err: ", searchCriteria)

                const res = await department(searchCriteria.type)
                console.log(res.data)
                setEmployees(res.data?.emp || [])

            } else if(searchCriteria.kind == "position"){
                setEmployees([])
                console.log("fetchEmp err: ", searchCriteria)

                const res = await position(searchCriteria.type)
                console.log(res.data)
                setEmployees(res.data?.emp || [])

            }else{
                setEmployees([])
            }

        } catch (e) {
            console.log("Emp Fetch err: ", e)
            setEmployees([])
        }
    }
    
    useEffect(() => {
        fetchEmp()
    }, [])

    const handleLogoutBtn = async () => {
        try {
            await handleLogout();

            navigate('/')
        } catch (e) {
            console.log("Error logging out: ", e)
        }
    }

    const handleDelete = async id => {
        try{
            await deleteEmployee(id)
            setMessage('')
            fetchEmp()
        } catch (e) {
            setMessage("Delete error: ", e.message)
        }
    }

    return (
        <div className="container">
            <header>
                <h1>Employee Management App</h1>
                    <button className="blueBtn" onClick={ handleLogoutBtn }>Logout</button>
                </header>

            <h2>Employee List</h2>
            <div className="addBtn">
                <Link className="blueBtn" to='/addEmployee'>Add Employee</Link>

                <div className="search">
                    <select 
                    onChange={c => setSearchCriteria({...searchCriteria, "kind": c.target.value})} 
                    value={searchCriteria.kind}>
                        <option value="">Select Filter</option>
                        <option value="department">Department</option>
                        <option value="position">Position</option>
                    </select>
                    <input
                            type="text"
                            placeholder=""
                            value={searchCriteria.type}
                            onChange={c => setSearchCriteria({...searchCriteria, "type": c.target.value})} 
                        />
                    <button className="searchBtn" onClick={ fetchEmp }>Search</button>
                </div>
            </div>
            
            <ul className="responsive-table">
                <li className="table-header">
                    <div className="col-1">First Name</div>
                    <div className="col-2">Last Name</div>
                    <div className="col-3">Email</div>
                    <div className="col-4">Actions</div>
                </li>

                { message !== '' && 
                    <li className="table-row">
                        <p>{message}</p>
                    </li>
                }   

                {   employees.length > 0 ? 
                    employees.map(emp => (
                        <li className="table-row" key={emp._id}>
                            <div className="col-1">{emp.first_name}</div>
                            <div className="col-2">{emp.last_name}</div>
                            <div className="col-3">{emp.email}</div>
                            <div className="col-4">
                                <Link className="blueBtn" to={`/updateEmployee/${emp._id}`}>Update</Link>
                                <button className="redBtn" onClick={() => handleDelete(emp._id) }>Delete</button>
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