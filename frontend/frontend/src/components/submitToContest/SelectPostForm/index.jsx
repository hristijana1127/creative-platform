import { useState, useEffect, useContext } from "react";
import { getUserPosts } from "../../../api/services/posts/posts";
import { submitToContest } from "../../../api/services/contest/contest";
import { DialogTitle, DialogContent, DialogActions, } from "@mui/material";
import {Box} from "@mui/material";
import Button from "../../ui/Button";
import PostSelectionCard from "./PostSelectionCard";
import AuthContext from '../../../context/AuthProvider';
const SelectPostForm = ({contestId, onBack, onClose}) => {
const {auth} = useContext(AuthContext);
  
    const[posts, setPosts] = useState([]);
    const[selectedPost, setSelectedPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

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

        const handleSubmit = async () => {
             try {
                setLoading(true);

                await submitToContest(contestId, selectedPost._id);

                if (onSuccess) {
                onSuccess();
                }

            } catch (error) {
                console.error(
                "Submit error:",
                error.response?.data || error
                );
            } finally {
                setLoading(false);
            }
        };
    return(
        <>
            <DialogTitle>
                Choose a post
            </DialogTitle>
            <DialogContent>
                <Box>
                   { posts.map((post) => (
                        <PostSelectionCard
                            key={post._id}
                            post={post}
                            
                            selected={selectedPost?._id === post._id}
                            onClick={() => setSelectedPost(post)}
                        />
                    ))}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onBack}>
                    Back
                </Button>

                <Button
                    varient="contained"
                    disabled={!selectedPost || loading}
                    onClick={handleSubmit}>
                    Submit to contest
                </Button>
            </DialogActions>
        </>
    )
}
export default SelectPostForm;