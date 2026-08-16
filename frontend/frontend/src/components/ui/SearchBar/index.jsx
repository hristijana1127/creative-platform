import { useState } from "react";
import PropTypes from "prop-types";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import {
  SearchBarWrapper,
  SearchBarInput,
  SearchBarIcon,
  ClearIconButton,
  SubmitIconButton,
} from "./styles";

const SearchBar = ({
  placeholder = "Search...",
  onSearch,
  onChange,
  width = "100%",
}) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    if (onChange) onChange("");
    if (onSearch) onSearch("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(value);
  };

  return (
    <SearchBarWrapper component="form" onSubmit={handleSubmit} sx={{ width }}>
      <SearchBarIcon />

      <SearchBarInput
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        fullWidth
      />

      {value && (
        <ClearIconButton onClick={handleClear} size="small">
          <ClearIcon sx={{ fontSize: 18 }} />
        </ClearIconButton>
      )}

      <SubmitIconButton type="submit" size="small">
        <SearchIcon sx={{ fontSize: 18 }} />
      </SubmitIconButton>
    </SearchBarWrapper>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
  onChange: PropTypes.func,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default SearchBar;
