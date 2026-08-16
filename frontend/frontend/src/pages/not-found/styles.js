import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "2rem",
  backgroundColor: "#F3F3F1",
}));

export const ContentContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "1200px",
  backgroundColor: "#FFFFFF",
  borderRadius: "24px",
  padding: "4rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "4rem",
  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    textAlign: "center",
    padding: "2rem",
  },
}));

export const IllustrationContainer = styled(Box)({
  flex: 1,
  display: "flex",
  justifyContent: "center",
});

export const StyledImage = styled("img")({
  width: "100%",
  maxWidth: "450px",
  objectFit: "contain",
});

export const MessageContainer = styled(Box)(({ theme }) => ({
  flex: 1,

  [theme.breakpoints.down("md")]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));