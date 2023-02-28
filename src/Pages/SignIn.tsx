import React, { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
    currentUserState,
    persistLoginState,
    savedEmailState,
} from "../Configs/atoms";
import { FirebaseError } from "firebase/app";
import { signInEmail, signInGoogle, signInGithub } from "../Services/auth";
import styled from "styled-components";
import { regExps } from "../Constants/regExps";
import Button from "../Components/Button";
import CheckBox from "../Components/CheckBox";
import LinkMsgWrapper from "../Components/TextLink";
import StringInput from "../Components/TextInput";
import Title from "../Components/Title";
import { LoginData } from "../Constants/types";
import { variables } from "../Constants/variables";

const SignInWrapper = styled.section`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 0 auto;
    gap: 20px;
    @media screen and (max-width: ${variables.MEDIA_FIRST_WIDTH}px) {
        width: 90%;
    }
    @media screen and (max-width: ${variables.MEDIA_SECOND_WIDTH}px) {
        width: 100%;
    }
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
    const [signInData, setsignInData] = useState<LoginData>({
        email: "",
        password: "",
    });
    const [signInError, setSignInError] = useState<LoginData>({
        email: "",
        password: "",
    });
    const [persistLogin, setPersistLogin] = useState(false);
    const [saveEmail, setSaveEmail] = useState(false);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const [userData, setUserData] = useRecoilState(currentUserState);
    const [savedEmailData, setSavedEmailData] = useRecoilState(savedEmailState);
    const setPersistLoginData = useSetRecoilState(persistLoginState);
    const navigate = useNavigate();

    useEffect(() => {
        if (savedEmailData) {
            setSaveEmail(true);
            setsignInData({ email: savedEmailData, password: "" });
        }
    }, [savedEmailData]);

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setsignInData({
            ...signInData,
            [event.target.id]: event.target.value,
        });
        setSignInError({ email: "", password: "" });
    };

    const persistLoginHandler = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPersistLogin(event.target.checked);
    };

    const saveEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (emailRef.current) {
            setSaveEmail(event.target.checked);
        }
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
                    setPersistLogin(true);
                    break;
                case "github":
                    userData = await signInGithub();
                    setPersistLogin(true);
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
            setSavedEmailData(saveEmail ? signInData.email : undefined);
            setPersistLoginData(persistLogin ? userData.user : undefined);
        }
        navigate("/");
    };

    return userData ? (
        <Navigate to="/" />
    ) : (
        <SignInWrapper>
            <Title title="로그인" subTitle="코더라에 오신 것을 환영합니다." />
            <StringInput
                type="email"
                id="email"
                labelName="이메일"
                innerRef={emailRef}
                message={signInError.email}
                onChangeFunction={inputHandler}
                defaultValue={savedEmailData && savedEmailData}
            />
            <StringInput
                type="password"
                id="password"
                labelName="비밀번호"
                innerRef={passwordRef}
                message={signInError.password}
                onChangeFunction={inputHandler}
                onKeyDownFunction={(event) => {
                    if (event.key === "Enter") {
                        signInHandler("email");
                    }
                }}
            />
            <CheckBoxWrapper>
                <CheckBox
                    id="saveEmail"
                    labelName="이메일 저장"
                    onChangeFunction={saveEmailHandler}
                    checked={saveEmail}
                />
                <CheckBox
                    id="persistLogin"
                    labelName="로그인 유지"
                    onChangeFunction={persistLoginHandler}
                />
            </CheckBoxWrapper>
            <Button
                disabled={!(signInData.email && signInData.password)}
                content={"로그인"}
                onClickFunction={() => signInHandler("email")}
            />
            <OrMessage>또는</OrMessage>
            <Button
                type="social"
                disabled={false}
                content={"구글 계정으로 로그인"}
                onClickFunction={() => signInHandler("google")}
                social="google"
            />
            <Button
                type="social"
                disabled={false}
                content={"깃허브 계정으로 로그인"}
                onClickFunction={() => signInHandler("github")}
                social="github"
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
