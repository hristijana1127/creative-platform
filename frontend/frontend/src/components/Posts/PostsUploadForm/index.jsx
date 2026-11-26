import {useEffect, useState, useContext} from 'react';

import {Box,
    FormControl,
    InputLabel,
    MenuItem,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton
    } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import FileUpload from '../../ui/FileIntput';
import Select from '../../ui/Select';
import { getPosts,createPost } from '../../../api/services/posts/posts';
import AuthContext from '../../../context/AuthProvider'
import { submitToContest } from '../../../api/services/contest/contest';



const PostUploadForm = ({onSuccess,onSelect, contestId, embedded = false}) => {

        const formatOptions = [
            { value: 'image', itemLabel: 'Image' },
            { value: 'video', itemLabel: 'Video' },
            { value: 'text', itemLabel: 'Text' },
            { value: 'audio', itemLabel: 'Audio' }
        ];

        const resetForm = () => {
            setTitle('');
            setDescription('');
            setSelectedFormat('');
            setFile(null);
            setError('');
        };
   
        const {auth} = useContext(AuthContext);
        //states for form inputs 
        const[title , setTitle]= useState('');
        const[description, setDescription ] = useState('');
        
        const[selectedFormat, setSelectedFormat] = useState("");
        const[file, setFile] = useState(null);

        //states for feed
        const[posts,setPosts] = useState([]);
        const[loading, setLoading] = useState(false);
        const[error, setError] = useState(null);
        const[open, setOpen] = useState(false);
        
       
       
        const makePost = async (e) =>{

            e.preventDefault();
            console.log("MAKE POST FIRED")
            setError('');

            if(!title || !selectedFormat || !file){
                setError('Title, format, and file are required');
                return;
            }
            try{
                setLoading(true);

                const createdPost = await createPost({
                    title,
                    description,
                    format: selectedFormat,
                    file,
                    
                });

                if(contestId) {
                    await submitToContest(
                        contestId, 
                        createdPost._id
                    )
                }

               resetForm();
                if(onSuccess) onSuccess();
                setOpen(false);
            }catch(err){
                console.error('Upload error:',err);
                setError(err.response?.data.message || 'Error creating post.');
            }finally{
                setLoading(false);
            }
        };
        
    return (
        <>
        <Button
            variant = "contained"
            onClick={() => setOpen(true)}
        >
            Create Post
        </Button>
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>Create a post!</DialogTitle>
            <DialogContent>
                <Box 
                component="form" 
                onSubmit={makePost}
                sx={{
                    display: 'flex',
                    flexDirection:'column',
                    gap:2,
                    maxWidth: 500,
                    mx:'auto',
                    p:2
                }}> 
                <IconButton 
                
                onClick={() => {
                    resetForm();
                    setOpen(false);
                }}
                
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}>
                    <CloseIcon/>
                </IconButton>
                    <Input
                        sx={{mb:2}}
                        placeholder='Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Input
                        sx={{mb:2}}
                        placeholder='Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        
                        <Select
                            labelText="Format Type"
                            value={selectedFormat}
                            onChange={(e) => setSelectedFormat(e.target.value)}
                            menuItems={formatOptions}
                        />
                            
                         
                    </FormControl>
                   
                    <FileUpload sx={{mb:2}}
                    
                        onChange={(param) => {
                        console.log("Raw FileUpload output:", param);
                        const extractedFile = param?.target?.files?.[0] || (param instanceof File ? param : null);
                        console.log('Extracted file object:',extractedFile);
                        setFile(extractedFile);
                        }}/>
                        {error && (
                            <Typography color="error" variant='body2'>
                                {error}
                            </Typography>
                        )}
                    
                          
                        
                    <Button
                        type="submit"
                        variant="contained" 
                        disabled={loading} 
                        sx={{mb: 3}}
                    > 
                            {loading ? 'Uploading...'
                            : contestId ?'Submit Entry' 
                            : "Submit Post"}
                           
                    </Button>
                   
                    
                </Box>
                
            </DialogContent>
            </Dialog>
      
    </>
    
    )
}
export default PostUploadForm;