import React, { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { currentUserState } from "./atoms";
import App from "../App";
import Loading from "../Components/Loading";

const CodeDetail = lazy(() => import("../Pages/CodeDetail"));
const EditCode = lazy(() => import("../Pages/EditCode"));
const Main = lazy(() => import("../Pages/Main"));
const NotFound = lazy(() => import("../Pages/NotFound"));
const SignIn = lazy(() => import("../Pages/SignIn"));
const SignUp = lazy(() => import("../Pages/SignUp"));
const SignUpSuccess = lazy(() => import("../Pages/SignUpSuccess"));
const WriteCode = lazy(() => import("../Pages/WriteCode"));

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
                element: (
                    <Suspense fallback={<Loading />}>
                        <Main />
                    </Suspense>
                ),
            },
            {
                element: (
                    <Suspense fallback={<Loading />}>
                        <PrivateRoutes />
                    </Suspense>
                ),
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
                element: (
                    <Suspense fallback={<Loading />}>
                        <PublicRoutes />
                    </Suspense>
                ),
                children: [
                    { path: "signin", element: <SignIn /> },
                    { path: "signup", element: <SignUp /> },
                    { path: "signup-success", element: <SignUpSuccess /> },
                ],
            },
            { path: "*", element: <NotFound /> },
        ],
    },
]);

export default Router;
