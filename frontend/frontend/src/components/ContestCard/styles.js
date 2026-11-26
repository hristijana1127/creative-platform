import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";

export const CardContainer = styled(Box)(({theme}) =>({
    backgroundColor:theme.palette.background.paper,
    border: `1.5px solid ${theme.palette.secondary.main}`,
    borderRadius: "16px",
    padding: "1.5rem",
    width: "30%",
    minWidth:"280px",
    minHeight:"300px",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.75rem",
    
    cursor: "pointer",
    transition: "all 0.3s ease, box-shadow 0.25s ease, border-color o.25s ease",

    "&:hover": {
        transform: "translateY(-5px)",
        borderColor:theme.palette.secondary.main,
        boxShadow: theme.shadows[6],},
}));
