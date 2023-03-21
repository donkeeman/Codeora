import React from "react";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import App from "../App";
import CodeDetail from "../Pages/CodeDetail";
import EditCode from "../Pages/EditCode";
import Main from "../Pages/Main";
import NotFound from "../Pages/NotFound";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import SuccessSignUp from "../Pages/SignUpSuccess";
import WriteCode from "../Pages/WriteCode";
import { currentUserState } from "./atoms";

const PrivateRoutes = () => {
    const userData = useRecoilValue(currentUserState);

    return userData ? <Outlet /> : <Navigate to="/signin" replace />;
};

const PublicRoutes = () => {
    const userData = useRecoilValue(currentUserState);

    return userData ? <Navigate to="/" replace /> : <Outlet />;
};

const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Main />,
            },
            {
                element: <PrivateRoutes />,
                children: [
                    { path: "write", element: <WriteCode /> },
                    {
                        path: "code/:postingId",
                        element: <CodeDetail />,
                    },
                    { path: "edit/:postingId", element: <EditCode /> },
                ],
            },
            {
                element: <PublicRoutes />,
                children: [
                    { path: "signin", element: <SignIn /> },
                    { path: "signup", element: <SignUp /> },
                    { path: "signup-success", element: <SuccessSignUp /> },
                ],
            },
            { path: "*", element: <NotFound /> },
        ],
    },
]);

export default Router;
