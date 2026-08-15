import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode:"dark",
        primary:{
            light: "#714EA4",
            main:"#61448D",
            dark:"#513876"
        },
        secondary:{
            light: "#9efc64",
            main:"#80F13A",
            dark:"#66BF2F"
        },
        error:{
            light:"#FCEBEB",
            main: "#DC3545"
        },
        info:{
            light:"#E6F1FB",
            main:"#0D6EFD"
        },
        success:{
            light:"#a5f5d9",
            main:"#198754"
        },
        warning:{
            light:"#FAEEDA",
            main:"#FFC107"
        },
        background: {
            default: "#0F172A",
            paper: "#112240",
            hover: "#1E2A3A",
            active: "#164265",
            },

        text: {
            primary: "#F8FAFC",
            secondary: "#CBD5E1",
            },
        dark: {
                primary: "#1A1A2E",
            },
        divider: "#334155",

    },
    typography: {
    fontFamily: "Montserrat, Helvetica, sans-serif",

    h1: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: "0.02em",
    },

    h2: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },

    h3: {
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: 1.4,
    },

    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },

    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },

    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },

  breakpoints: {
    values: {
      xs: 0, //xs : 0,
      sm: 600,//sm: 480,
      md: 900, //md: 768,
      lg: 1200,//lg: 1024,
      xl: 1536,//xl: 1200
    },
}
});

export default darkTheme;

