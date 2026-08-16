import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";

const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error,
  helperText,
  size = "medium",
  fullWidth = true,
  ...props
}) => {
  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      error={Boolean(error)}
      helperText={error || helperText}
      size={size}
      fullWidth={fullWidth}
      variant="outlined"
      {...props}
    />
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium"]),
  fullWidth: PropTypes.bool,
};

export default Input;
