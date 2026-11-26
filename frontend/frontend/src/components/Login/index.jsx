import Input from '../ui/Input';
import Button from '../ui/Button';
import theme from '../../theme/theme';
import {useState, useEffect, useContext, useRef, useDebugValue} from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/services/login/login';
import {Box, Container, Paper, FormControl,Typography} from '@mui/material';
import AuthContext from '../../context/AuthProvider';
import {Link} from 'react-router-dom';
import { StyledBox, StyledButton, StyledInputs, StyledLabels, StyledPaper, StyledLinkText, FormContainer, Title } from './styles';

const LoginPage = ({}) => {

    const {setAuth} = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [formData, setformData] = useState({
        email:"",
        password:"",
    });
    const[error,setError] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        userRef.current.focus();
    },[]);

    useEffect(() => {
        setError("")
    },[formData]);

    const handleChange = (e) => {
        setformData({...formData,[e.target.name] : e.target.value});

    };


    const handleSubmit = async (e) => {
        console.log("submit triggered");
        e.preventDefault();
        setError("");

       try{
        const res = await loginUser(formData);
         console.log("LOGIN USER:", res.user);

        setAuth({
            user:res.user,
            token: res.token
        });
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        
        if (res.user.role === "admin") {
            console.log("ADMIN DASHBOARD");
            window.location.href = "/admin";
        } else {
            console.log("USER DASHBOARD");
            window.location.href = "/";
         }
       }catch (err) {
        console.log("Axios Error Code:", err.code);
        console.log("Axios Error Message:", err.message);
        console.log("Response Object:", err.response);
             if(!err?.response){
                setError('No Server Response');
             }else if(err.response?.status === 401){
                setError('Unauthorized - Check your credentials');
             }else{
                setError('Login Failed');
             }
             errRef.current?.focus();
        }
    } ;


  return (
    <StyledBox>
        <StyledPaper>
            <FormContainer onSubmit={handleSubmit}>
                <div>
                    <Title>Login</Title>
                </div>
                <StyledLabels>
                    Email
                </StyledLabels>
                <StyledInputs 
                id="email"
                type="email"
                name="email"
                required
                ref={userRef}
                placeholder={"email"}
                value={formData.email}
                onChange={handleChange}/>
                <StyledLabels>
                 Password
                </StyledLabels>
                        
                <StyledInputs  
                    id="password"
                    type="password"
                    name="password"
                    required
                   
                    placeholder={"password"}
                    value={formData.password}
                    onChange={handleChange}/>
                <div>
                    <StyledLinkText to="/register">
                    Register
                    </StyledLinkText>
                </div>
                <StyledButton type="submit">
                    Login
                </StyledButton>
                {error && <p>{error}</p>}
            </FormContainer>
        </StyledPaper>
    </StyledBox>
  )
}

export default LoginPage;