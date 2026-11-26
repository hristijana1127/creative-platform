import {createContext, useState, sueEffect, Children, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router';

const AuthContext =  createContext({});

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");
        if(token){
            setAuth({
            token,
            user:savedUser ? JSON.parse(savedUser) : null
        });
    }
        setIsLoading(false);
    },[]);
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setAuth({});
    };
    return(
        <AuthContext.Provider value={{auth, setAuth,logout, isLoading}}>
            {isLoading ? null : children}
        </AuthContext.Provider>
    )
}
export default AuthContext;