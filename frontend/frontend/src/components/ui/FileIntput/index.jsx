import {Button} from "@mui/material";
import {useRef} from "react";

const FileUpload = () => {
    const fileInputRef = useRef(null);

const handleClick = () => {
    fileInputRef.current?.click();
}
const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
};

return(
    <>
        <input
        type="file"
        hidden
        ref={fileInputRef}
        onChange={handleFileChange}
        />
        <Button variant="outlined" onClick={handleClick}>
            Choose File
        </Button>
    </>
);
};
export default FileUpload;