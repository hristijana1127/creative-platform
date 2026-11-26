import {
    createBrowserRouter,
    createRoutesFromElements,
    Outlet,
    Route,
    Navigate
} from "react-router-dom";

import Layout from '../components/ui/Layout';

import AuthContext from "../context/AuthProvider";
import AdminLayout from "../components/AdminLayout";
import {adminRoutes, appRoutes,authRoutes} from '../routes/routes';
import { useContext} from "react";
import NotFound from '../pages/not-found';

const allRoutes = [...appRoutes,...authRoutes,...adminRoutes];
const ProtectedRoute = ()  =>{
    const {auth, isLoading} = useContext(AuthContext);

    if(isLoading){
        //return null;
        return <div className="flex justify-center p-8">Loading...</div>
    }
    if(!auth?.token){
        return <Navigate to="/login" replace/>;
    }
    return(
        <Layout>
            <Outlet/>
        </Layout>
    )
};
const AdminRoute = () => {
    const {auth, isLoading} = useContext(AuthContext);
    if(isLoading){
        return(
            <div className = "flex justify-center p-8">
                Loading...
            </div>
        )


    }
    if(!auth.token){
        return <Navigate to='/login' replace/>;
    }
    if(auth?.user?.role !== "admin"){
        return <Navigate to="/" replace/>;
    }
    return(
        <AdminLayout/>
           
    );
};
const GuestRoute = () => {
    const {auth,isLoading} = useContext(AuthContext);
     
    if(isLoading){
        return null;
    }
    if(auth?.token){
        return <Navigate to="/" replace/>
    }
    return <Outlet/>

};
export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<ProtectedRoute/>}>
                {appRoutes.map((route) => (
                    <Route key={route.path} path={route.path} element={route.element}/>
                ))}

            </Route>
            <Route element={<AdminRoute/>}>
                {adminRoutes.map((route) =>(
                    <Route key={route.path} path={route.path} element={route.element}/>
                ))}
            </Route>
            <Route element={<GuestRoute/>}>
                {authRoutes.map((route) =>(
                    <Route key={route.path} path={route.path} element={route.element}/>
                ))}
            </Route>

            <Route path="*" element={<NotFound/>}/>

            
        </>
    )
)