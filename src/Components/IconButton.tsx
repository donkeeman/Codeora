import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { colorVariants } from "../Constants/colorVariants";

const IconButton = styled.button`
    position: absolute;
    top: 3px;
    right: 3px;
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
            top: 40px;
            left: 50%;
            transform: translateX(-50%);
            content: "복사";
            padding: 0 6px;
            color: ${colorVariants.white};
            border: 1px solid gray;
        }
    }
`;

type IconButtonData = {
    onClickFunction: React.MouseEventHandler<HTMLButtonElement>;
};

const CopyButton = ({ onClickFunction }: IconButtonData) => {
    return (
        <IconButton onClick={onClickFunction}>
            <FontAwesomeIcon icon={faCopy} size="xl" aria-hidden={true} />
            <span className="a11y-hidden">복사하기</span>
        </IconButton>
    );
};

export { CopyButton };
