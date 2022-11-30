import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAccount } from "../Hooks/auth";
import styled from "styled-components";
import Button from "../Components/Button";
import LinkMsgWrapper from "../Components/LinkMsgWrapper";
import StringInput from "../Components/StringInput";
import Title from "../Components/Title";

const SignUpWrapper = styled.section`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 800px;
    gap: 20px;
`;

const SignUp = () => {
    const [signUpData, setSignUpData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        userName: "",
        profileImg: "",
    });

    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
    const userNameRef = useRef<HTMLInputElement | null>(null);
    const profileImgRef = useRef<HTMLInputElement | null>(null);

    const navigate = useNavigate();

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpData({ ...signUpData, [event.target.id]: event.target.value });
    };

    const signUpHandler = async () => {
        if (emailRef.current && passwordRef.current && userNameRef.current) {
            await createAccount(
                emailRef.current.value,
                passwordRef.current.value,
                userNameRef.current.value,
                profileImgRef.current?.value
            );
            navigate("/login");
        }
    };

    return (
        <SignUpWrapper>
            <Title title="코더라에 가입하여 나의 코드를 저장해 보세요." />
            <input
                type="file"
                name="profileImg"
                id="profileImg"
                ref={profileImgRef}
            />
            <StringInput
                type="text"
                id="userName"
                labelName="닉네임 (2~10자 사이의 한글, 영어 및 숫자)"
                innerRef={userNameRef}
                message={
                    "2~10자 사이의 한글, 영어 및 숫자의 조합만 가능합니다."
                }
                onChangeFunction={inputHandler}
            />
            <StringInput
                type="email"
                id="email"
                labelName="이메일"
                innerRef={emailRef}
                message={""}
                onChangeFunction={inputHandler}
            />
            <StringInput
                type="password"
                id="password"
                labelName="비밀번호 (6~20자 사이의 영어 대소문자, 숫자 및 특수 기호)"
                innerRef={passwordRef}
                message={
                    "6~20자 사이의 영어 대소문자, 숫자 및 특수 기호의 조합만 가능합니다."
                }
                onChangeFunction={inputHandler}
            />
            <StringInput
                type="confirmPassword"
                id="confirmPassword"
                labelName="비밀번호 확인"
                innerRef={confirmPasswordRef}
                message={"비밀번호가 일치하지 않습니다."}
                onChangeFunction={inputHandler}
            />
            <Button
                disabled={
                    !(
                        signUpData.email &&
                        signUpData.password &&
                        signUpData.userName
                    ) || signUpData.password !== signUpData.confirmPassword
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
