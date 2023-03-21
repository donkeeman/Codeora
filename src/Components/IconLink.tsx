import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { colors } from "../Constants/colors";
import { IconLinkData } from "../Constants/types";

const LinkWrapper = styled(Link)<{
    $subMessage: string;
}>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    vertical-align: middle;
    background-color: transparent;
    border-radius: 6px;
    width: 100%;
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
            content: "${(props) => props.$subMessage}";
            white-space: nowrap;
            padding: 0 6px;
            color: ${colors.white};
            border: 1px solid gray;
        }
    }
`;

const IconLink = ({ to, icon, size, message, subMessage, replace }: IconLinkData) => {
    return (
        <LinkWrapper to={to} $subMessage={subMessage || message} replace={replace}>
            <FontAwesomeIcon
                icon={icon}
                size={size || "xl"}
                aria-hidden={true}
            />
            <span className="a11y-hidden">{message}</span>
        </LinkWrapper>
    );
};

export default IconLink;
