import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colorVariants } from "../Constants/colorVariants";
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
    border: 3px solid ${colorVariants.mainColor};
    background-color: ${colorVariants.mainColor};
    color: ${colorVariants.black};
    &.primary {
        border: 3px solid ${colorVariants.mainColor};
        background-color: ${colorVariants.mainColor};
        color: ${colorVariants.black};
        &:disabled,
        &:disabled:hover {
            border-color: ${colorVariants.gray};
            color: darkgray;
            background-color: ${colorVariants.gray};
            cursor: not-allowed;
        }
    }
    &.secondary {
        border: 3px solid ${colorVariants.mainColor};
        background-color: ${colorVariants.black};
        color: ${colorVariants.mainColor};
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
