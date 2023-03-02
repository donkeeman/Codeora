import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { colorVariants } from "../Constants/colorVariants";
import { IconButtonData } from "../Constants/types";

const ButtonWrapper = styled.button<{
    subMessage?: string;
}>`
    position: relative;
    background-color: transparent;
    border-radius: 6px;
    width: 48px;
    height: 48px;
    &:focus-visible,
    &:hover {
        outline-style: none;
        color: ${colorVariants.mainColor};
        &::after {
            position: absolute;
            background-color: ${colorVariants.black};
            bottom: -30%;
            left: 50%;
            transform: translateX(-50%);
            content: "${(props) => props.subMessage}";
            padding: 0 6px;
            color: ${colorVariants.white};
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
}: IconButtonData) => {
    return (
        <ButtonWrapper
            onClick={onClickFunction}
            subMessage={subMessage || message}
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
