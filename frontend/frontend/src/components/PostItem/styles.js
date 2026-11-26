import {styled} from "@mui/material/styles";
import {Card, CardMedia,Box, Typography} from "@mui/material";

export const CardContainer = styled(Card)(({ theme }) => ({
    width: "400px",
    margin: "20px",
    overflow: "visible",
    position: "relative",
}))

export const ProfileWrapper = styled(Box) (({theme}) => ({
  backgroundColor: theme.palette.secondary.main,
  color: "#fff",
  borderRadius: "50%",
  width: 40,
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

export const MediaCard = styled(CardMedia) (({theme}) => ({
    width: "100%",
    height: "300px",
    objectFit: "contain",
    display: "block",
}))