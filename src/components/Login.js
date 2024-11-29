import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";

export const Login = () => {

    const { handleLogin } = useAuth();
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ message, setMessage ]   = useState('')

    return (
        <div>
            <div className="container">
            <header>
                <h1>Employee Management App</h1>
                <button className="blueBtn" to='/signup'>Signup</button>
            </header>

            <ul className="responsive-table">
                <li className="table-header">Login</li>

                { message != '' && <li className="table-row">{message}</li> }

                <li className="table-row">
                    <p className="left">Username: </p>
                    <input 
                        type="text"
                        id="username"
                        value={username}
                        onChange={c => setUsername(c.target.value)}
                    />
                </li>
                <li className="table-row">
                    <p className="left">password: </p>
                    <input 
                        type="text"
                        id="password"
                        value={password}
                        onChange={c => setPassword(c.target.value)}
                    />
                </li>
                <li className="table-row">
                    <button className="blueBtn" onClick={handleLogin}>Login</button>
                </li>
            </ul>

            <footer>
                &copy; Nicole Milmine - 101462077
            </footer>
        </div>
        </div>
    )
}