import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";

export const CardContainer = styled(Box)(({theme}) =>({
    backgroundColor:theme.palette.background.paper,
    border: `1.5px solid ${theme.palette.secondary.main}`,
    borderRadius: "16px",
    padding: "1.5rem",
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.75rem",
    cursor: "pointer",
}));
