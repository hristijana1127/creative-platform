import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { ListItemText, Box } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { NAV_ITEMS } from "../../../constants/navItems";
import {
  StyledContainer,
  StyledDrawer,
  StyledList,
  StyledListItem,
  
} from "./styles";
import Button from "../Button";
import ThemeToggle from "../ThemeToggle";
import AuthContext from "../../../context/AuthProvider";
import ThemeContext from "../../../context/ThemeProvider";
import { useContext } from "react";

const Navbar = () => {
  const location = useLocation();
  const { setAuth } = useContext(AuthContext);
  const { mode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("logout triggered");
    setAuth(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
   <StyledDrawer variant="permanent" anchor="top">
    <StyledContainer>

     
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 2,
          width: "100%",
        }}
      >
        <ThemeToggle />

        <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </Box>

     
      <StyledList>
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <StyledListItem
              key={item.text}
              component={Link}
              to={item.path}
              isActive={isActive}
            >
              {item.icon}
              <ListItemText primary={item.text} />
            </StyledListItem>
          );
        })}
      </StyledList>

    </StyledContainer>
  </StyledDrawer>
  );
};

export default Navbar;