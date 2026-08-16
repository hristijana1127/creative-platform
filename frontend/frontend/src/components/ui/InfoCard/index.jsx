import { StyledInfoCardContainer, StyledInfoCardTitle } from "./styles";

const InfoCard = ({ title,children}) => {
    return(
        <StyledInfoCardContainer>
            {title && <StyledInfoCardTitle variant="h3">{title}</StyledInfoCardTitle>}
            {children}
        </StyledInfoCardContainer>
    );
};

export default InfoCard;