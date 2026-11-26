import {useState} from "react";
import Input from "../ui/Input";
import Select from "../ui/Select";
import FileInput from "../ui/FileIntput";

const AddFileForm = ({ fileTypes, subcategories }) => {
    const [selectedFileType, setSelectedFileType] = useState("");
    const [selectedSubcategory, setSelectedSubcategory] = useState("");


    console.log("Subcategories in AddFileForm:", subcategories);
    return (
        <div>
            <Input sx={{mb: 2}} type="text" placeholder="File Name"/>
            <Select 
            
                sx={{mb:2}}
                menuItems={
                    fileTypes?.map((type) => ({
                        value: type.fileTypeId,
                        itemLabel: type.name,
                    })) || []
                }
                onChange={ (e) => {
                    setSelectedFileType(e.target.value);
                }}
                labelText={"File Type"}
                />
          
                
        </div>
    )
}
export default AddFileForm;