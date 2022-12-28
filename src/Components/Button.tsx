import React from "react";
import styled from "styled-components";
import { colorVariants } from "../Constants/colorVariants";
import { iconPaths } from "../Constants/iconPaths";

const StyledButton = styled.button<{
    backgroundColor: string;
}>`
    position: relative;
    font-size: 20px;
    font-weight: bold;
    background-color: inherit;
    width: 100%;
    padding: 12px 20px;
    border: none;
    border-radius: 6px;
    &,
    &:hover,
    &:focus {
        background-color: ${(props) =>
            props.backgroundColor || colorVariants.mainColor};
    }
    &:disabled,
    &:disabled:hover,
    &:disabled:focus {
        color: darkgray;
        background-color: ${colorVariants.disabledColor};
        cursor: not-allowed;
    }
    .icon {
        width: 52px;
        height: 52px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
    }
`;

type buttonData = {
    content: string;
    onClickFunction: React.MouseEventHandler<HTMLButtonElement>;
    disabled: boolean;
    social?: string;
    backgroundColor?: string;
};

const Button = ({
    disabled,
    content,
    onClickFunction,
    social,
    backgroundColor,
}: buttonData) => {
    return (
        <>
            <StyledButton
                disabled={disabled}
                onClick={onClickFunction}
                backgroundColor={backgroundColor!}
            >
                {social && (
                    <img
                        className="icon"
                        src={
                            process.env.PUBLIC_URL +
                            iconPaths[social as keyof typeof iconPaths]
                        }
                        alt={social + "Login"}
                    />
                )}
                {content}
            </StyledButton>
        </>
    );
};

export default Button;
