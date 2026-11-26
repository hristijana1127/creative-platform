import { useState , useContext} from "react";
import {createContest} from '../../api/services/contest/contest.js';
import AuthContext from '../../context/AuthProvider';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

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

const CreateContestForm = ({onSuccess}) =>{

    const {auth} = useContext(AuthContext);

      
    const getThreeMonthsLater = (date) => {
    const result = new Date(date);
    result.setMonth(result.getMonth() + 3);
    return result;
    };
    

    const[title, setTitle] = useState("");
    const[theme, setTheme] = useState("");
    const[description, setDescription] = useState("");
    const [startDate,setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState( getThreeMonthsLater(new Date()));

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [open,setOpen] = useState(false);
   
    const resetForm = () => {
            const today = new Date();
            setTitle('');
            setDescription('');
            setTheme('');
            setStartDate(today);
            setEndDate(getThreeMonthsLater(today));
        };
    const makeContest = async(e) => {
        e.preventDefault();
        setError('');

        if(!title || !theme || !startDate ){
            setError('Title,theme and start date are required!!!');
            return;
        }
        try{
            setLoading(true);
            await createContest({
                title,
                theme,
                description,
                startDate,
                endDate

            });
            resetForm();
            if(onSuccess) onSuccess();
            setOpen(false);
        }catch(err){
            console.log("Upload error:", err);
            console.log("Server response:", err.response?.data);
            console.log("Status:", err.response?.status);
                    console.log('Upload error:',err);
            setError(err.response?.data.message || 'Error creating post.');

        }finally{
            setLoading(false);
        }
    };


return(
<>
    <Button
        variant="contained"
        onClick={() => setOpen(true)}
    >
        Create Contest
    </Button>
    <Dialog
    open={open}
    onClose={() => setOpen(false)}
    fullWidth
    maxWidth="sm">
        <DialogTitle>Create a Contest!</DialogTitle>
            <DialogContent>
                <Box 
                component="form" 
                onSubmit={makeContest}
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
                        position:'absolute',
                        right:8,
                        top:8,
                        color:(theme) => theme.palette.grey[500],
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
                        placeholder='Theme'
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                    />
                    <Input
                    sx={{ mb: 2 }}
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                    <Button
                        type="submit"
                        variant="contained" 
                        disabled={loading} 
                        sx={{mb: 3}}
                    > 
                            {loading ? 'Uploading' : 'Submit Post'}
                           
                    </Button>
                </Box>
            </DialogContent>  
    </Dialog>
</>
);
}
export default CreateContestForm;