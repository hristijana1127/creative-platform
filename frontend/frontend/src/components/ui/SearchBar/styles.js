import { styled } from "@mui/material/styles";
import { Box, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const SearchBarWrapper = styled(Box) (({theme}) =>({
    display:"flex",
    alignItems:"center",
    backgroundColor: theme.palette.background.paper,
    border: "1.5px solid",
    borderColor: theme.palette.divider,
    borderRadius:"8px",
    paddingLeft:theme.spacing(1.5),
    paddingRight:theme.spacing(1.5),
    gap:theme.spacing(1),
    transition:"border-color 0.2s",
    "&:focus-within":{
        borderColor: theme.palette.secondary.main,
    },
}));

export const SearchBarInput = styled(InputBase)(({theme}) => ({
    fontFamily: "inherit",
    fontSize:"1rem",
    lineHeight:1.5,
    paddingTop:theme.spacing(1),
    paddingBottom:theme.spacing(1),
    color:theme.palette.text.primary,
    "&::placeholder":{
    color:theme.palette.text.secondary,
    opacity:1,
    },
}));
export const SearchBarIcon = styled(SearchIcon) (({theme}) => ({
    color: theme.palette.secondary.main,
    fontSize:20,
}));

export const ClearIconButton = styled(IconButton)(({theme})=>({
    color:theme.palette.text.secondary,
    padding:theme.spacing(0.5),
}));

export const SubmitIconButton = styled(IconButton)(({theme})=> ({
    backgroundColor: theme.palette.secondary.main,
    color:"white",
    padding:theme.spacing(0.75),
    borderRadius:"6px",
    "&:hover":{
        backgroundColor:theme.palette.secondary.dark,
    },
}))