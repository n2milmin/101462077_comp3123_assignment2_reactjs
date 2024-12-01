import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {

    const navigate = useNavigate()
    const { handleSignup, auth } = useAuth();
    const [ email, setEmail ] = useState('user1@domain.ca')
    const [ username, setUsername ] = useState('user1')
    const [ password, setPassword ] = useState('user1')
    const [ message, setMessage ] = useState('')

    useEffect(() => {
        if(auth.accessToken)
            navigate('/employeeList')
    }, [auth.accessToken, navigate])

    const handleSubmit = async e => {
        e.preventDefault()

        if(!email || !username || !password){
            setMessage("Please fill in all fields")
            return
        }

        try { 
            const {res} = await handleSignup(email, username, password)

            if(res.accessToken){
                console.log(email) 
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
                <Link className="blueBtn" to='/login'>Login</Link>
            </header>

            <ul className="responsive-table">
                <li className="table-header">Signup</li>

                { message !== '' && <li className="table-row">{message}</li> }

                <li className="table-row">
                    <p className="left">email: </p>
                    <input 
                        type="text"
                        id="email"
                        value={email}
                        onChange={c => setEmail(c.target.value)}
                    />
                </li>
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
                        type="password"
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