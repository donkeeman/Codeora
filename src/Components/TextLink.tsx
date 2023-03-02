import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../Constants/colors";
import { TextLinkData } from "../Constants/types";

const LinkWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-size: 16px;
`;

const Text = styled(Link)`
    transition: all 0.2s ease;
    &,
    &:visited,
    &:hover {
        color: ${colors.mainColor};
        text-decoration: underline;
        font-size: 16px;
    }
    &:focus-visible {
        outline-style: none;
        font-size: 18px;
    }
`;

const TextLink = ({ message, linkRoute, linkMessage }: TextLinkData) => {
    return (
        <LinkWrapper>
            <p>{message}</p>
            <Text to={linkRoute}>{linkMessage}</Text>
        </LinkWrapper>
    );
};

export default TextLink;
