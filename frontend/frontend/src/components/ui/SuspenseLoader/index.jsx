import { CircularProgress } from "@mui/material";
import { Overlay, LoaderContainer, LoaderText, LoaderSubtext } from "./styles";

const SuspenseLoader = () => (
  <Overlay>
    <LoaderContainer>
      <CircularProgress
        size={70}
        thickness={5}
        sx={{ color: "secondary.main" }}
      />
      <LoaderText variant="h5">Loading your app...</LoaderText>
      <LoaderSubtext variant="body2">
        Hang tight — we are warming everything up for you.
      </LoaderSubtext>
    </LoaderContainer>
  </Overlay>
);

export default SuspenseLoader;
