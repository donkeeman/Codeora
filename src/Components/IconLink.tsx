import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { colorVariants } from "../Constants/colorVariants";
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
    width: 48px;
    height: 48px;
    &:focus-visible,
    &:hover {
        outline-style: none;
        color: ${colorVariants.mainColor};
        &::after {
            position: absolute;
            background-color: ${colorVariants.black};
            top: 40px;
            left: 50%;
            transform: translateX(-50%);
            content: "${(props) => props.$subMessage}";
            white-space: nowrap;
            padding: 0 6px;
            color: ${colorVariants.white};
            border: 1px solid gray;
        }
    }
`;

const IconLink = ({ to, icon, size, message, subMessage }: IconLinkData) => {
    return (
        <LinkWrapper to={to} $subMessage={subMessage || message}>
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
