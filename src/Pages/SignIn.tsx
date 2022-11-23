import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { User } from "firebase/auth";
import { currentUserState } from "../atoms";
import { signInEmail, signInGoogle, signInGithub } from "../Hooks/auth";
import StringInput from "../Components/StringInput";

const SignIn = () => {
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
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
            <StringInput
                type="text"
                id="email"
                labelName="이메일"
                innerRef={emailRef}
                minLength={6}
                maxLength={20}
                message={""}
            />
            <span>@</span>
            <select>
                <option disabled selected>
                    메일 선택
                </option>
                <option value="gmail.com">gmail.com</option>
                <option value="naver.com">naver.com</option>
                <option value="kakao.com">kakao.com</option>
            </select>
            <StringInput
                type="password"
                id="password"
                labelName="비밀번호"
                innerRef={passwordRef}
                minLength={6}
                maxLength={20}
                message={"이메일 또는 비밀번호가 일치하지 않습니다."}
            />
            <button
                onClick={async () => {
                    if (emailRef.current && passwordRef.current) {
                        const userData = await signInEmail(
                            emailRef.current.value,
                            passwordRef.current.value
                        );
                        if (userData) {
                            signInHandler(userData.user);
                        }
                    }
                }}
            >
                로그인
            </button>
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
            <p>계정이 없으신가요? </p>
            <Link to={"/signup"}>회원 가입</Link>
        </>
    );
};

export default SignIn;
