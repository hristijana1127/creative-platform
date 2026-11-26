import React from 'react';
import {Box, Divider, Typography} from '@mui/material';
import Button from '../../components/ui/Button'
import Sidebar from "../../components/sidebar"
import {NavLink, Outlet} from 'react-router-dom';
import { ADMIN_SIDEBAR_ITEMS } from '../../constants/navItems';

const AdminLayout = () => {
    return(
        <Box
        sx={{
            display: "flex",
            minHeight:"100vh",
            backgroundColor:"background.default",
        }}>
            <Sidebar items={ADMIN_SIDEBAR_ITEMS}/>

            <Box
            component="main"
            sx={{
                flex:1,
                p:4,
                minWidth:0,
            }}>
                <Outlet/>
            </Box>
        </Box>
    )
}
export default AdminLayout;