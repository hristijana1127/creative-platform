import PropTypes from "prop-types";
import {StyledButton} from "./styles"


const Button = ({
    variant,
    color,
    size,
    onClick,
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
export default Button;