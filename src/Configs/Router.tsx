import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import CodeDetail from "../Pages/CodeDetail";
import EditCode from "../Pages/EditCode";
import Main from "../Pages/Main";
import NotFound from "../Pages/NotFound";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import SuccessSignUp from "../Pages/SignUpSuccess";
import WriteCode from "../Pages/WriteCode";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                errorElement: <NotFound />,
                children: [
                    {
                        path: "/",
                        element: <Main />,
                    },
                    { path: "write", element: <WriteCode /> },
                    {
                        path: "code/:postingId",
                        element: <CodeDetail />,
                    },
                    { path: "edit/:postingId", element: <EditCode /> },
                    { path: "signin", element: <SignIn /> },
                    { path: "signup", element: <SignUp /> },
                    { path: "signup-success", element: <SuccessSignUp /> },
                    { path: "/not-found", element: <NotFound /> },
                ],
            },
        ],
        errorElement: <NotFound />,
    },
]);

export default Router;
