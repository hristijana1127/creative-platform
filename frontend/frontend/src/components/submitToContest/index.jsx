import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import SubmissionMethod from "./SubmitMethod";
import PostUploadForm from "../Posts/PostsUploadForm";
import SelectPostForm from "./SelectPostForm";
import Button from "../ui/Button";
const ContestSubmitModal = ({open,onClose, contestId,onSuccess}) =>{
    const [step, setStep] = useState("choose");

    const handleClose = () =>{
        setStep("choose");
        onClose();
    }
    const handleSuccess = () => {
        setStep("choose");

        if (onSuccess) {
            onSuccess();
        } else {
            onClose();
        }
    };
    return(
        <Dialog
        open = {open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        >
        {step === "choose" && (

            <>
            <DialogTitle>
                Enter Contest
            </DialogTitle>

            <DialogContent
                sx={{
                    display:"flex",
                    flexDirection:"column",
                    gap:2,
                    py:3
                }}
            >
                <Button
                variant= "contained"
                onClick={() => setStep("upload")}>
                    Upload a new post
                </Button>
                <Button
                variant="outlined"
                onClick={() => setStep("existing")}>
                    Choose one of your posts
                </Button>
            </DialogContent>
            </>
        )}
            {step === "upload" && (
                <PostUploadForm
                    contestId={contestId}
                    embedded={true}
                    onSuccess={handleSuccess}
                />
            )}
            {step === "existing" && (
                <SelectPostForm
                    contestId={contestId}
                    onSuccess={handleSuccess}
                    onBack={() => setStep("choose")}
                    
                />
            )}

        </Dialog>
    )
}
export default ContestSubmitModal;