import React from "react";
import styled from "styled-components";
import { colors } from "../Constants/colors";
import { iconPaths } from "../Constants/assetPath";
import { buttonData } from "../Constants/types";

const StyledButton = styled.button`
    position: relative;
    font-size: 20px;
    font-weight: bold;
    width: 100%;
    padding: 12px 20px;
    border: none;
    border-radius: 6px;
    transition: all 0.2s ease;
    &.primary {
        border: 3px solid ${colors.mainColor};
        background-color: ${colors.mainColor};
        color: ${colors.black};
        &:disabled,
        &:disabled:hover {
            border-color: ${colors.gray};
            color: darkgray;
            background-color: ${colors.gray};
            cursor: not-allowed;
        }
    }
    &.secondary {
        border: 3px solid ${colors.mainColor};
        background-color: ${colors.black};
        color: ${colors.mainColor};
    }
    &.social {
        color: ${colors.white};
        &.google {
            background-color: #4285f4;
        }
        &.github {
            background-color: black;
        }
    }
    &:focus-visible {
        outline-style: none;
        font-size: 22px;
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

const Button = ({
    type = "primary",
    disabled,
    message,
    onClickFunction,
    social,
}: buttonData) => {
    return (
        <>
            <StyledButton
                className={[type, social].join(" ").trim()}
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
                {message}
            </StyledButton>
        </>
    );
};

export default Button;
