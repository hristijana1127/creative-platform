import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { ListItemText, Box } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {SIDEBAR_ITEMS} from "../../constants/navItems";
import {
  StyledContainer,
  StyledDrawer,
  StyledList,
  StyledListItem,
  StyledToolbar,
} from "./styles";
import ThemeToggle from "../ui/ThemeToggle"
import AuthContext from "../../context/AuthProvider";
import ThemeContext from "../../context/ThemeProvider";
import { useContext } from "react";

const Sidebar = ({items}) => {
  const location = useLocation();
  const { setAuth } = useContext(AuthContext);
  const { mode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <StyledDrawer variant="permanent">
      <StyledToolbar />

      <StyledContainer sx={{ overflow: "auto" }}>
        <StyledList>
          {items.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <StyledListItem
                key={item.text}
                component={Link}
                to={item.path}
                isActive={isActive}
              >
                {item?.icon}
                <ListItemText primary={item.text} />
              </StyledListItem>
            );
          })}
        </StyledList>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <ThemeToggle />
        </Box>
      </StyledContainer>
    </StyledDrawer>
  );
};

export default Sidebar;
