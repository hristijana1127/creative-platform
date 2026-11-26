import { DialogContent, Typography } from "@mui/material";
import Button from "../../ui/Button";

const SubmissionMethod = (onUpload, onChooseExisting) =>{
    return(
        <DialogContent>
            <Typography variant="h5" fontWeight={700}>
                Enter the contest
            </Typography>
            
            <Typography
            
            color="text.secondary"
            sx={{mt:1, mg:3}}>
                How would you like to enter the contest?
            </Typography>
            <Box
            sx={{
                display:"grid",
                gridTemplateColumns:"1fr 1fr",
                gap: 2,
            }}
            >
                <Button
                variant="outlined"
                onClick={onUpload}
                >
                    Upload a new post
                </Button>

                <Button
                variant="outlined"
                onClick={onChooseExisting}
                >
                    Choose from my posts
                </Button>

            </Box>
        </DialogContent>
    )
}
export default SubmissionMethod;