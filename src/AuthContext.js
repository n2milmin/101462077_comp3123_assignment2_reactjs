import React, { createContext, useContext, useState, useEffect } from 'react';
import { login, signup } from './api';
import { Navigate } from 'react-router-dom';


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    
    const [ auth, setAuth ] = useState({
        accessToken: (localStorage.getItem('accessToken') || ''),
        error: ''
    })

    useEffect(() => {
        if( auth.accessToken )
            localStorage.setItem('accessToken', auth.accessToken)
        else 
            localStorage.removeItem('accessToken')
        
    }, [auth.accessToken])



    // Signup 
    const handleSignup = async user => {
        try {
            const { data } = await signup({ user })

            localStorage.setItem('accessToken', data.accessToken)
            setAuth({
                accessToken: data.accessToken,
                error: ''
            })

        } catch (e) {
            console.log("Frontend Signup failure: ", e)
            setAuth({
                accessToken: null,
                error: e
            })
        }
    }


    // Login 
    const handleLogin = async (username, password) => {
        try {
            const { data } = await login({ username, password })

            localStorage.setItem('accessToken', data.accessToken)
            setAuth({
                accessToken: data.accessToken,
                error: ''
            })

        } catch (e) {
            console.log("Frontend Login failure: ", e)
            setAuth({
                accessToken: null,
                error: e
            })
        }
    }


    // Logout
    const handleLogout = async () => {
        try {            
            localStorage.removeItem('accessToken')
            setAuth({
                accessToken: null,
                error: ''
            })

        } catch (e) {
            console.log("Frontend Logout failure: ", e)
            setAuth({
                accessToken: localStorage.getItem('accessToken'),
                error: e
            })
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

export const useAuth = () => useContext(AuthContext);