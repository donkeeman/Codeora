import React from "react";
import styled from "styled-components";
import Title from "../Components/Title";
import Button from "../Components/Button";
import ButtonLink from "../Components/ButtonLink";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSurprise } from "@fortawesome/free-solid-svg-icons";
import { colorVariants } from "../Constants/colorVariants";

const NotfoundWrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 800px;
    margin: 0 auto;
    gap: 20px;
    & > svg {
        margin: 60px 0 20px;
        color: ${colorVariants.mainColor};
    }
`;

const ErrorWrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -40%);
    display: flex;
    flex-direction: column;
    gap: 20px;
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
            <Title title="404" subTitle="페이지를 찾을 수 없습니다." />
            <ErrorWrapper>
                <FontAwesomeIcon icon={faSurprise} size={"10x"} />
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
