import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../Constants/colors";
import { linkData } from "../Constants/types";

const StyledLink = styled(Link)`
    display: block;
    font-size: 20px;
    font-weight: bold;
    width: 100%;
    padding: 12px 20px;
    border: none;
    border-radius: 6px;
    transition: all 0.2s ease;
    border: 3px solid ${colors.mainColor};
    background-color: ${colors.mainColor};
    color: ${colors.black};
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
    &:focus-visible {
        outline-style: none;
        font-size: 22px;
    }
`;

const ButtonLink = ({ type, to, message }: linkData) => {
    return (
        <StyledLink className={type} to={to}>
            {message}
        </StyledLink>
    );
};

export default ButtonLink;
