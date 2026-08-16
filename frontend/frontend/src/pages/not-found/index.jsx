import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  PageContainer,
  ContentContainer,
  IllustrationContainer,
  MessageContainer,
  StyledImage,} from './styles.js'

import NotFoundImage from "../../assets/icons8-web-error-50.png";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <ContentContainer>
        <IllustrationContainer>
          <StyledImage src={NotFoundImage} alt="404 Page Not Found" />
        </IllustrationContainer>

        <MessageContainer>
          <Typography variant="h2" fontWeight={700} gutterBottom>
            Oopsies!
          </Typography>

          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              color: "#513876",
              mb: 1,

            }}
          >
            404
          </Typography>

          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            We couldn't find the page you were looking for.
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            sx={{
              ml: 2,
              mr: 5,
              borderRadius: "50px",
              textTransform: "none",
              px: 4,
              py: 1.2,
            }}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>

          <Button
            variant="contained"
            onClick={() => navigate("/")}
            sx={{
              borderRadius: "50px",
              textTransform: "none",
              px: 4,
              py: 1.2,
            }}
          >
            Go Home
          </Button>
        </MessageContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default NotFound;
