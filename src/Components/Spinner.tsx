import React from "react";
import styled from "styled-components";
import { colors } from "../Constants/colors";

const SpinnerWrapper = styled.div`
    box-sizing: border-box;
    position: relative;
    width: 64px;
    height: 64px;
    margin: 0 auto;
`;

const SpinnerDiv = styled.div<{ delay?: string }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 8px solid transparent;
    border-top-color: ${colors.mainColor};
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
const Spinner = () => {
    return (
        <SpinnerWrapper>
            <SpinnerDiv />
            <SpinnerDiv delay="-0.12s" />
            <SpinnerDiv delay="-0.3s" />
        </SpinnerWrapper>
    );
};

export default Spinner;
