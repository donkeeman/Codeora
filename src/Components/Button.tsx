import React from "react";
import styled from "styled-components";
import { colorVariants } from "../Constants/colorVariants";
import { iconPaths } from "../Constants/iconPaths";

const StyledButton = styled.button`
    position: relative;
    font-size: 20px;
    font-weight: bold;
    width: 100%;
    padding: 12px 20px;
    border: none;
    border-radius: 6px;
    &.primary {
        background-color: ${colorVariants.mainColor};
        color: ${colorVariants.black};
        &:disabled,
        &:disabled:hover,
        &:disabled:focus {
            color: darkgray;
            background-color: ${colorVariants.disabledColor};
            cursor: not-allowed;
        }
    }
    &.secondary {
        border: 2px solid ${colorVariants.mainColor};
        background-color: ${colorVariants.black};
        color: ${colorVariants.mainColor};
    }
    &.social {
        color: ${colorVariants.white};
        &.google {
            background-color: #4285f4;
        }
        &.github {
            background-color: black;
        }
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
    type?: string;
};

const Button = ({
    type = "primary",
    disabled,
    content,
    onClickFunction,
    social,
}: buttonData) => {
    return (
        <>
            <StyledButton
                className={[type, social].join(" ")}
                disabled={disabled}
                onClick={onClickFunction}
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
