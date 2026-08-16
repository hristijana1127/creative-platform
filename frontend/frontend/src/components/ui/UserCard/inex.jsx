import PropTypes from "prop-types";
import Button from "../Button";
import {
  UserCardWrapper,
  UserCardContent,
  UserCardBody,
  UserCardAvatar,
  UserCardName,
  UserCardActions,
} from "./styles";

const UserCard = ({ name, imageUrl, onViewProfile }) => {
  return (
    <UserCardWrapper>
      <UserCardContent>
        <UserCardBody>
          <UserCardAvatar src={imageUrl} alt={name} />
          <UserCardName variant="h3">{name}</UserCardName>
        </UserCardBody>
      </UserCardContent>
      <UserCardActions>
        <Button variant="contained" color="primary" onClick={onViewProfile}>
          View Profile
        </Button>
      </UserCardActions>
    </UserCardWrapper>
  );
};

UserCard.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  onViewProfile: PropTypes.func,
};

export default UserCard;
