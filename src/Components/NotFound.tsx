import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";
import ButtonLink from "./ButtonLink";

const NotfoundWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const ErrorMessage = styled.p`
    font-size: 20px;
`;

const LinkWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
`;

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <NotfoundWrapper>
            <ErrorMessage>페이지를 찾을 수 없습니다.</ErrorMessage>
            <LinkWrapper>
                <ButtonLink disabled={false} message="메인 페이지" to="/" />
                <Button
                    disabled={false}
                    onClickFunction={() => navigate(-1)}
                    message="이전 페이지"
                />
            </LinkWrapper>
        </NotfoundWrapper>
    );
};

export default NotFound;
