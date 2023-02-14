import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CodeDetail from "../Pages/CodeDetail";
import Main from "../Pages/Main";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import SuccessSignUp from "../Pages/SignUpSuccess";
import WriteCode from "../Pages/WriteCode";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/write" element={<WriteCode />} />
                <Route path="/code/:postingId" element={<CodeDetail />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signup-success" element={<SuccessSignUp />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
