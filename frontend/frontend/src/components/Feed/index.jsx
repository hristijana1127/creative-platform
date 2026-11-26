import {useEffect, useState} from 'react';
import {PostItem} from '../../components/PostItem';
import {Box, CircularProgress, Typography} from '@mui/material';
import { getPosts } from '../../api/services/posts/posts';
const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPosts = async() => {
            try{
                const data = await getPosts();
                setPosts(data);
            }catch(err){
                setError(err.response?.data?.message || 'Failed to load posts');
            }finally{
                setLoading(false);
            }
        };
        fetchPosts();
    },[]);
    if(loading){
        return(
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress/>
            </Box>
        );
    }
    if(error){
        return(
            <Typography color="error" align="center" mt={4}>
                {error}
            </Typography>
        );
    }
    return(
        <Box
            display ="flex" flexDirection="column" alignItems="center">
                {posts.map((post) => (
                    <PostItem
                        key={post._id}
                        authorName={post.userId.username || post.userId?.name}
                        profilePicture={post.userId?.profilePicture}
                        title={post.title}
                        description={post.description}
                        file={post.fileUrl}
                        format={post.format}
                        createdAt={post.createdAt}
                    />
                ))}
        </Box>
    )
}
export default Feed;