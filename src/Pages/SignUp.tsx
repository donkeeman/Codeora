import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { createAccount } from "../Hooks/auth";
import styled from "styled-components";
import Button from "../Components/Button";
import LinkMsgWrapper from "../Components/LinkMsgWrapper";
import StringInput from "../Components/StringInput";
import Title from "../Components/Title";
import { regExps } from "../Constants/regExps";

const SignUpWrapper = styled.section`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 0 auto;
    gap: 20px;
`;

const SignUp = () => {
    const [signUpData, setSignUpData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        userName: "",
    });
    const [signUpError, setSignUpError] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        userName: "",
    });

    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
    const userNameRef = useRef<HTMLInputElement | null>(null);

    const navigate = useNavigate();

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpData({ ...signUpData, [event.target.id]: event.target.value });
        setSignUpError({
            email: "",
            password: "",
            confirmPassword: "",
            userName: "",
        });
    };

    const signUpHandler = async () => {
        if (!regExps.userName.test(signUpData.userName)) {
            setSignUpError({
                ...signUpError,
                userName:
                    "닉네임은 2~10자 사이의 한글, 영어 대소문자, 숫자 및 언더바 ( _ ) 의 조합만 가능합니다.",
            });
            userNameRef.current?.focus();
            return;
        }
        if (!regExps.email.test(signUpData.email)) {
            setSignUpError({
                ...signUpError,
                email: "이메일 형식이 올바르지 않습니다.",
            });
            emailRef.current?.focus();
            return;
        }
        if (!regExps.password.test(signUpData.password)) {
            setSignUpError({
                ...signUpError,
                password:
                    "비밀번호는 6~20자 사이의 영어 대소문자, 숫자, 특수 기호 ( . ! # $ % & ' * + - / = ? ^ _ ` { | } ~ ) 의 조합만 가능합니다.",
            });
            passwordRef.current?.focus();
            return;
        } else if (signUpData.password !== signUpData.confirmPassword) {
            setSignUpError({
                ...signUpError,
                confirmPassword: "비밀번호가 일치하지 않습니다.",
            });
            confirmPasswordRef.current?.focus();
            return;
        }
        try {
            if (
                !signUpError.email &&
                !signUpError.password &&
                !signUpError.confirmPassword &&
                !signUpError.userName
            ) {
                await createAccount(
                    signUpData.email,
                    signUpData.password,
                    signUpData.userName
                );
                navigate("/signup-success");
            }
        } catch (error) {
            if (error instanceof FirebaseError) {
                let errorMessage = "";
                switch (error.code) {
                    case "auth/email-already-in-use":
                        errorMessage = "이미 존재하는 이메일입니다.";
                        break;
                }
                setSignUpError({ ...signUpError, email: errorMessage });
            }
        }
    };

    return (
        <SignUpWrapper>
            <Title
                title="회원 가입"
                subTitle="코더라에 가입하여 나의 코드를 저장해 보세요."
            />
            <StringInput
                type="email"
                id="email"
                labelName="이메일"
                innerRef={emailRef}
                message={signUpError.email}
                onChangeFunction={inputHandler}
            />
            <StringInput
                type="password"
                id="password"
                labelName="비밀번호 (6~20자 사이의 영어 대소문자, 숫자 및 특수 기호)"
                innerRef={passwordRef}
                message={signUpError.password}
                onChangeFunction={inputHandler}
            />
            <StringInput
                type="password"
                id="confirmPassword"
                labelName="비밀번호 확인"
                innerRef={confirmPasswordRef}
                message={signUpError.confirmPassword}
                onChangeFunction={inputHandler}
            />
            <StringInput
                type="text"
                id="userName"
                labelName="닉네임 (2~10자 사이의 한글, 영어 대소문자, 숫자 및 언더바 ( _ ))"
                innerRef={userNameRef}
                message={signUpError.userName}
                onChangeFunction={inputHandler}
            />
            <Button
                disabled={
                    !(
                        signUpData.email &&
                        signUpData.password &&
                        signUpData.confirmPassword &&
                        signUpData.userName
                    )
                }
                content="가입하기"
                onClickFunction={signUpHandler}
            />
            <LinkMsgWrapper
                message="이미 계정이 있으신가요?"
                linkRoute="/signin"
                linkMessage="로그인"
            />
        </SignUpWrapper>
    );
};

export default SignUp;
