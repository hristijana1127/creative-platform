import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import CollectionsBookmarkRoundedIcon from "@mui/icons-material/CollectionsBookmarkRounded";
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';


export const NAV_ITEMS =[
    {text: "HomePage",path:"/",icon:<DashboardRoundedIcon/>},
    {text: "ProfilePage", path:'/profile',icon:<AccountBoxRoundedIcon/>},
    {text: "YourPosts", path:"/yourPosts", icon:<LibraryBooksRoundedIcon/>},
    {text: "Contests", path:"/previousContests", icon:<CollectionsBookmarkRoundedIcon/>}

];
export const SIDEBAR_ITEMS =[
    {text: "Search",path:"/contest",icon:<DashboardRoundedIcon/>},
    {text: "Settings", path:"/contest", icon:<LibraryBooksRoundedIcon/>},
    {text: "Notifications", path:'/contest',icon:<AccountBoxRoundedIcon/>},

];
export const ADMIN_SIDEBAR_ITEMS =[
    {text: "Dashboard",path:'/admin',icon:<DashboardRoundedIcon/>},
    {text:"Users", path:'/admin/users',icon:<PeopleRoundedIcon/>},
    {text:"Posts", path:'/admin/posts', icon:<LibraryBooksRoundedIcon/>},
    {text:"Contests", path:'/admin/contests',icon:<EmojiEventsRoundedIcon/>},
];