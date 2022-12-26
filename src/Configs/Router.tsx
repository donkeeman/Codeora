import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../Pages/Main";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import SuccessSignUp from "../Pages/SignUpSuccess";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signup-success" element={<SuccessSignUp />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
