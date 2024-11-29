import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {

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