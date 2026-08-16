import {lazy} from "react";

const LoginPage = lazy(() => import("../pages/login"));
const ForgotPasswordPage = lazy(() => import("../pages/password-reset"));
const HomePage = lazy(() => import("../pages/homepage"));
const NotFound = lazy(() => import("../pages/not-found"));
const ProfilePage = lazy(() => import('../pages/profile-page'));
const YourPosts = lazy(() => import('../pages/your-posts'));
const Register = lazy(() => import('../pages/register'));
const ContestFeed = lazy(() => import('../pages/contest-feed'));
const PreviousContests = lazy(() => import('../pages/previous-contests'));


export const appRoutes = [
    {path: '/',element: <HomePage />, isProtected:true},
   // {path: '/profile',element:<ProfilePage/>, isProtected:true},
    {path: '/yourPosts',element:<YourPosts/>, isProtected:true},
    {path: '/contestFeed',element:<ContestFeed/>, isProtected:true},
    {path: '/previousContests',element:<PreviousContests/>, isProtected:true},

];
export const authRoutes=[
    
    {path: '/login',element:<LoginPage/>, isGuest:true},
    {path: '/password-reset',element:<ForgotPasswordPage/>, isGuest:true},
     {path: '/register',element:<Register/>, isGuest:true},
]
export const fallbackRoute = {
    path: "*",
    element: <NotFound/>
};