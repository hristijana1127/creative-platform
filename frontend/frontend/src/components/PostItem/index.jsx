import React from 'react'
import { Box, Typography, Divider, TableRow,Avatar, Icon } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { CardContainer, MediaCard,ProfileWrapper } from './styles';
import CardHeader from '@mui/material/CardHeader';
import {useState} from 'react';
import CardContent from '@mui/material/CardContent';
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import InfoCard from "../ui/InfoCard";
import Menu from '@mui/material/Menu';
import RecentUploads from "../Uploads";
import {Collapse} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InsightsIcon from '@mui/icons-material/Insights';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RepeatIcon from '@mui/icons-material/Repeat';
import Button from '../ui/Button';
import RemixPostForm from '../RemixPostForm';
import ContestVote from '../Vote';
import CommentSection from '../Comments';
import DeletePost from '../DeletePost';
import { useNavigate } from 'react-router-dom';
const PostItem = ({
  postId,
  profilePicture,
   postUserId,
   authorName,
   title, 
   contestId,
   description, 
   file, 
   format,
   createdAt,
   parentPost,
   currentUser,
   onDeleted,
   large=false}) => {
  const navigate = useNavigate();
  const[remixing, setRemixing] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const menuOpen = Boolean(menuAnchor);

  const handleMenuOpen = (e) =>{
    setMenuAnchor(e.currentTarget);
  };
  const handleMenuClose = () =>{
    setMenuAnchor(null);
  };

  const handlePostDelete = (deletedPostId) =>{
    handleMenuClose();
    if(onDeleted){
      onDeleted(deletedPostId);
    }
  };
  const currentUserId =currentUser?._id ||currentUser?.id 
  const ownerId = typeof postUserId === "object" ? postUserId?._id || postUserId?.id : postUserId;
  const isPostOwner = currentUserId && ownerId && currentUserId === ownerId;
  const canDelete = isPostOwner || currentUser?.role === "admin";

  const getMediaComponent = (mediaFormat) =>{
      switch(mediaFormat?.toLowerCase()){
        case 'video': return 'video';
        case 'audio': return 'audio';
        case 'text' : return 'text';
        default: return 'img';  
    }
  };

  const renderMedia = () => {
    if(!file) return null;
    switch(format?.toLowerCase()){
      case 'image':
        return(
          <MediaCard
            component="img"
            image={file}
            alt={title}
             sx={{
               width: large ? "100%" : "100%",
              height: large ? "100%" : "300px",
                objectFit: "cover",
          }}
            />
        );
        case 'video':
        return(
          <MediaCard
            component="video"
            image={file}
            controls
            alt={title}
             sx={{
              width: large ? "100%" : "100%",
              height: large ? "100%" : "300px",
              objectFit: "cover",
          }}
            />
        );
        case 'audio':
        return(
          <Box sx={{ p:2, display:'flex', justifyContent:'center', bgcolor:'grey.100'}}>
              <audio controls src={file} style={{width: '100%'}}/>
          </Box>
            
        );
        case 'text':
        case 'document':
        case 'pdf':
  return(
            <Box 
            sx={{p:3,
              textAlign:'center',
              bgcolor:'grey.100',
              borderTop:'1px solid #eee',
              borderBottom:'1px solid #eee'
            }}>
              <Button
                variant={"contained"}
                component="a"
                href={file}
                target="_blank"
                rel="noopener noreferrer">
                  View/Download Document
              </Button>
            </Box>
          );
          default:
            return <MediaCard component= "img" image={file} alt={title}/>;
    }
    
  };
  const theme = useTheme();
  return (
   <Box display="flex" sx={{justifyContent:"center"}}>
    <CardContainer 
        sx={{
          width: large ? "570px" : "400px",
        }}>
      <CardHeader
        avatar={
          <Avatar
            src={profilePicture}
            alt={authorName || "User"}
            sx={{
              width: 40,
              height: 40,
              bgcolor: "primary.dark",
              border: "3px solid white",
            }}
          />
        }
        
        action={
        <>
          <IconButton aria-label="settings"
          onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={menuAnchor}
          open={menuOpen}
          onClose={handleMenuClose}
          >
            {canDelete && (
            <DeletePost
            postId={postId}
            menuItem
            onDeleted={handlePostDelete}
            />)}
          </Menu>
        </>
    
        }
        title={authorName || title}
        subheader={createdAt ? new Date(createdAt).toLocaleDateString() : ""}
        
      />
       {parentPost && (
        <Box
          onClick={() => navigate(`/posts/${parentPost._id}`)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.75,
            mx: 2,
            mb: 1,
            px: 1,
            py: 0.75,
            borderRadius: 1,
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "action.hover",
            },
              }}>
                <RepeatIcon fontSize='small'/>
                <Typography variant='body2' color="text.secondary">
                  Remix of
                </Typography>
                <Typography 
                variant="body2"
                sx={{
                  fontWeight:600,
                  color:"primary.main",
                }}>
                  {parentPost.title}
                </Typography>
        </Box>
      )}

    {renderMedia()}

      <CardContent>
        {authorName &&(
           <Typography variant="h6" component="div"
              sx={{fontWeight: 'bold',mb:1}}>
          {title}
        </Typography>
        )}
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
       
      </CardContent>
      
       <IconButton onClick={() => setRemixing(!remixing)}>
        <InsightsIcon/>
      </IconButton>
      <Collapse in={remixing}>
        <RemixPostForm postId={postId}/>
      </Collapse>
      
      {contestId &&(
      <ContestVote
        contestId={contestId}
        postId={postId}/>)}
    </CardContainer>
    </Box>
   
  )
}

export default PostItem;