import { Box, Typography, Avatar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CardContainer } from "./styles.js";
const PodiumCard = ({ topSubmissions = [] }) => {
  const first = topSubmissions[0];
  const second = topSubmissions[1];
  const third = topSubmissions[2];

  const PodiumUser = ({submission, place})=>{
    if(!submission) return null;
  
  return (
    <Box
      sx={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        minWidth: place === 1 ? "90px" : "75px",
        flex: 1,
      }}
    >
      
      <Typography
      variant="caption"
        sx={{
          fontWeight:700,
          mb:0.5,
          color: place === 1 ? "primary.main" : "text.secondary",
          }}
      > 
      {place === 1 ? "1st" : place === 2 ? "2nd" : "3rd"}
      </Typography>
      
      <Avatar
          sx={{
            width: 30,
            height: 30,
            bgcolor: "primary.dark",
            flexShrink: 0,
            display:"flex",
            border: place === 1 ? "3px solid" : "2px solid",
            borderColor: place === 1 ? "primary.main" : "divider",

          }}

        >
          {submission.userId?.username?.[0]?.toUpperCase() || "U"}
        </Avatar>
      
      <Typography
      variant="body2"
        sx={{
          minWidth: 0,
          fontWeight: place === 1 ? 700 : 500,
          maxWidth:"90px",
          display:"flex",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {submission.userId.username || "User"}
      </Typography>
      <Typography
      variant="caption"
      color="text.secondary">
        {submission.votes} votes
      </Typography>
      </Box>
    

  );
};
return(
  <Box 
  sx={{
    width:"100%",
    display:"flex",
    alignItems:"flex-end",
    justifyContent:"center",
    gap:{xs:1,sm:2},
    mt:1,
  }}>

  </Box>
)
};
export default PodiumCard;