import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate()
    const { handleLogin, auth } = useAuth();
    const [ username, setUsername ] = useState('johndoe')
    const [ password, setPassword ] = useState('password123')
    const [ message, setMessage ] = useState('')

    useEffect(() => {
        if(auth.accessToken)
            navigate('/employeeList')
    })

    const handleSubmit = async e => {
        e.preventDefault()

        if(!username || !password){
            setMessage("Please fill in all fields")
            return
        }

        try { 
            await handleLogin(username, password)
            
            if(auth.accessToken){
                console.log("YAY",auth.accessToken)
                setMessage('')
                navigate('/employeeList')
            } 
            else {
                setMessage(auth.error)
                return
            }
        } catch (e){
            setMessage(auth.error)
        }
    }

    return (
        <div className="container">
            <header>
                <h1>Employee Management App</h1>
                <Link className="blueBtn" to='/signup'>Signup</Link>
            </header>

            <ul className="responsive-table">
                <li className="table-header">Login</li>

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
                    <Link className="blueBtn" onClick={handleSubmit}>Login</Link>
                </li>
            </ul>

            <footer>
                &copy; Nicole Milmine - 101462077
            </footer>
        </div>
    )
}

export default Login;