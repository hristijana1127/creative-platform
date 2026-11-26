import {Button} from "@mui/material";
import {useRef} from "react";
import Input from "../Input";

const FileUpload = ({onChange}) => {
    const fileInputRef = useRef(null);

const handleClick = () => {
    fileInputRef.current?.click();
}
const handleFileChange = (event) => {
    if(onChange){
        onChange(event);
    }
   
};

return(
    <>
        <Input
        type="file"
        hidden
        ref={fileInputRef}
        onChange={handleFileChange}
        />
        
    </>
);
};
export default FileUpload;