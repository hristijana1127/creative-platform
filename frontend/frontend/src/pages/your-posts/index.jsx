import {useEffect, useContext,useState} from 'react'

import Navbar from '../../components/ui/Navbar'
import {Box,Container} from "@mui/material";
import PostItem from '../../components/PostItem';
import PostUploadForm from '../../components/Posts/PostsUploadForm';
import { getPosts } from '../../api/services/posts/posts';
import AuthContext from '../../context/AuthProvider';
import Posts from '../../components/Posts';
import Sidebar from '../../components/sidebar';
import CssBaseline from "@mui/material/CssBaseline";

import { useTheme } from '@emotion/react';
const YourPosts = (onSelect) => {
  const theme = useTheme();
  
          
  return (
   <>
   
      <Navbar/>
      <Box 
      sx={{ 
        backgroundColor: theme.palette.background.default,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2361448d' fill-opacity='0.24'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        minHeight: "100vh",
        width: "100vw",
        height: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        marginRight: "calc(-50vw + 50%)",
        boxSizing: "border-box"
      }}
    
    >
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          pt: "130px",
          boxSizing: "border-box",
          px: 3 
        }}
      >
     
        <PostUploadForm/>
       
       <Posts/>
       </Container>
    </Box>
   </>
  )
}

export default YourPosts;