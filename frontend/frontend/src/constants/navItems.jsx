import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import CollectionsBookmarkRoundedIcon from "@mui/icons-material/CollectionsBookmarkRounded";
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";

export const NAV_ITEMS =[
    {text: "HomePage",path:"/",icon:<DashboardRoundedIcon/>},
    {text: "ProfilePage", path:'/profile',icon:<AccountBoxRoundedIcon/>},
    {text: "YourPosts", path:"/yourPosts", icon:<LibraryBooksRoundedIcon/>},
    {text: "ContestFeed", path:"/contestFeed", icon:<CollectionsBookmarkRoundedIcon/>}

]