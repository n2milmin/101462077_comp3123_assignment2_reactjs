import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../AuthContext';

const Landing = () => {

    const { auth } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if(auth.accessToken)
            navigate('/employeeList')
    })

    return(
        // login or signup 
        <div className="container">
            <header>
                <h1>Employee Management App</h1>
            </header>

            <ul className="responsive-table">
                <li className="table-header">Welcome</li>
                <li className="table-row">
                    <Link className="blueBtn" to='/login'>Login</Link>
                </li>
                <li className="table-row">
                    <Link className="blueBtn" to='/signup'>Signup</Link>
                </li>
            </ul>

            <footer>
                &copy; Nicole Milmine - 101462077
            </footer>
        </div>
    )
}

export default Landing;