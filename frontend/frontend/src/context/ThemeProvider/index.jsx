import { createContext , useMemo, useState } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import  CssBaseline  from "@mui/material/CssBaseline";
import lightTheme from "../../theme/lightTheme";
import darkTheme from  "../../theme/darkTheme";

const ThemeContext = createContext({
    mode:"light",
    toggleTheme: () => {},
});

export const AppThemeProvider = ({ children }) => {
    const[mode, setMode] = useState(
        localStorage.getItem("themeMode") || "light",
    
    );
    const theme = useMemo(() =>{
        return mode === "dark" ? darkTheme : lightTheme;
    }, [mode]);
    const toggleTheme =() => {
        setMode((prev) => {
            const next = prev === "light" ? "dark" : "light";
            localStorage.setItem("themeMode",next);
            return next;
        });
    };
    return (
        <ThemeContext.Provider value={{mode, toggleTheme}}> 
            <MuiThemeProvider theme={theme}>
                <CssBaseline/>
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    )
}
export default ThemeContext;