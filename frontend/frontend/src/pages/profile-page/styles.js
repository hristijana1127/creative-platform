import { styled } from "@mui/material/styles";
import Posts from '../../components/Posts'

export const StyledPosts = styled(Posts)({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr 1fr',
    alignItems: 'center',
    textAlign: 'center',
})