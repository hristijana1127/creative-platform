import {useEffect, useState} from 'react';
import { getCommentsForPost,createComment, deleteComment } from '../../api/services/comments/comments';
import {Box, Typography,Alert, Avatar, CircularProgress, Divider, IconButton, Paper, Stack, TextField} from '@mui/material';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete"
const CommentSection = ({postId, currentUserId}) => {
    const[comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const fetchComments = async () => {
        if (!postId) return;
        try {
            const data = await getCommentsForPost(postId);
            const commentsArray = Array.isArray(data) ? data : data?.comments || [];
            setComments(commentsArray);
        } catch (error) {
            console.error("Error fetching comments:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchComments();
    },[postId]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const text = commentText.trim();

        console.log("Submitting comment...");
        console.log("postId:", postId);
        console.log("currentUserId:", currentUserId);
        console.log("text:", text);
       
        if(!postId){
            console.error("ubmission blocked: 'postId' is missing/undefined in CommentSection!");
            alert("Error: Missing Post ID. Cannot post comment.");
            return;
        }
        if(!text) return;
        try{
            setSubmitting(true);
            const newComment = await createComment({
                postId,
                commentText: text,
                userId: currentUserId,
         } );
         console.log("postId:", postId);
         console.log("commentText:", text);
            setComments((prev) => [newComment,...prev,]);
            setCommentText("");
            
        }catch(error){
            console.error("Error creating comment:",error);
            console.error("Server response:", error.response?.data);
        }finally{
            setSubmitting(false);
        }
    };

    const handleDelete = async(commentId) => {
        try{
            await deleteComment(postId,commentId);
            setComments((prev) => 
            prev.filter((comment) => comment._id !== commentId));
        }catch(error){
            console.error("Failed to delete comment:", error);
        }
    }
    return(
        <Box sx={{mt:4}}>
            <Typography variant="h6" fontWeight={600} sx={{mb:2}}>
                Comments ({comments.length})
            </Typography>

            {/* adding a comment */}
            
            <Paper  component="form" onSubmit={handleSubmit} elevation={0} 
            sx={{
                pt:2,
                border:"1px solid",
                borderColor:"divider",
                borderRadius:2,
                mb:3,
            }}>
                <Stack spacing={2}>
                    <TextField 
                    value={commentText}
                    onChange={(e)=>
                        setCommentText(e.target.value)
                    }
                    placeholder="Write a comment..."
                    multiline
                    minRows={3}
                    fullWidth/>
                    <Box
                    sx={{display:"flex", justifyContent:"flex-end"}}>
                        <Button
                        type="submit"
                        variant={"contained"}
                        endIcon={<SendIcon/>}
                        disabled={submitting || !commentText.trim()}>
                            {submitting ? "Posting..." : "Post Comment"}
                        </Button>
                    </Box>
                </Stack>
            </Paper>
            {/*Commentss */}
           {loading ? ( 
            
            <Box 
            sx={{ display: "flex", 
            justifyContent: "center",
             py: 4}}>
                
             </Box>
            ): comments.length === 0 ? (
                <Alert severity='info'>
                    No comments yet. Be the first!
                </Alert>) : (
                    <Stack spacing={2}>
                        {comments.map((comment) => (
                            <Box key={comment._id}>
                                <Stack direction="row" spacing={2} alignItems="flex-start">
                                    <Avatar>
                                        {comment.userId?.username?.charAt(0)?.toUpperCase() || "U"}
                                    </Avatar>
                                    <Box sx={{flex:1}}>
                                        <Stack 
                                         direction="row"
                                         justifyContent="space-between"
                                         alignItems="center">
                                            <Typography fontWeight={600}>
                                                {comment.userId?.username || "User"}
                                            </Typography>
                                            {currentUserId === comment.userId?._id && (
                                                <IconButton size="small" color="error" 
                                                onClick={() => handleDelete(comment._id)}>
                                                    <DeleteIcon fontSize="small"/>
                                                </IconButton>
                                            )}
                                        </Stack>
                                        <Typography variant="caption" color="text.secondary">
                                            {new Date(
                                                comment.createdAt
                                            ).toLocaleString()}
                                        </Typography>
                                        <Typography variant="body1"
                                        sx={{mt:0.5}}>
                                            {comment.commentText}
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Divider sx={{mt: 2}}/>
                            </Box>
                        ))}
                    </Stack>
                )}
                </Box>      
                                   
    )
}
export default CommentSection;