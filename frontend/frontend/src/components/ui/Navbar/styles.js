import {styled} from '@mui/material/styles';
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    Box
} from '@mui/material';


export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  flexShrink: 0,

  "& .MuiDrawer-paper": {
    backgroundColor: theme.palette.background.default,
    boxSizing: "border-box",
    height: "130px",
     zIndex: 1200,
  },
}));
export const StyledContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  boxSizing: "border-box",
  padding: "0 1rem",
}));

export const StyledList = styled(List)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 5,
  padding: 0,
}));

export const StyledListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "isActive",
})(({ theme, isActive }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 5,
  borderRadius: 10,
  color: isActive ? theme.palette.text.primary : theme.palette.text.secondary,
  svg: {
    color: isActive ? theme.palette.primary.main : theme.palette.primary.dark,
  },
  backgroundColor: isActive && theme.palette.background.active,

  "& .MuiTypography-root": {
    fontWeight: isActive ? 600 : 400,
    textAlign: "center",
  },

  "&:hover": {
    color: theme.palette.text.primary,
    backgroundColor: isActive
      ? theme.palette.primary.dark
      : theme.palette.background.hover,

    svg: {
      color: isActive
        ? theme.palette.primary.light
        : theme.palette.primary.main,
    },
  },
}));
