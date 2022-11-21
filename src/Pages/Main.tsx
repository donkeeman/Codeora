import React from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../atoms";

const Main = () => {
    const userData = useRecoilValue(currentUserState);
    return userData ? (
        <p>{userData?.displayName}님, 어서 오세요!</p>
    ) : (
        <Navigate to={"/signin"} />
    );
};

export default Main;
