import React from "react";
import { useAuth } from "../AuthContext";

export const Landing = () => {

    const { handleLogin, handleSignup } = useAuth();

    return(
        // login or signup 
        <div className="container">
            <header>
                <h1>Employee Management App</h1>
            </header>

            <ul className="responsive-table">
                <li className="table-header">Welcome</li>
                <li className="table-row">
                    <button className="blueBtn" onClick={handleLogin}>Login</button>
                </li>
                <li className="table-row">
                    <button className="blueBtn" onClick={handleSignup}>Signup</button>
                </li>
            </ul>

            <footer>
                &copy; Nicole Milmine - 101462077
            </footer>
        </div>
    )
}
