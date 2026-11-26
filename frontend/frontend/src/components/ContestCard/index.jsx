import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {CardContainer} from "./styles.js";
import PodiumCard from "./PodiumCard/index.jsx";
import {Box} from "@mui/material";
import {useNavigate,useParams} from 'react-router-dom';
import { getContestById } from "../../api/services/contest/contest.js";

const Contest = ({contest}) => {
  const [title,setTitle] = useState("");
  const [theme,setTheme] = useState("");
  const [startDate,setStartDate] = useState("");
  const [endDate,setEndDate] = useState("");
  const [winner, setWinner] = useState(null);
  const [topSubmissions, setTopSubmissions]= useState([]);
  const [description, setDescription] = useState('');
 

  const navigate = useNavigate();
  const {contestId} = useParams();
/*
  const fetchContestById = async() => {
    try{
      const contest = await getContestById(contestId)
      setTitle(contest.title);
      setTheme(contest.theme);
      setStartDate(contest.startDate);
      setEndDate(contest.endDate);
      setWinner(contest.winnerPostId);
      
      setTopSubmissions(contest.topSubmissions);
      
    }catch(err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchContestById();
  },[contestId]);
*/
  const handleContestClick = async() => {
    navigate(`/contestFeed/${contest._id}`);
  }


  return (
    <CardContainer onClick={handleContestClick}>
        <Typography 
        variant="h6" 
        sx={{
          fontWeight:700,
          width:"100%",
          textAlign: "right",
          mb:0.5,
        }}>
            {contest.title}
        </Typography>
        <Typography 
        variant="body2" 
        color="text.secondary"
        align="center"
        sx={{
          width:"100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            minHeight:'40px',
            lineHeight:1.4,
         }}>
        {contest.theme}
        </Typography>
        <Box
        sx={{
          width:"100%",
          height:"1px",
          backgroundColor:"divider",
          my:1,
        }}
        >

        <PodiumCard topSubmissions={contest.topSubmissions}/> 
       
        </Box>
    </CardContainer>
  )
}

export default Contest;