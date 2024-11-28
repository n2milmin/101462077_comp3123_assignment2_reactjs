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
            <div>
                <h1>Employee Management App</h1>
                <h1>Employee List</h1>
                <Link className="blueBtn" to={`/add}`}>Add Employee</Link>
                <table>
                    <thead>
                        <tr>
                            <th>Employee First Name</th>
                            <th>Employee Last Name</th>
                            <th>Employee Email Id</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.employees.map(emp => (
                                <tr>
                                    <td>{ emp.first_name }</td>
                                    <td>{ emp.last_name }</td>
                                    <td>{ emp.email }</td>
                                    <td>
                                        <Link className="blueBtn" to={`/update/${emp._id}`}>Update</Link>
                                        <Link className="redBtn" to={`/update/${emp._id}`}>Delete</Link>
                                        <Link className="blueBtn" to={`/update/${emp._id}`}>View</Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}