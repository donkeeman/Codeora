import React from "react";
import styled from "styled-components";
import Title from "../Components/Title";
import ButtonLink from "../Components/ButtonLink";

const SignUpSuccessWrapper = styled.section`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const WelcomeMessage = styled.p`
    font-size: 20px;
`;

const SignUpSuccess = () => {
    return (
        <SignUpSuccessWrapper>
            <Title
                title="회원 가입 완료"
                subTitle="회원 가입이 성공적으로 완료되었습니다."
            />
            {/* 이미지 첨부 */}
            <WelcomeMessage>코더라에 오신 걸 환영합니다.</WelcomeMessage>
            <WelcomeMessage>로그인하여 코드를 저장해 보세요!</WelcomeMessage>
            <ButtonLink disabled={false} message="로그인하기" to="/signin" />
        </SignUpSuccessWrapper>
    );
};

export default SignUpSuccess;
