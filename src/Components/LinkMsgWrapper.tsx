import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colorVariants } from "../Constants/colorVariants";

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

type linkData = {
    message: string;
    linkRoute: string;
    linkMessage: string;
};

const LinkMsgWrapper = ({ message, linkRoute, linkMessage }: linkData) => {
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
