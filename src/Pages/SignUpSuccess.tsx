import React from "react";
import styled from "styled-components";
import Title from "../Components/Title";
import ButtonLink from "../Components/ButtonLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmileWink } from "@fortawesome/free-solid-svg-icons";

const SignUpSuccessWrapper = styled.section`
    max-width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin: 0 auto;
`;

const WelcomeWrapper = styled.div`
    width: 100%;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    p:nth-of-type(2) {
        margin-top: -20px;
    }
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
            <WelcomeWrapper>
                <FontAwesomeIcon icon={faSmileWink} size={"10x"} />
                <WelcomeMessage>코더라에 오신 걸 환영합니다.</WelcomeMessage>
                <WelcomeMessage>
                    로그인하여 코드를 저장해 보세요!
                </WelcomeMessage>
                <ButtonLink message="로그인하기" to="/signin" />
            </WelcomeWrapper>
        </SignUpSuccessWrapper>
    );
};

export default SignUpSuccess;
