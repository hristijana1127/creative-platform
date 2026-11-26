import React from 'react'
import {useParams} from 'react-router-dom';
import { getSubmissions,getContestById } from '../../api/services/contest/contest';
import { useEffect,useState } from 'react';
import PostItem from '../../components/PostItem';
import Navbar from '../../components/ui/Navbar';
import ContestSubmitModal from '../../components/submitToContest';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import Button from '../../components/ui/Button';

const ContestFeed = () => {
  const theme = useTheme();
  const { contestId} = useParams();
  const [contest, setContest] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [openSubmissionModal, setOpenSubmissionModal] = useState(false);
  

  console.log(contestId);
  

useEffect(() => {
    const fetchContestData = async () => {
        try{
            const data = await getSubmissions(contestId); 
             setSubmissions(data);
            const contestData = await getContestById(contestId);
            console.log("CONTEST DATA:", contestData);
            console.log("isActive:", contestData.isActive);
            console.log("endDate:", contestData.endDate);
            console.log("now:", new Date());
            console.log(
                "end date passed:",
                new Date() > new Date(contestData.endDate)
            );
            setContest(contestData);
        }catch(error){
            console.error(error);
        }
    };
   
    if(contestId){
        fetchContestData();
    }
},[contestId]);

    const isContestOpen = contest?.isActive;
   const handleSubmissionSuccess = async () => {
    setOpenSubmissionModal(false);

    try{
      const data = await getSubmissions(contestId);
      
      setSubmissions(data);
    }catch(error){
      console.error("Error fetching submissions:",error);
    }
   };
  return (
    <Box>
            <Navbar />

            <Box
                sx={{
                    backgroundColor:
                        theme.palette.background.default,

                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2361448d' fill-opacity='0.24'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,

                    minHeight: "100vh",
                    width: "100%",
                    boxSizing: "border-box",

                    margin: 0,
                    padding: 3,
                  minHeight: "100vh",
                  width: "100vw",
                  height: "100vw",
                  marginLeft: "calc(-50vw + 50%)",
                  marginRight: "calc(-50vw + 50%)",
                  boxSizing: "border-box"
                }}
            >
                
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 4
                    }}
                >
                    <Typography variant="h4">
                        Contest
                    </Typography>
                    {isContestOpen && (
                    <Button
                        variant="contained"
                        onClick={() =>
                            setOpenSubmissionModal(true)
                        }
                        sx={{
                          marginTop: "150px"
                        }}
                    >
                        Enter Contest
                    </Button>)}
                </Box>

                
                <Box 
                   sx={{ width: "600px", margin: "200px auto", marginTop: "12px" }}
                >
                    {submissions.length === 0 ? (
                        <Typography>
                            No submissions yet.
                        </Typography>
                    ) : (
                        submissions.map((submission) => (
                            <PostItem
                                key={submission.postId?._id}
                                submission={submission}
                                postId={submission.postId?._id}
                                contestId={contestId}
                                authorName={submission.userId?.username}
                                profilePicture={submission.userId?.profilePicture}
                                title={submission.postId?.title}
                                description={submission.postId?.description}
                                file={submission.postId?.fileUrl}
                                format={submission.postId?.format}
                                createdAt={submission.postId?.createdAt}
                                parentPost={submission.postId?.parentPostId}
                            />
                        ))
                    )}
                </Box>

                
                <ContestSubmitModal
                    open={openSubmissionModal}
                    onClose={() =>
                        setOpenSubmissionModal(false)
                    }
                    contestId={contestId}
                    onSuccess={handleSubmissionSuccess}
                />
            </Box>
        </Box>
  )
}

export default ContestFeed; 