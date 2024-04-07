import { createContext, useState, useEffect } from 'react'
import "jwt-decode";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Logo from '../components/logo';
const AuthContext = createContext()
import { Routes, Route } from 'react-router-dom'
export default AuthContext;


export const AuthProvider = ({ children }) => {
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    let loginUser = async (e, data) => {
        e.preventDefault()
        console.log(data)
        const response = await axios.post('http://localhost:8000/auth/login/', data)
        if (response.status === 200){
            navigate("/admin")
        }
    }


    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/admin/login')
    }

    let contextData = {
        user: user,
        authTokens: authTokens,
        setAuthTokens: setAuthTokens,
        setUser: setUser,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }


    useEffect(() => {

        if (authTokens) {
            setUser(jwtDecode(authTokens.access))
        }
        setLoading(false)


    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}