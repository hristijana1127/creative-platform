import React, { useContext } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";
import Button from "../Button";
import ThemeContext from "../../../context/ThemeProvider";
import getToggleSx from "./styles";

const ThemeToggle = ({ sx }) => {
  const { mode, toggleTheme } = useContext(ThemeContext);
  const theme = useTheme();

  return (
    <Button
      variant="contained"
      onClick={toggleTheme}
      startIcon={mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
      sx={getToggleSx(theme, mode, sx)}
    >
      {mode === "light" ? "Dark Mode" : "Light Mode"}
    </Button>
  );
};

export default ThemeToggle;
