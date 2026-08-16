import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import MUISelect from "@mui/material/Select";

const Select = ({ labelText, onChange, fullWidth = true, menuItems, ...props }) => {
  const [option, setOption] = useState("");

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
        {menuItems.map((item, index) => (
          <MenuItem key={index} value={item?.value}>
            {item?.itemLabel}
          </MenuItem>
        ))}
      </MUISelect>
    </FormControl>
  );
};

export default Select;