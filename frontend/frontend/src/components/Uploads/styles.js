import { Box, TableCell, TableContainer, TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledContainer = styled(Box)(({ theme }) => ({
  borderRadius: "24px",
  padding: "1.5rem",
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

export const StyledHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1rem",
}));

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: "16px",
  overflow: "hidden",

  "& .MuiTable-root": {
    borderCollapse: "separate",
    borderSpacing: "0 8px",
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  background: theme.palette.background.paper,
  transition: "0.2s ease",

  "& td:first-of-type": {
    borderTopLeftRadius: "14px",
    borderBottomLeftRadius: "14px",
  },

  "& td:last-of-type": {
    borderTopRightRadius: "14px",
    borderBottomRightRadius: "14px",
  },

  "&:hover": {
    transform: "translateY(-1px)",
    background: theme.palette.action.hover,
  },
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: "none",
  fontSize: "0.95rem",
}));

export const FileInfoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.8rem",
}));

export const FileNameContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));
