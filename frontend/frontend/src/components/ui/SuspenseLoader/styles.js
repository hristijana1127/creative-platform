import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const Overlay = styled(Box)(({ theme }) => ({
  position: "fixed",
  inset: 0,
  zIndex: 1400,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(15, 23, 42, 0.88)"
      : "rgba(255, 255, 255, 0.88)",
}));

export const LoaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 16,
  padding: 32,
  borderRadius: 24,
  background: theme.palette.background.paper,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 24px 80px rgba(15, 23, 42, 0.7)"
      : "0 24px 80px rgba(145, 158, 171, 0.16)",
  minWidth: 280,
}));

export const LoaderText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.text.primary,
}));

export const LoaderSubtext = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  maxWidth: 320,
  textAlign: "center",
}));
