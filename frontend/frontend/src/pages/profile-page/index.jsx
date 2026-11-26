import {useContext,useEffect, useState} from 'react'
import { Box, Typography, Avatar, Divider, Grid } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Background from "../../assets/loginbackk.png";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import InfoCard from "../../components/ui/InfoCard";
import RecentUploads from "../../components/Uploads";
//import { getUser } from '../../api/services/user/user';
import PostUploadForm from '../../components/Posts/PostsUploadForm/index.jsx';
import { getPosts,createPost } from '../../api/services/posts/posts';
import AuthContext from '../../context/AuthProvider'
import { getUser } from '../../api/services/user/user';
import Posts from '../../components/Posts/index.jsx'
import { StyledPosts } from './styles.js';

const ProfileBanner = styled(Box)({

 width: "100%",
  height: "400px",
  backgroundImage: `url(${Background})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: "15px",
  padding: "1.5rem 2rem",
  boxSizing: "border-box",

  position: "relative",

  display: "flex",
  alignItems: "center",
  gap: "1.5rem",
});
const InfoRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "0.75rem 0",
  gap: "1rem",
});

const getUserFromToken = (token) =>{
  if(!token) return null;
  try{
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g,'/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
      .split('')
      .map((c) => '%' +('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
    );
    const decoded = JSON.parse(jsonPayload);
    return decoded.id || decoded._id;
  }catch(err){
    console.error("Failed to decode token:", err);
    return null;
  }
}
const ProfilePage = () => {
 
  console.log("heloooo");
   const[posts,setPosts] = useState([]);
  
const{auth} = useContext(AuthContext);
  console.log("Auth State:", auth);
    
    const[profile, setProfile] = useState(null);
    const[loading, setLoading] = useState(true);
    const theme = useTheme();

    
    
                 
   
    useEffect(() => {
      const userId = auth?.user?._id || auth?.user?.id || getUserFromToken(auth?.token);
      console.log("Extracted userId from token/auth:",userId);
      const fetchUserProfile = async() =>{
        if(!userId || !auth?.token) return;
        try{
          setLoading(true);
          const data = await getUser(userId, auth?.token);
          setProfile(data);
        }catch(err){
          console.error("Failed to fetch profile:", err);
        }finally{
          setLoading(false);
        }
      };
      if(userId && auth?.token){
        fetchUserProfile();
      }
      else if(auth&& !auth.user){
        setLoading(false);
      }
    },[auth]);
    if(loading){
      return <p>Loading profile...</p>
    }
    if(!profile){
       
      return (<Typography color="error" 
      sx={{
        p:4
      }}>Unable to load profile data</Typography>)
    }
     
   const infoRows = [
    { icon: <PersonIcon />, label: "Full Name", value: profile?.username },
    { icon: <EmailIcon />, label: "Email", value: profile?.email },
  ];
  
       
  return (
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
      }}>
        
    <Box
    
      sx={{
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        px: 2,
        gap: 4,
      }}
    >
     
      <ProfileBanner>
        <Box  sx={{
            position: "absolute",
            bottom: "1.5rem",
            left: "2rem",
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
          }} >
          <Avatar
          src={profile.profilePicture}
            sx={{
              width: 90,
              height: 90,
              bgcolor: "primary.dark",
              border: "3px solid white",
              
            
            }}
          />
          <Box >
            <Typography
              variant="h1"
              sx={{ fontWeight: 700, color: theme.palette.secondary.main }}
            >
              {profile.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{ mt: 0.5 , color: theme.palette.secondary.main }}
            >
              {profile.email}
            </Typography>
          </Box>
        </Box>
      </ProfileBanner>
        
      <Box sx={{ display: "flex", gap: 4, alignItems: "flex-start" }}>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          <InfoCard title="Personal Information">
            {infoRows.map((row, i) => (
              <Box key={row.label}>
                <InfoRow>
                  <Box sx={{ color: "primary.main", display: "flex" }}>
                    {row.icon}
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{ color: "text.secondary", width: 130 }}
                  >
                    {row.label}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {row.value}
                  </Typography>
                </InfoRow>
                {i < infoRows.length - 1 && <Divider />}
              </Box>
            ))}
          </InfoCard>
            <PostUploadForm/>
           <StyledPosts/>
        </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ProfilePage;