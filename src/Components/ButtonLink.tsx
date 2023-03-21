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

const ButtonLink = ({ type = "primary", to, message, replace }: linkData) => {
    return (
        <StyledLink className={type} to={to} replace={replace}>
            {message}
        </StyledLink>
    );
};

export default ButtonLink;
