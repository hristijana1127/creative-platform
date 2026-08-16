import {Outlet} from "react-router-dom";
import Navbar from '../Navbar';
import {Box, Toolbar} from "@mui/material";

const Layout = () => {
    return (
        <Box sx={{display: "flex"}}>
            <Navbar/>
            <Box component="main" sx={{flexGrow: 1, width:"100%",pr:3,pl:3}}>
                <Toolbar/>
                <Outlet/>
            </Box>
        </Box>
    )
}