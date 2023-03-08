import React from "react";
import styled from "styled-components";
import Title from "../Components/Title";
import Button from "../Components/Button";
import ButtonLink from "../Components/ButtonLink";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSurprise } from "@fortawesome/free-solid-svg-icons";

const NotfoundWrapper = styled.section`
    max-width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin: 0 auto;
`;

const ErrorWrapper = styled.div`
    width: 100%;
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    gap: 40px;
`;

const LinkWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
`;

const ErrorMessage = styled.p`
    font-size: 20px;
`;

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <NotfoundWrapper>
            <Title title="404" />
            <ErrorWrapper>
                <FontAwesomeIcon icon={faSurprise} size={"10x"} />
                <ErrorMessage>페이지를 찾을 수 없습니다.</ErrorMessage>
                <LinkWrapper>
                    <ButtonLink
                        disabled={false}
                        message="메인 페이지로 돌아가기"
                        to="/"
                    />
                    <Button
                        disabled={false}
                        onClickFunction={() => navigate(-1)}
                        message="이전 페이지로 돌아가기"
                    />
                </LinkWrapper>
            </ErrorWrapper>
        </NotfoundWrapper>
    );
};

export default NotFound;
