import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { currentUserState } from "../Configs/atoms";
import { useRecoilState } from "recoil";
import { signOutUser } from "../Services/auth";

const Main = () => {
    const [userData, setUserData] = useRecoilState(currentUserState);
    const navigate = useNavigate();

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
            <button onClick={() => navigate("/write")}>글쓰기</button>
        </>
    ) : (
        <>
            <Navigate to="/signin" />
        </>
    );
};

export default Main;
