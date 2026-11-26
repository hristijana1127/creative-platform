import { Card,CardMedia, CardContent,Typography } from "@mui/material";

const PostSelectionCard = ({post,selected,onClick}) => {
    return(
        <Card
        onClick={onClick}
        sx={{cursor: "pointer",
            border:"2px solid",
            borderColor: selected ? "primary.main" : "transparent",
            mb:2,
        }}>
            <CardMedia
                component="img"
                height="150"
                image={post.fileUrl}
                alt={post.title}
            />
            <CardContent>
                <Typography fontWeight={600}>
                    {post.title}
                </Typography>
            </CardContent>


        </Card>
    )
}
export default PostSelectionCard;