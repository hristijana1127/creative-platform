import { alpha } from "@mui/material/styles";

export default function getToggleSx(theme, mode, extra = {}) {
  const primary = theme.palette.primary.main;
  const lightGradient = `linear-gradient(135deg, ${alpha(
    primary,
    0.95,
  )} 0%, ${alpha(primary, 0)} 100%)`;
  const darkGradient = `linear-gradient(135deg, ${alpha(
    primary,
    0.45,
  )} 0%, ${alpha(primary, 0)} 100%)`;

  const base = {
    background: mode === "light" ? lightGradient : darkGradient,
    backgroundColor: "transparent",
    color:
      mode === "light"
        ? theme.palette.text.primary
        : theme.palette.common.white,
    boxShadow: "none",
    textTransform: "none",
    transition: "transform 0.22s ease, opacity 0.3s ease",
    opacity: 1,
    "&:hover": {
      transform: "translateY(-1px)",
      opacity: 0.96,
    },
    "&:active": {
      transform: "translateY(0)",
    },
    "&:focus": {
      outline: "none",
    },
  };

  return { ...base, ...extra };
}
