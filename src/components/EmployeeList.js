import React from "react";

export const EmployeeList = () => {
    

    return (
        <div>
            <h2>Employee List</h2>
            <div className="addBtn">
                <Link className="blueBtn" to={`/add}`}>Add Employee</Link>
            </div>

            <ul className="responsive-table">
                <li className="table-header">
                    <div className="col-1">First Name</div>
                    <div className="col-2">Last Name</div>
                    <div className="col-3">Email</div>
                    <div className="col-4">Actions</div>
                </li>
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
            </ul>
        </div>
    )
}