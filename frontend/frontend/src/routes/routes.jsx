import {lazy} from "react";

const LoginPage = lazy(() => import(""));
const ForgotPasswordPage = lazy(() => import(""));
const HomePage = lazy(() => import(""));
const NotFound = lazy(() => import(""));



export const appRoutes = [
    {path: '/',element: <HomePage />}
];

export const fallbackRoute = {
    path: "*",
    element: <NotFound/>
};