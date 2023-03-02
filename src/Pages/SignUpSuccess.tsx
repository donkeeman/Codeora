import React from "react";
import styled from "styled-components";
import Title from "../Components/Title";
import ButtonLink from "../Components/ButtonLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmileWink } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../Constants/colors";

const SignUpSuccessWrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    max-width: 800px;
    margin: 0 auto;
    & > svg {
        margin: 60px 0 20px;
        color: ${colors.mainColor};
    }
`;

const WelcomeWrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -40%);
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
            <WelcomeWrapper>
                <FontAwesomeIcon icon={faSmileWink} size={"10x"} />
                <WelcomeMessage>코더라에 오신 걸 환영합니다.</WelcomeMessage>
                <WelcomeMessage>
                    로그인하여 코드를 저장해 보세요!
                </WelcomeMessage>
                <ButtonLink
                    disabled={false}
                    message="로그인하기"
                    to="/signin"
                />
            </WelcomeWrapper>
        </SignUpSuccessWrapper>
    );
};

export default SignUpSuccess;
