import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createAccount } from "../Hooks/auth";

const SignUp = () => {
    const email = useRef<HTMLInputElement | null>(null);
    const password = useRef<HTMLInputElement | null>(null);
    const confirmPassword = useRef<HTMLInputElement | null>(null);
    const userName = useRef<HTMLInputElement | null>(null);
    const profileImg = useRef<HTMLInputElement | null>(null);

    const navigate = useNavigate();

    const signUpHandler = async () => {
        if (email.current && password.current && userName.current) {
            await createAccount(
                email.current.value,
                password.current.value,
                userName.current.value,
                profileImg.current?.value
            );
            navigate("/login");
        }
    };

    return (
        <>
            <h2>회원 가입</h2>
            <input
                type="file"
                name="profileImg"
                id="profileImg"
                ref={profileImg}
            />
            <label htmlFor="email">이메일</label>
            <input type="text" name="email" id="email" ref={email} />
            <label htmlFor="password">비밀번호</label>
            <input
                type="password"
                name="password"
                id="password"
                ref={password}
            />
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                ref={confirmPassword}
            />
            <label htmlFor="userName">닉네임</label>
            <input type="text" name="userName" id="userName" ref={userName} />
            <button onClick={signUpHandler}>가입하기</button>
            <p>이미 계정이 있으신가요? </p>
            <Link to={"/signin"}>로그인</Link>
        </>
    );
};

export default SignUp;
