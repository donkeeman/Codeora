import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { currentUserState } from "../atoms";
import { FirebaseError } from "firebase/app";
import { signInEmail, signInGoogle, signInGithub } from "../Hooks/auth";
import styled from "styled-components";
import { regExps } from "../Constants/regExps";
import Button from "../Components/Button";
import CheckBox from "../Components/CheckBox";
import LinkMsgWrapper from "../Components/LinkMsgWrapper";
import StringInput from "../Components/StringInput";
import Title from "../Components/Title";

const SignInWrapper = styled.section`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 800px;
    gap: 20px;
`;

const CheckBoxWrapper = styled.div`
    display: flex;
    gap: 24px;
`;

const OrMessage = styled.p`
    position: relative;
    overflow: hidden;
    &::before,
    &::after {
        position: absolute;
        top: 50%;
        content: "";
        width: 50%;
        height: 2px;
        background-color: gray;
    }
    &::before {
        left: -20px;
    }
    &::after {
        right: -20px;
    }
`;

const SignIn = () => {
    const [signInData, setsignInData] = useState({ email: "", password: "" });
    const [signInError, setSignInError] = useState({ email: "", password: "" });

    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const setUserData = useSetRecoilState(currentUserState);
    const navigate = useNavigate();

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setsignInData({
            ...signInData,
            [event.target.id]: event.target.value,
        });
        setSignInError({ email: "", password: "" });
    };

    const signInHandler = async (signInType: string) => {
        let userData;
        try {
            switch (signInType) {
                case "email":
                    if (!regExps.email.test(signInData.email)) {
                        setSignInError({
                            ...signInError,
                            email: "이메일 형식이 올바르지 않습니다.",
                        });
                        emailRef.current?.focus();
                        return;
                    }
                    if (signInData.email && signInData.password) {
                        userData = await signInEmail(
                            signInData.email,
                            signInData.password
                        );
                    }
                    break;
                case "google":
                    userData = await signInGoogle();
                    break;
                case "github":
                    userData = await signInGithub();
                    break;
            }
        } catch (error) {
            if (error instanceof FirebaseError) {
                let errorMessage = "";
                switch (error.code) {
                    case "auth/internal-error":
                        errorMessage =
                            "서버가 응답하지 않습니다. 잠시 후 다시 시도해 주세요.";
                        break;
                    case "auth/user-not-found":
                        errorMessage = "존재하지 않는 이메일입니다.";
                        emailRef.current?.focus();
                        break;
                    case "auth/wrong-password":
                        errorMessage = "비밀번호가 일치하지 않습니다.";
                        passwordRef.current?.focus();
                        break;
                }
                setSignInError({
                    ...signInError,
                    password: errorMessage,
                });
                return;
            }
        }
        if (userData) {
            setUserData(userData.user);
        }
        navigate("/");
    };

    return (
        <SignInWrapper>
            <Title title="코더라에 오신 것을 환영합니다." />
            <StringInput
                type="email"
                id="email"
                labelName="이메일"
                innerRef={emailRef}
                message={signInError.email}
                onChangeFunction={inputHandler}
            />
            <StringInput
                type="password"
                id="password"
                labelName="비밀번호"
                innerRef={passwordRef}
                message={signInError.password}
                onChangeFunction={inputHandler}
            />
            <CheckBoxWrapper>
                <CheckBox id="saveEmail" labelName="이메일 저장" />
                <CheckBox id="persistLogin" labelName="로그인 유지" />
            </CheckBoxWrapper>
            <Button
                disabled={!(signInData.email && signInData.password)}
                content={"로그인"}
                onClickFunction={() => signInHandler("email")}
            />
            <OrMessage>또는</OrMessage>
            <Button
                disabled={false}
                content={"구글 계정으로 로그인"}
                onClickFunction={() => signInHandler("google")}
                social="google"
                backgroundColor="#4285F4"
            />
            <Button
                disabled={false}
                content={"깃허브 계정으로 로그인"}
                onClickFunction={() => signInHandler("github")}
                social="github"
                backgroundColor="black"
            />
            <LinkMsgWrapper
                message="계정이 없으신가요?"
                linkRoute="/signup"
                linkMessage="회원 가입"
            ></LinkMsgWrapper>
        </SignInWrapper>
    );
};

export default SignIn;
