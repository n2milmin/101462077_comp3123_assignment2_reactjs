import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {

    const navigate = useNavigate()
    const { handleSignup, auth } = useAuth();
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ message, setMessage ] = useState('')

    useEffect(() => {
        if(auth.accessToken)
            navigate('/employeeList')
    })

    const handleSubmit = async e => {
        
        navigate('/employeeList')
    }

    return (
        <div className="container">
            <header>
                <h1>Employee Management App</h1>
                <Link className="blueBtn" to='/login'>Login</Link>
            </header>

            <ul className="responsive-table">
                <li className="table-header">Signup</li>

                { message !== '' && <li className="table-row">{message}</li> }

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
                    <button className="blueBtn" onClick={handleSubmit}>Signup</button>
                </li>
            </ul>

            <footer>
                &copy; Nicole Milmine - 101462077
            </footer>
        </div>
    )
}

export default Signup;