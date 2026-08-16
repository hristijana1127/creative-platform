import {
  Card,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const UserCardWrapper = styled(Card)(({ theme }) => ({
  maxWidth: 280,
  borderRadius: theme.spacing(1.5),
  boxShadow: theme.shadows[3],
}));

export const UserCardContent = styled(CardContent)({});

export const UserCardBody = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(1),
}));

export const UserCardAvatar = styled(Avatar)({
  width: 80,
  height: 80,
});

export const UserCardName = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const UserCardActions = styled(CardActions)({
  justifyContent: "center",
});
