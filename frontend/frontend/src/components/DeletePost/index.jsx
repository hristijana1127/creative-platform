import { useState } from "react";
import {Dialog, DialogActions, DialogContent, MenuItem,DialogContentText, DialogTitle} from '@mui/material';
import Button from '../ui/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import {deletePost} from '../../api/services/posts/posts.js';

const DeletePost = ({postId, onDeleted, menuItem = false}) => {
    const[open,setOpen] = useState(false);
    const[deleting,setDeleting] = useState(false);

    const handleOpen = () =>{
        setOpen(true);
    };
    const handleClose = () =>{
        if(!deleting){
        setOpen(false);}
    };
    const handleDelete = async () => {
        try{
            setDeleting(true);
            await deletePost(postId);
            setOpen(false);
            if(onDeleted){
                onDeleted(postId);
            }
        }catch(error){
            console.error("Error deleting post:",error);

            alert(
                error?.response?.data?.message || "Failed to delete post."
            );
        }finally{
            setDeleting(false);
        }
    };
    return (
        <>
        {menuItem ? ( 
            <MenuItem onClick={handleOpen} 
            sx={{ color: "error.main", }} >
                <DeleteIcon fontSize="small"
                 sx={{ mr: 1 }} /> 
                 Delete post </MenuItem> 
                ) : ( 
                <Button color="error" startIcon={<DeleteIcon />}
                onClick={handleOpen}
                fullWidth 
                > 
                Delete post 
                </Button> )} 
                <Dialog
                 open={open} 
                 onClose={handleClose} 
                 >
                     <DialogTitle> Delete post? </DialogTitle> 
                    <DialogContent>
                        <DialogContentText> Are you sure you want to delete this post?
                             <br />
                             <br />
                             This action cannot be undone. 
                        </DialogContentText> 
                    </DialogContent> 
                    <DialogActions> 
                        <Button onClick={handleClose} 
                        disabled={deleting} 
                        > Cancel </Button> 
                        <Button onClick={handleDelete}
                         color="error" 
                         variant="contained" 
                         disabled={deleting} > 
                         {deleting ? 
                         "Deleting..." : "Delete"} 
                         </Button> 
                    </DialogActions>
                </Dialog>
        </>
    );
};
export default DeletePost;