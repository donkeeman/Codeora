import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { colors } from "../Constants/colors";
import { IconButtonData } from "../Constants/types";

const ButtonWrapper = styled.button<{
    subMessage?: string;
    fixWidth?: number;
}>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: transparent;
    border-radius: 6px;
    width: ${(props) => (props.fixWidth ? props.fixWidth + "px" : "100%")};
    height: 100%;
    &:focus-visible,
    &:hover {
        outline-style: none;
        color: ${colors.mainColor};
        &::after {
            position: absolute;
            background-color: ${colors.black};
            top: 110%;
            left: 50%;
            transform: translateX(-50%);
            content: "${(props) => props.subMessage}";
            white-space: nowrap;
            padding: 0 6px;
            color: ${colors.white};
            border: 1px solid gray;
        }
    }
`;

const IconButton = ({
    onClickFunction,
    icon,
    size,
    message,
    subMessage,
    fixWidth,
}: IconButtonData) => {
    return (
        <ButtonWrapper
            onClick={onClickFunction}
            subMessage={subMessage || message}
            fixWidth={fixWidth}
        >
            <FontAwesomeIcon
                icon={icon}
                size={size || "xl"}
                aria-hidden={true}
            />
            <span className="a11y-hidden">{message}</span>
        </ButtonWrapper>
    );
};

export default IconButton;
