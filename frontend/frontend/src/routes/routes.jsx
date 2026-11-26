import {lazy} from "react";


const LoginPage = lazy(() => import("../components/Login"));

const HomePage = lazy(() => import("../pages/homepage"));
const NotFound = lazy(() => import("../pages/not-found"));
const ProfilePage = lazy(() => import('../pages/profile-page'));
const YourPosts = lazy(() => import('../pages/your-posts'));
const Register = lazy(() => import('../components/Register'));
const PreviousContests = lazy(() => import('../pages/contest-previous'));
const ContestFeed = lazy(() => import('../pages/contest-feed'));
const AdminDashboard = lazy(() => import('../pages/admin/adminDashboard'));
const AdminUsers = lazy(() => import('../pages/admin/adminUsers'));
const AdminPosts = lazy(() => import('../pages/admin/adminPosts'));
const AdminContests = lazy(() => import('../pages/admin/adminContests'));



export const appRoutes = [
    {path: '/',element: <HomePage />, isProtected:true},
    {path: '/profile',element:<ProfilePage/>, isProtected:true},
    {path: '/yourPosts',element:<YourPosts/>, isProtected:true},
    {path: '/contestFeed/:contestId',element:<ContestFeed/>, isProtected:true},
    {path: '/previousContests',element:<PreviousContests/>, isProtected:true},
    
    

];
export const authRoutes=[
    
    {path: '/login',element:<LoginPage/>, isGuest:true},
     {path: '/register',element:<Register/>, isGuest:true},

];

export const adminRoutes=[
    {path: '/admin', element:<AdminDashboard/>},
    {path: "/admin/users",element: <AdminUsers />},
    {path: "/admin/posts",element: <AdminPosts />},
    {path: "/admin/contests",element: <AdminContests />}

];
export const fallbackRoute = {
    path: "*",
    element: <NotFound/>
};