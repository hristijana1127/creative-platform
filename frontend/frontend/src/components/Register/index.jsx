import { registerUser } from "../../api/services/register/register";
import {useState, useEffect, useContext, useRef} from "react"
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import {StyledBox, StyledButton, StyledInputs, StyledLabels, StyledPaper, StyledLinkText, FormContainer, Title} from './styles';

const RegisterPage =() =>{
    const {setAuth} = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [registerData, setRegisterData] = useState({
        name:"",
        email:"",
        username:"",
        password:"",
    });
    const[error,setError] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        setError("")
    },[registerData]);

    const handleChange = (e) => {
        setRegisterData({...registerData,[e.target.name] : e.target.value});
    };

    const handleSubmit = async (e) => {
        console.log("submit triggered");
        e.preventDefault();
        setError("");

        try{
            const res = await registerUser(registerData);
            setAuth({
                token:res.token,
               user:res.user,
            });
            localStorage.setItem("user", JSON.stringify(res.user));
            localStorage.setItem("token", res.token);
            
            navigate('/login');
        }catch(err) {
            console.log("Axios Error Code:", err.code);
            console.log("Axios Error Message:", err.message);
            console.log("Response Object:", err.response);
             if(!err?.response){
                setError('No Server Response');
             }else{
                setError('Register Failed');
             }
             errRef.current?.focus();
        }
    };
    return(
        <StyledBox>

            <StyledPaper>
                <FormContainer onSubmit={handleSubmit}>
                    <div>
                        <Title>Register</Title>
                    </div>
                    <StyledLabels
                    
                    >
                        Name
                    </StyledLabels>
                    <StyledInputs 

                        id="name"
                        type="text"
                        name="name"
                        required
                        ref={userRef}
                        placeholder={"Name"}
                        value={registerData.name}
                        onChange={handleChange}
                        sx={{marginTop: "2px ",}}
                        />
                    <StyledLabels>
                        Username
                    </StyledLabels>
                    <StyledInputs 
                        id="username"
                        type="text"
                        name="username"
                        required
                        ref={userRef}
                        placeholder={"Username"}
                        value={registerData.username}
                        onChange={handleChange}/>
                    <StyledLabels>
                        Email
                    </StyledLabels>
                    <StyledInputs 
                        id="email"
                        type="email"
                        name="email"
                        required
                        ref={userRef}
                        placeholder={"Email"}
                        value={registerData.email}
                        onChange={handleChange}/>
                    <StyledLabels>
                        Password
                    </StyledLabels>
                                        
                    <StyledInputs  
                        id="password"
                        type="password"
                        name="password"
                        required
                                   
                        placeholder={"Password"}
                        value={registerData.password}
                        onChange={handleChange}/>
                
                <StyledButton type='submit'>
                    Register
                </StyledButton>
                {error && <p>{error}</p>}
            </FormContainer>   
         </StyledPaper>
        </StyledBox>
    )

}
export default RegisterPage;