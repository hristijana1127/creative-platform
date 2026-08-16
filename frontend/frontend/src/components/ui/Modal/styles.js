import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Button,
} from "@mui/material";

export const StyledDialog = styled(Dialog)({
    "& .MuiPapaer-root":{
        borderRadius:15,
        boxShadow:"0 8px 32px rgba(0,0,0,0.12)",
    },
});

export const StyledDialogTitle = styled(DialogTitle)({
    display: "flex",
    alignItems:"center",
    justifyContent:"space-between",
    paddingBottom:8,
    paddingTop:16,
});

export const StyledDialogContent = styled(DialogContent)({});

export const StyledDialogActions = styled(DialogActions)(({theme}) => ({
    paddingLeft:theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(2.5),
    paddingTop: theme.spacing(2.5),
    display:"flex",
    justifyContent:"space-between",
}));

export const ModalTitle = styled(Typography)(({theme}) => ({
    color: theme.palette.text.primary,
    fontWeight:600,
}));
export const CloseIconButton = styled(IconButton)(({theme})=>({
    color: theme.palette.text.secondary,
}));

export const CancelButton = styled(Button) (({theme})=>({
    color:theme.palette.text.secondary,
    borderColor: theme.palette.divider,
    "&:hover":{
        borderColor: theme.text.secondary,
        background:"transparent",
    },
}));
export const ConfirmButton = styled(Button)({
    boxShadow:"none",
    "&:hover":{
        boxShadow:"none",
    },
});