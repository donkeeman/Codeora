import React from "react";
import { useIsFetching } from "react-query";
import styled from "styled-components";
import { colorVariants } from "../Constants/colorVariants";

const LoadingWrapper = styled.div<{ isFetching: number }>`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: ${(props) => (props.isFetching ? "flex" : "none")};
    flex-direction: column;
    align-items: center;
    gap: 16px;
    z-index: 100;
`;

const SpinnerWrapper = styled.div`
    box-sizing: border-box;
    position: relative;
    width: 64px;
    height: 64px;
`;

const Spinner = styled.div<{ delay?: string }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 8px solid transparent;
    border-top-color: ${colorVariants.mainColor};
    animation: rotateCircle 1.2s ${(props) => props.delay || "0s"} ease-in-out
        infinite;

    @keyframes rotateCircle {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

const LoadingMessage = styled.p`
    font-size: 20px;
`;

const Loading = () => {
    const isFetching = useIsFetching();

    return (
        <LoadingWrapper isFetching={isFetching}>
            <SpinnerWrapper>
                <Spinner />
                <Spinner delay="-0.12s" />
                <Spinner delay="-0.3s" />
            </SpinnerWrapper>
            <LoadingMessage>불러오는 중...</LoadingMessage>
        </LoadingWrapper>
    );
};

export default Loading;
