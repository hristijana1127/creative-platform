import {useEffect, useContext,useState} from 'react'
import Navbar from '../../components/ui/Navbar'
import {Box} from "@mui/material";
import PostItem from '../../components/PostItem';
import PostUploadForm from '../../components/Posts/PostsUploadForm';
import { getUserPosts,getPosts } from '../../api/services/posts/posts';
import AuthContext from '../../context/AuthProvider';

const Posts = () => {
  const {auth} = useContext(AuthContext);
  
            const[title , setTitle]= useState('');
            const[description, setDescription ] = useState('');
            const[selectedFormat, setSelectedFormat] = useState("");
            const[file, setFile] = useState(null);
    
            
            const[posts,setPosts] = useState([]);
            const[loading, setLoading] = useState(true);
            const[error, setError] = useState(null);

            const currentUser = auth?.user;
             useEffect(() =>{

              const fetchPost= async() => {
                  try{
                      setLoading(true);
                      setError('');
                      const data = await getUserPosts(
                        auth?.token, 
                        auth?.user?.id
                    );
                    
                      setPosts(data);
                      console.log("POST DATA:", data);
                  }catch(err){
                      console.error("Fetch error:",err);
                      setError("Failed to load posts");
                  }finally{
                      setLoading(false)
                  }
              };
              if(auth?.token){
                  fetchPost();
              }
          }, [auth?.token]);

          const handlePostDeleted = (deletedPostId) => {
             setPosts((prevPosts) => prevPosts.filter( (
                post) => post._id !== deletedPostId 
                 )
             );
             };
          
  return (
    <Box
        sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 0, 
                          }}
    >
      {posts.map((post) => {
    console.log("POST:", post._id);
    console.log("CONTEST ID:", post.contestId);

    return (
        <PostItem
            key={post._id}
            postId={post._id}
            postUserId={post.userId}
            authorName={post.userId?.username}
            profilePicture={post.userId?.profilePicture}
            title={post.title}
            description={post.description}
            file={post.fileUrl}
            format={post.format}
            createdAt={post.createdAt}
            parentPost={post.parentPostId}
            currentUser={currentUser}
            onDeleted={handlePostDeleted}
            contestId={post.contestId}
        />
    );
})}
    </Box>
  )
}

export default Posts;