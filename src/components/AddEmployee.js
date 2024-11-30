import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { addEmployee } from "../api";

const AddEmployee = () => {

    const { handleLogout } = useAuth();
    const navigate = useNavigate()
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [position, setPosition] = useState("");
    const [salary, setSalary] = useState("");
    const [department, setDepartment] = useState("");
    const [ message, setMessage ] = useState('')

    useEffect(() => {

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

        if (!first_name || !last_name || !email || !position || !salary || !department) {
            setMessage("No, really. Say more")
            window.scrollTo(0,0)
            return 
        } 

        try{ 
            const res = await addEmployee({
                first_name,
                last_name,
                email,
                position,
                salary, 
                department
            })

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
                <button className="blueBtn" onClick={handleLogoutBtn}>Logout</button>
            </header>

            <h2>Add Employee</h2>

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
                    <button className="blueBtn" onClick={handleSubmit} >Add</button> 
                    <Link className="blueBtn" to={`/employeeList`}>Back</Link>
                </li>          
            </ul>

            <footer>
                &copy; Nicole Milmine - 101462077
            </footer>
        </div>
    )
}

export default AddEmployee;