import {styled} from '@mui/material/styles'
import {
    Box,
    Paper,
    FormControl,
    
    Button,
    InputLabel,
    Typography
    
} from '@mui/material'
import TextField from "@mui/material/TextField"
import Background from "../../assets/loginbackk.png";
import {Link} from 'react-router-dom'

export const StyledBox = styled(Box)({
  position: "fixed",
  inset: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: `url(${Background})`,
});
export const Title = styled(Typography)(({ theme }) => ({
  fontSize: "40px",
  marginTop: "60px ",
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: "20px",
  textAlign: "center",
}));
export const StyledPaper = styled(Paper)(({theme}) => ({
        padding: "50px 50px 50px 50px",
        backgroundColor: "#FFFFF",
        borderRadius: "16px",
        position: "absolute",
        width: "550px",
        height: "500px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        top: "50%",
        left: "50%",
        
        transform: "translate(-50%, -50%)",
        backdropFilter: "blur(6px)",
}));
export const StyledInputs = styled(TextField)(({theme}) => ({
        backgroundColor: theme.palette.background.paper,
        border: "none",
        margin: "4px 0",
        width: "100%",
        outline: "none",
        
        "& .MuiOutlinedInput-root": {
        borderRadius: 10,

        "& fieldset": {
        borderColor: "#ccc",
        },
        "&:hover fieldset": {
        borderColor: theme.palette.primary.dark,
        },

        "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.dark,
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        },
        },

}));

export const StyledLabels = styled(InputLabel)(({theme}) => ({
        fontSize: "1.1rem",
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: "0.02em",
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.text.primary,
        display: "flex",
        flexDirection: "column",
        alignItems:"flex-start",
        

}));


export const StyledButton = styled(Button)(({theme}) => ({
        borderRadius:"11px",
        backgroundColor:theme.palette.primary.dark,
        color:"white",
        fontSize:"19px",
        fontWeight:600,
        padding:"12px",
        margin:"0px 0px 70px 0px",
        letterSpacing:"1px",
        transition: "transforms 80ms ease-in",
        textTransform: "none",

       "&:hover": {
        transform: "translateY(-1px)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
  },
        "&:active": {
        transform: "translateY(0)",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        },
}));

export const StyledLinkText = styled(Link)(({ theme }) => ({
        display: "block",
        color: theme.palette.text.primary,
        fontFamily: theme.typography.fontFamily,
        fontSize: "14px",
        textAlign: "right",   
        textDecoration: "none",
        margin: "0px 0px 0px 0px",
        paddingTop:"0px",
        "&:hover": {
        textDecoration: "underline",
        color: theme.palette.primary.dark,
        },
}))

export const FormContainer = styled("form")({
  display: "flex",
  flexDirection: "column",  
  gap:"16px",
  width:"100%",
  maxWidth:"400px"
});
