import {useState,useEffect,useContext} from 'react'
import PostItem from '../../components/PostItem'
import Navbar from '../../components/ui/Navbar'
import {Box,Container} from "@mui/material";
import { getPosts } from '../../api/services/posts/posts'; 
import AuthContext from '../../context/AuthProvider';
import Sidebar from '../../components/sidebar';

import { useTheme } from '@emotion/react';
import {SIDEBAR_ITEMS} from "../../constants/navItems.jsx";
const HomePage = () => {
      const theme = useTheme();
      const {auth} = useContext(AuthContext); 
      const[posts,setPosts] = useState([]); 
      const[loading, setLoading] = useState(true); 
      const[error, setError] = useState(null); 
      useEffect(() =>{ 
        const fetchPost= async() => { 
          try{ 

            setLoading(true); setError(''); 
            const data = await getPosts(auth?.token); 
            setPosts(data); 
          }catch(err){ 
          console.error("Fetch error:",err); 
          setError("Failed to load posts"); 
          }
          finally{ 
          setLoading(false) 
          } }; 
          if(auth?.token){
             fetchPost();
             } },[auth?.token]);
  return (
    <>
    <Navbar sx={{ zIndex: 1200 }}/>
    
    <Sidebar items={SIDEBAR_ITEMS} sx={{ zIndex: 1100 }} />
  
   <Box
      sx={{
        pt: "130px",
        backgroundColor: theme.palette.background.default,
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
      <Box
        sx={{ width: "600px", margin: "200px auto", marginTop: "12px" }}
    >
      {posts.map((post) => (
        <PostItem
          key={post._id}
          authorName={post.userId?.username}
          profilePicture={post.userId?.profilePicture}
          title={post.title}
          description={post.description}
          file={post.fileUrl}
          format={post.format}
          createdAt={post.createdAt}
          large={true}
          />
      ))}
    </Box>
    </Container>
    </Box>
    </>
  )
}
export default HomePage;