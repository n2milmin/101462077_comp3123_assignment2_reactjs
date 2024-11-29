import React from "react";

export const Landing = () => {

    return(
        // login or signup 
        <div className="container">
            <header>
                <h1>Employee Management App</h1>
            </header>

            <ul className="responsive-table">
                <li className="table-header">Welcome</li>
                <li className="table-row">
                    <button className="blueBtn" to='/login'>Login</button>
                </li>
                <li className="table-row">
                    <button className="blueBtn" to='/signup'>Signup</button>
                </li>
            </ul>

            <footer>
                &copy; Nicole Milmine - 101462077
            </footer>
        </div>
    )
}