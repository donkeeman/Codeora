import React from "react";
import styled from "styled-components";
import { backgroundPath } from "../Constants/assetPath";
import { colors } from "../Constants/colors";
import { languageMap } from "../Constants/languageMap";
import { variables } from "../Constants/variables";
import ButtonLink from "../Components/ButtonLink";

const LandingPage = styled.section`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background: url(${process.env.PUBLIC_URL + backgroundPath}) no-repeat center;
    background-size: cover;
    padding: 60px 5% 30px;
    &::before {
        position: fixed;
        top: 0;
        left: 0;
        content: "";
        width: 100%;
        height: 100%;
        opacity: 0.9;
        background-color: ${colors.black};
    }
    @media screen and (max-width: ${variables.MEDIA_FIRST_WIDTH}px) {
        flex-direction: column;
        justify-content: center;
        gap: 10px;
    }
`;

const LandingWrapper = styled.div<{ delay?: string }>`
    animation: 2s ${(props) => props.delay || "0s"} fadeIn ease-in-out 1
        forwards;
    opacity: 0;
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const LandingMessage = styled.p`
    margin: 8px 0;
    &.big {
        font-size: 60px;
        text-align: left;
    }
    &.small {
        font-size: 20px;
    }
`;

const Landing = () => {
    return (
        <LandingPage>
            <LandingWrapper>
                <LandingMessage className="big">당신의</LandingMessage>
                <LandingMessage className="big">코드를</LandingMessage>
                <LandingMessage className="big">저장해 보세요.</LandingMessage>
            </LandingWrapper>
            <LandingWrapper delay="1s">
                <LandingMessage className="small">
                    코더라는 간단하고 짧은 코드를 저장하는 용도로
                    제작되었습니다.
                </LandingMessage>
                <LandingMessage className="small">
                    현재 총 {languageMap.size}개의 언어를 지원하고 있습니다.
                </LandingMessage>
                <LandingMessage className="small">
                    자주 사용하거나 기억해두고 싶은 코드가 있다면,
                </LandingMessage>
                <LandingMessage className="small">
                    코더라를 이용해 보세요.
                </LandingMessage>
                <ButtonLink to="/signin" message="시작하기" />
            </LandingWrapper>
        </LandingPage>
    );
};

export default Landing;
