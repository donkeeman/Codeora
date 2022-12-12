import React from "react";
import { Navigate } from "react-router-dom";
import { currentUserState } from "../Configs/atoms";
import { useRecoilState } from "recoil";
import { signOutUser } from "../Hooks/auth";

const Main = () => {
    const [userData, setUserData] = useRecoilState(currentUserState);
    return userData ? (
        <>
            <p>{userData.displayName}님, 어서 오세요!</p>
            <button
                onClick={async () => {
                    await signOutUser();
                    window.localStorage.removeItem("user");
                    setUserData(undefined);
                }}
            >
                로그아웃
            </button>
        </>
    ) : (
        <>
            <Navigate to="/signin" />
        </>
    );
};

export default Main;
