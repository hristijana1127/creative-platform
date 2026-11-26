import { useEffect, useState,useContext } from "react";
import {Box, Card, CardContent, Grid, Typography} from '@mui/material';
import Button from '../../../components/ui/Button'
import API from "../../../api/axios"
import AuthContext from '../../../context/AuthProvider'
import {useNavigate } from "react-router-dom";
const AdminDashboard = () => {
    const [stats, setStats] = useState({
        users:0,
        posts:0,
        contests:0,
        activeContests:0
    });
   
      const { setAuth } = useContext(AuthContext);
     
      const navigate = useNavigate();
    
  const handleLogout = () => {
    console.log("logout triggered");
    setAuth(null);
    localStorage.removeItem("token");
    navigate("/login");
  };
    useEffect(() => {
        const fetchStats = async () =>{
            try{
                const response = await API.get("/admin/stats");
                setStats(response.data);
            }catch(error){
                console.error("Error fetching admin stats: ",error);
            }
        };
        fetchStats();
    },[]);
    return(
        <Box sx={{p:4}}>
            <Typography  variant="h4" sx={{mb:4}}>
                Admin Dashboard
            </Typography>
            <Button
                variant="contained"
                color="error"
                onClick={handleLogout}
            >
                Log Out
            </Button>
            <Grid container spacing={3}>    
                <Grid item sx={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="text.secondary">
                                Users
                            </Typography>

                            <Typography variant="h3">
                                {stats.users}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="text.secondary">
                                Posts
                            </Typography>

                            <Typography variant="h3">
                                {stats.posts}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="text.secondary">
                                Contests
                            </Typography>

                            <Typography variant="h3">
                                {stats.contests}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="text.secondary">
                                Active Contests
                            </Typography>

                            <Typography variant="h3">
                                {stats.activeContests}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid >
        </Box>
    );
};
export default AdminDashboard;