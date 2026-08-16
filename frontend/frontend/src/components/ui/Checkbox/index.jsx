import PropTypes from "prop-types";
import {
    Checkbox as MUICheckbox,
    FormControlLabel,
    FormHelperText,
    FormControl,
} from "@mui/material";

const Checkbox = ({
  label,
  checked,
  onChange,
  error,
  helperText,
  fullWidth = "true",
}) => {
  return (
    <FormControl fullWidth={fullWidth} error={Boolean(error)}>
      <FormControlLabel
        control={<MUICheckbox checked={checked} onChange={onChange} />}
        label={label}
      />
      {(error || helperText) && (
        <FormHelperText>{error || helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  helperText: PropTypes.string,
  fullWidth: PropTypes.bool,
};

export default Checkbox;
