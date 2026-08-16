import PropTypes from "prop-types";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@mui/material";

const RadioButton = ({
  label,
  value,
  onChange,
  options = [],
  error,
  helperText,
  row = false,
  fullWidth = true,
}) => {
  return (
    <FormControl fullWidth={fullWidth} error={Boolean(error)}>
      {label && <FormLabel>{label}</FormLabel>}
      <RadioGroup value={value} onChange={onChange} row={row}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      {(error || helperText) && (
        <FormHelperText>{error || helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default RadioButton;
