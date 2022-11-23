import React from "react";
import styled from "styled-components";
import { colorVariants } from "../Constants/colorVariants";

const StyledButton = styled.button<{ disabled: boolean }>`
    font-size: 20px;
    font-weight: bold;
    background-color: inherit;
    cursor: pointer;
    width: 100%;
    padding: 12px 20px;
    border: none;
    border-radius: 6px;
    &,
    &:hover,
    &:focus {
        background-color: ${colorVariants.mainColor};
    }
    &:disabled,
    &:disabled:hover,
    &:disabled:focus {
        color: gray;
        background-color: ${colorVariants.disabledColor};
        cursor: not-allowed;
    }
`;

type buttonData = {
    content: string;
    onClickFunction: React.MouseEventHandler<HTMLButtonElement>;
    disabled: boolean;
};

const Button = ({ disabled, content, onClickFunction }: buttonData) => {
    return (
        <StyledButton disabled={disabled} onClick={onClickFunction}>
            {content}
        </StyledButton>
    );
};

export default Button;
