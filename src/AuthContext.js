import React, { createContext, useContext, useState, useEffect } from 'react';
import { login, logout, signup } from './api';
import { set } from 'mongoose';
import { Navigate } from 'react-router-dom';


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    
    const [ accessToken, setAccessToken ] = useState(localStorage.getItem('accesstoken') || '')

    useEffect(() => {
        if( accessToken )
            localStorage.setItem('accessToken', accessToken)
        else 
            localStorage.removeItem('accessToken')
        
    }, [accessToken])



    // Signup 
    const handleSignup = async user => {
        try {
            const { data } = await signup({ user })

            localStorage.setItem('accessToken', data.accessToken)
            setAccessToken( data.accessToken )

        } catch (e) {
            console.log("Frontend Signup failure: ", e)
        }
    }


    // Login 
    const handleLogin = async (username, password) => {
        try {
            const { data } = await login({ username, password })

            localStorage.setItem('accessToken', data.accessToken)
            setAccessToken( data.accessToken )

            Navigate('/employeeList')

        } catch (e) {
            console.log("Frontend Login failure: ", e)
        }
    }


    // Logout
    const handleLogout = async () => {
        try {            
            localStorage.removeItem('accessToken')
            setAccessToken( '' )


        } catch (e) {
            console.log("Frontend Logout failure: ", e)
        }
    }



    return (
        <AuthContext.Provider value={{
            accessToken,
            handleLogin,
            handleLogout,
            handleSignup
        }}>
            { children }
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);