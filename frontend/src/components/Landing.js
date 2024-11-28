import React from "react";
import { getEmployeeById } from "../api";

export default class Landing extends React.Component {

    state = {
        employees: []
    }

    // Get emps from backend 
    handleGet = async id => {
        await getEmployeeById(id)
        .then( res => { 
            const employees = res.data.results;
            this.setState({ employees })
        })
        .catch(e => {
            console.error(e)
        })
    }

    // send to update screen 
    handleUpdate = id => {
        navigate(`/update/${id}`)
    }

    // Send to delete screen 
    handleDelete = id => {
        navigate(`/delete/${id}`)
    }

    // Send to View screen 
    handleView = id => {
        navigate(`/details/${id}`)
    }

    render() {
        return(
            // login or signup 
            <div>
                <h1>Employee Management App</h1>
                <h1>Employee List</h1>
                <button>Add Employee</button>
                <table>
                    <tr>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Id</th>
                        <th>Actions</th>
                    </tr>
                    {
                        this.state.employees.map(emp => (
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <button className="updateBtn" onClick={ this.handleUpdate }>Update</button>
                                    <button className="delBtn" onclick={ this.handleDelete }>Delete</button>
                                    <button className="viewBtn" onClick={ this.handleView }>View</button>
                                </td>
                            </tr>
                        ))
                    }
                </table>
            </div>
        )
    }
}