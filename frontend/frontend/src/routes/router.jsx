import {
    createBrowserRouter,
    createRoutesFromElements,
    Outlet,
    Route,
    Navigate
} from "react-router-dom";

import Layout from '../components/ui/Layout';
import {AuthProvider} from '../context/AuthProvider';
import AuthContext from "../context/AuthProvider";
import {appRoutes,authRoutes} from '../routes/routes';
import { useContext} from "react";
import NotFound from '../pages/not-found';

const allRoutes = [...appRoutes,...authRoutes];
const ProtectedRoute = ()  =>{
    const {auth, isLoading} = useContext(AuthContext);

    if(isLoading){
        //return null;
        return <div>Loading...</div>
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
            <Route element={<GuestRoute/>}>
                {authRoutes.map((route) =>(
                    <Route key={route.path} path={route.path} element={route.element}/>
                ))}
            </Route>
            <Route path="*" element={<NotFound/>}/>
        </>
    )
)