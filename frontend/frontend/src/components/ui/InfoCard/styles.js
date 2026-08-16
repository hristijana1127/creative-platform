import { styled } from "@mui/material/styles";
import {Box, Typography} from '@mui/material';

export const StyledInfoCardContainer = styled(Box)(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: "15px",
    padding:"1.5rem 2rem",
    boxShadow: theme.shadows[1],
}));

export const StyledInfoCardTitle = styled(Typography)(({theme}) => ({
    marginBottom: "0.5rem",
    color: theme.palette.text.primary,
}))