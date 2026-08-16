import PropTypes from "prop-types";
import {StyledButton} from "./styles"
import { Children } from "react";

const Button = ({
    variant,
    color,
    size,
    onclick,
    sx = {},
    children,
    ...props
}) => {
    return (
        <StyledButton
        variant={variant}
        color={color}
        size={size}
        onClick={onClick}
        sx={sx}
        {...props}
        >
          {children}
        </StyledButton>
    )
}