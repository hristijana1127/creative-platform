import { useState,useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import MUISelect from "@mui/material/Select";

const Select = ({ 
    labelText,
    onChange, 
    fullWidth = true,
    value,
    menuItems=[],
    ...props }) => {
  
  const [option, setOption] = useState("");
  useEffect(() =>{
    if(value !== undefined){
      setOption(value);
    }
  },[value]);

  const handleChange = (event) => {
    setOption(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <FormControl fullWidth={fullWidth} {...props}>
      <InputLabel id="demo-simple-select-label">{labelText}</InputLabel>
      <MUISelect value={option} label={labelText} onChange={handleChange}>
        {menuItems.map((item) => (
          <MenuItem key={item.value} value={item?.value}>
            {item?.itemLabel}
          </MenuItem>
        ))}
      </MUISelect>
    </FormControl>
  );
};

export default Select;