import { useEffect,useState } from "react";
import {CircularProgress, Box, Stack, Typography} from '@mui/material';
import Button from '../../components/ui/Button'
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import {getVoteInfo, VoteForPost, removeVote} from '../../api/services/votes/votes.js';

const ContestVote = ({contestId, postId}) => {

    const [voteCount, setVoteCount] = useState(0);
    const [hasVoted, setHasVoted] = useState(false);

    const [loading, setLoading] = useState(true);
    const [voting, setVoting] = useState(false);

    useEffect(() => {
        const loadVoteInfo = async() => {
            try{
                setLoading(true);
                const data = await getVoteInfo( contestId, postId);

                setVoteCount(data.voteCount);
                setHasVoted(data.hasVoted);
            }catch(error){
                console.error("Failed to load vote info:", error);
            }finally{
                setLoading(false);
            }
        };
        if(contestId && postId){
            loadVoteInfo();
        }
    },[contestId, postId]);

    const handleVote = async() =>{
        try{
            setVoting(true);
            if(hasVoted){
                await removeVote(contestId,postId);
                setHasVoted(false);
                setVoteCount((prev) => Math.max(0,prev-1));
            }else{
                await VoteForPost(contestId, postId);
                setHasVoted(true);
                setVoteCount((prev)=> prev + 1); 
            }
        }catch(error) {
            console.error("Voting error:", error);

            const message = error?.response?.data?.message || "Something went wrong while voting.";

            alert(message);
        }finally{
            setVoting(false);
        }
    };
    if(loading){
        return(
            <Stack direction={"row"} alignItems="center" spacing={1} >
                <CircularProgress size={20}/>
                <Typography variant="body2">
                    Loading votes...
                </Typography>
            </Stack>
        )
    }
    return(
        <Box>
            <Stack direction={"row"} alignItems="center" spacing={1.5}>
                <Button
                variant={hasVoted ? "contained" : "outlined"}
                color={hasVoted ? "success" : "primary"}
                startIcon={
                    hasVoted?( <CheckCircleIcon/>) : (<HowToVoteIcon/>)
                }
                onClick={handleVote}
                disabled={voting}>
                    {voting ? "Please wait..." : hasVoted ? "Voted" : "Vote"}
                </Button>
                <Typography variant="body2" color="text.secondary">
                    {voteCount}{" "}
                    {voteCount === 1 ? "vote" : "votes"}
                </Typography>
            </Stack>
        </Box>
    );
};
export default ContestVote;