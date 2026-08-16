import {styled} from '@mui/material/styles';
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    Box
} from '@mui/material';

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({}));

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
    width: 240,
    flexShrink:0,
    "& .MultiDrawer-paper":{
        backgroundColor: theme.palette.background.default,
        width: 240,
        boxSizing: "border-box",
    },
}));
export const StyledContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
  padding: "1rem",
  paddingBottom: "2rem",
}));

export const StyledList = styled(List)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 5,
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
