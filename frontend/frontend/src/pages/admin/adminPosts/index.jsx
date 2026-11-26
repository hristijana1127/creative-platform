import {useEffect, useState} from 'react';
import {Box, Card, CardContent, CircularProgress, Typography} from '@mui/material';
import AdminLayout from '../../../components/AdminLayout';
import API from '../../../api/axios';

const AdminPosts = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try{
                const response = await API.get("/admin/posts");
                setPosts(response.data);
            }catch(error){
                console.log("Error fetching posts: ", error);
            }finally{
                setLoading(false);
            }
        };
        fetchPosts();
    },[]);

    if(loading){
        return(
           
                <CircularProgress/>
            
        )
    }
    return (
       <Box>
        <Typography variant="h4" sx={{mb:4}}>
            Posts
        </Typography>
        
        <Box 
        sx={{
            display:"flex",
            flexDirection:"column",
            gap:2,
        }}>
            {posts.map((post) => (
                <Card key={post._id}>
                    <CardContent>
                        <Typography variant='h6'>
                            {post.title}
                        </Typography>
                        <Typography>
                            {post.description}
                        </Typography>
                        <Typography color="text.secondary" sx={{mt:1}}>
                            Postes by:{" "}
                            {post.userId?.username || "Unknown"}
                        </Typography>

                        <Typography color="text.secondary" sx={{mt:1}}>
                            Format:{post.format}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
       </Box>
    )
}
export default AdminPosts;