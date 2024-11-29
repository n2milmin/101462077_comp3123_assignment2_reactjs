import React from "react";
import { getEmployees } from "../api";
import { Link } from 'react-router-dom';
import AddEmployee from "./AddEmployee";
// import DeleteEmployee from "./components/DeleteEmployee";
// import EmployeeDetails from "./components/EmployeeDetails";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import UpdateEmployee from "./components/UpdateEmployee";


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
            console.log(this.state.employees)
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
                    {/* <Link className="blueBtn" to={'/login'}>Login</Link> */}
                </header>

                <AddEmployee employee={this.state.employees[0]}/>

                <footer>
                    &copy; Nicole Milmine - 101462077
                </footer>
            </div>
        )
    }
}