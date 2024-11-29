import React from "react";
import { getEmployees } from "../api";
import { Link } from 'react-router-dom';


export default class Landing extends React.Component {
    
    state = {
        employees: []
    }

    // Get emps from backend 
    componentDidMount() {
        getEmployees()
        .then( res => { 
            console.log(res.data.employees)
            this.setState({ employees : res.data.employees })
        })
        .catch(e => {
            console.error(e)
        })
    }

    render() {
        return(
            // login or signup 
            <div className="container">
                <header>
                    <h1>Employee Management App</h1>
                    <Link className="blueBtn" to={'/logout'}>Logout</Link>
                </header>

                <h2>Employee List</h2>
                <Link className="blueBtn" to={`/add}`}>Add Employee</Link>
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="col-1">First Name</div>
                        <div className="col-2">Last Name</div>
                        <div className="col-3">Email</div>
                        <div className="col-4">Actions</div>
                    </li>
                    <tbody>
                        {
                            this.state.employees.map(emp => (
                                <li className="table-row">
                                    <div className="col-1">{emp.first_name}</div>
                                    <div className="col-2">{emp.last_name}</div>
                                    <div className="col-3">{emp.email}</div>
                                    <div className="col-4">
                                        <Link className="blueBtn" to={`/update/${emp._id}`}>Update</Link>
                                        <Link className="redBtn" to={`/update/${emp._id}`}>Delete</Link>
                                        <Link className="blueBtn" to={`/update/${emp._id}`}>View</Link>
                                    </div>

                                </li>
                            ))
                        }
                    </tbody>
                </ul>

                <footer>
                    &copy; Nicole Milmine - 101462077
                </footer>
            </div>
        )
    }
}