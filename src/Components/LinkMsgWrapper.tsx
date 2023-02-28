import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colorVariants } from "../Constants/colorVariants";
import { TextLinkData } from "../Constants/types";

const LinkWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    .link {
        color: ${colorVariants.mainColor};
        text-decoration: underline;
        font-size: 16px;
    }
`;

const LinkMsgWrapper = ({ message, linkRoute, linkMessage }: TextLinkData) => {
    return (
        <LinkWrapper>
            <p>{message}</p>
            <Link className="link" to={linkRoute}>
                {linkMessage}
            </Link>
        </LinkWrapper>
    );
};

export default LinkMsgWrapper;
