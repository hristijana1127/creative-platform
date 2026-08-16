import {createContext, useState, sueEffect, Children, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router';

const AuthContext =  createContext({});

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
            setAuth({token})
        }
        setIsLoading(false);
    },[])
    return(
        <AuthContext.Provider value={{auth, setAuth, isLoading}}>
            {isLoading ? null : children}
        </AuthContext.Provider>
    )
}
export default AuthContext;