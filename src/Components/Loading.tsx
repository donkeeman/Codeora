import React from "react";
import { useIsFetching } from "react-query";
import styled from "styled-components";
import Spinner from "./Spinner";

const LoadingWrapper = styled.div<{ isFetching: number }>`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: ${(props) => (props.isFetching ? "flex" : "none")};
    flex-direction: column;
    align-items: center;
    gap: 16px;
    z-index: 100;
`;

const LoadingMessage = styled.p`
    font-size: 20px;
`;

const Loading = () => {
    const isFetching = useIsFetching({
        predicate: (query) => query.state.status === "loading",
    });

    return (
        <LoadingWrapper isFetching={isFetching}>
            <Spinner />
            <LoadingMessage>불러오는 중...</LoadingMessage>
        </LoadingWrapper>
    );
};

export default Loading;
