import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Title from "../Components/Title";
import Button from "../Components/Button";

const SignUpSuccessWrapper = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;
`;

const WelcomeMessage = styled.p`
    font-size: 20px;
`;

const SignUpSuccess = () => {
    const navigate = useNavigate();
    return (
        <SignUpSuccessWrapper>
            <Title
                title="회원 가입 완료"
                subTitle="회원 가입이 성공적으로 완료되었습니다."
            />
            {/* 이미지 첨부 */}
            <WelcomeMessage>
                코더라를 이용하실 수 있습니다.
                <br />
                로그인하여 코드를 저장해 보세요!
            </WelcomeMessage>
            <Button
                disabled={false}
                content="로그인하기"
                onClickFunction={() => navigate("/signin")}
            />
        </SignUpSuccessWrapper>
    );
};

export default SignUpSuccess;
