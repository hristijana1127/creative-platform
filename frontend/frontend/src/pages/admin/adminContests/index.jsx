import {useEffect, useState} from "react";
import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import Button from '../../../components/ui/Button'
import AdminLayout from "../../../components/AdminLayout";
import API from "../../../api/axios";
import CreateContestForm from '../../../components/CreateContestForm'
const AdminContest = () =>{
    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchContests = async() =>{
        try{
            const response = await API.get("/admin/contests");
            setContests(response.data);
            console.log(response.data);
        }catch(error){
            console.error("Error fetching contests",error)
        }finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchContests();
    },[]);
    const closeContest = async(contestId) => {
        try{
            await API.post(`/contests/${contestId}/close`);
            fetchContests();
        }catch(error){
            console.log("Error closing contest:", error);
        }
    };
    if(loading){
        return(
                <CircularProgress/>
        )
    }
    return(
        <Box>
            <Typography>
                Contests
            </Typography>
            <CreateContestForm onSuccess={fetchContests}/>
            <Box
            sx={{
                display:"flex",
                flexDirection:"column",
                gap:2,
            }}>
               {contests.map((contest) => (
                    <Card key={contest._id}>
                        <CardContent>
                            <Typography variant="h6">
                                {contest.title}
                            </Typography>
                            
                            <Typography color="text.secondary">
                                Theme:{contest.theme}
                            </Typography>
                            <Typography sx={{mt:1}}>
                                {contest.description}
                            </Typography>
                            
                            <Typography sx={{mt:1}}>
                                Submissions:{" "}
                                {contest.submissions?.length || 0}
                            </Typography>

                            <Typography sx={{mt:1}}>
                                Status:{" "}
                                {contest.isActive ? "Active" : "Closed"}
                            </Typography>

                            {contest.isActive && (
                                <Button
                                    variant="contained"
                                    sx={{mt:2}}
                                    onClick={() => {
                                        closeContest(contest._id)
                                    }}
                                >
                                    Close Contest
                                </Button>
                            )}
                        </CardContent>
                    </Card>
               ))}
            </Box>
        </Box>
    )
}
export default AdminContest;