import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { User } from "firebase/auth";
import { currentUserState } from "../atoms";
import { signInEmail, signInGoogle, signInGithub } from "../Hooks/auth";

const SignIn = () => {
    const email = useRef<HTMLInputElement | null>(null);
    const password = useRef<HTMLInputElement | null>(null);
    const setUserData = useSetRecoilState(currentUserState);
    const navigate = useNavigate();

    const signInHandler = (userData: User) => {
        setUserData(userData);
        navigate("/");
    };
    return (
        <>
            <h2>코더라에 오신 것을 환영합니다.</h2>
            <h2>로그인하여 나의 코드를 저장해 보세요.</h2>
            <label htmlFor="email">이메일</label>
            <input type="text" name="email" id="email" ref={email} />
            <label htmlFor="password">비밀번호</label>
            <input
                type="password"
                name="password"
                id="password"
                ref={password}
            />
            <button
                onClick={async () => {
                    if (email.current && password.current) {
                        const userData = await signInEmail(
                            email.current.value,
                            password.current.value
                        );
                        if (userData) {
                            signInHandler(userData.user);
                        }
                    }
                }}
            >
                로그인
            </button>
            <p>계정이 없으신가요? </p>
            <Link to={"/signup"}>회원 가입</Link>
            <p>또는</p>
            <button
                onClick={async () => {
                    const userData = await signInGoogle();
                    if (userData) {
                        signInHandler(userData.user);
                    }
                }}
            >
                구글 계정으로 로그인
            </button>
            <button
                onClick={async () => {
                    const userData = await signInGithub();
                    if (userData) {
                        signInHandler(userData.user);
                    }
                }}
            >
                깃허브 계정으로 로그인
            </button>
        </>
    );
};

export default SignIn;
