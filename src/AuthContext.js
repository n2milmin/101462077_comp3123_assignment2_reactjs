import React, { createContext, useState, useEffect } from 'react';
import { login, logout, signup } from './api';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    
    const [ auth, setAuth ] = useState({
        authenticated: false,
        accessToken: null
    })
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')

        if ( accessToken && refreshToken ){
            setAuth({
                authenticated: true,
                accessToken
            })
        }
    }, [])



    // Signup 
    const handleSignup = async user => {
        try {
            const { data } = await signup({ user })

            localStorage.setItem('accessToken', data.accessToken)
            setAuth({
                authenticated: true,
                accessToken
            })
            navigate('/')
        } catch (e) {
            console.log("Frontend Signup failure: ", e)
        }
    }


    // Login 
    const handleLogin = async (username, password) => {
        try {
            const { data } = await login({ username, password })

            localStorage.setItem('accessToken', data.accessToken)
            setAuth({
                authenticated: true,
                accessToken
            })
            navigate('/')

        } catch (e) {
            console.log("Frontend Login failure: ", e)
        }
    }


    // Logout
    const handleLogout = async () => {
        try {            
            localStorage.removeItem('accessToken')
            setAuth({
                authenticated: false,
                accessToken: null
            })
            navigate('/login')

        } catch (e) {
            console.log("Frontend Logout failure: ", e)
        }
    }



    return (
        <AuthContext.Provider value={{
            auth,
            handleLogin,
            handleLogout,
            handleSignup
        }}>
            { children }
        </AuthContext.Provider>
    )
};