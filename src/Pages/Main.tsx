import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { useInfiniteQuery } from "react-query";
import {
    collection,
    DocumentData,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
} from "firebase/firestore";
import styled from "styled-components";
import {
    faArrowDownShortWide,
    faArrowUpShortWide,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import CodeCard from "../Components/CodeCard";
import IconButton from "../Components/IconButton";
import Spinner from "../Components/Spinner";
import { currentUserState } from "../Configs/atoms";
import { db } from "../Configs/firebase";
import { queryClient } from "../Configs/queryClient";
import { backgroundPath } from "../Constants/assetPath";
import { colors } from "../Constants/colors";
import { languageMap } from "../Constants/languageMap";
import { queryKeys } from "../Constants/queryKeys";
import { orderData } from "../Constants/types";
import { variables } from "../Constants/variables";
import ButtonLink from "../Components/ButtonLink";

const MainWrapper = styled.section`
    width: 100%;
    &.notLogin {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        background: url(${process.env.PUBLIC_URL + backgroundPath}) no-repeat
            center;
        background-size: cover;
        padding: 30px 5%;
        &::before {
            position: absolute;
            top: 0;
            left: 0;
            content: "";
            width: 100%;
            height: 100%;
            opacity: 0.9;
            background-color: ${colors.black};
            z-index: -10;
        }
        @media screen and (max-width: ${variables.MEDIA_SECOND_WIDTH}px) {
            flex-direction: column;
        }
    }
`;

const QueryWrapper = styled.div`
    width: 80%;
    display: flex;
    margin: 0px auto 10px;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: ${variables.MEDIA_FIRST_WIDTH}px) {
        justify-content: center;
        gap: 20px;
    }
    @media screen and (max-width: ${variables.MEDIA_SECOND_WIDTH}px) {
        flex-direction: column;
    }
`;

const OrderWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const SearchWrapper = styled.div`
    display: flex;
    border: 3px solid gray;
    border-radius: 6px;
    padding: 6px 4px;
    &:focus-within {
        border: 3px solid ${colors.mainColor};
    }
`;

const SearchInput = styled.input`
    text-align: left;
    outline-style: none;
    position: relative;
    &::-webkit-search-cancel-button {
        -webkit-appearance: none;
    }
`;

const CodeList = styled.ol`
    display: grid;
    grid-template-columns: repeat(4, 230px);
    justify-content: center;
    justify-items: stretch;
    gap: 8px;
    @media screen and (max-width: ${variables.MAX_WIDTH}px) {
        grid-template-columns: repeat(3, 230px);
    }
    @media screen and (max-width: ${variables.MEDIA_FIRST_WIDTH}px) {
        grid-template-columns: repeat(2, 230px);
    }
    @media screen and (max-width: ${variables.MEDIA_SECOND_WIDTH}px) {
        display: flex;
        flex-direction: column;
    }
`;

const ObserveLi = styled.li`
    width: 100%;
    height: fit-content;
    grid-column: 1 / span 4;
    @media screen and (max-width: ${variables.MAX_WIDTH}px) {
        grid-column: 1 / span 3;
    }
    @media screen and (max-width: ${variables.MEDIA_FIRST_WIDTH}px) {
        grid-column: 1 / span 2;
    }
`;

const NoCodeWrapper = styled.div`
    width: fit-content;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const NoCodeMessage = styled.p`
    font-size: 20px;
    margin: 20px auto;
`;

const LandingWrapper = styled.div<{ delay?: string }>`
    animation: 2s ${(props) => props.delay || "0s"} fadeIn ease-in-out 1
        forwards;
    opacity: 0;
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const LandingMessage = styled.p`
    margin: 8px 0;
    &.big {
        font-size: 64px;
        text-align: left;
    }
    &.small {
        font-size: 20px;
    }
`;

const Main = () => {
    const [orderData, setOrderData] = useState<orderData>({
        fieldPath: "timestamp",
        isDesc: true,
    });
    const observeTargetRef = useRef(null);
    const userData = useRecoilValue(currentUserState);

    const getCodeList = async (pageParam: DocumentData | undefined) => {
        if (userData) {
            const codeQuery = pageParam
                ? query(
                      collection(db, `user/${userData.uid}/codes`),
                      orderBy(
                          orderData.fieldPath,
                          orderData.isDesc ? "desc" : "asc"
                      ),
                      limit(variables.CODE_LIMIT),
                      startAfter(pageParam)
                  )
                : query(
                      collection(db, `user/${userData.uid}/codes`),
                      orderBy(
                          orderData.fieldPath,
                          orderData.isDesc ? "desc" : "asc"
                      ),
                      limit(variables.CODE_LIMIT)
                  );
            const codeSnapshot = await getDocs(codeQuery);
            return {
                data: codeSnapshot.docs,
                size: codeSnapshot.size,
                lastDocument: codeSnapshot.docs[codeSnapshot.docs.length - 1],
            };
        }
    };

    const {
        data: codeList = null,
        hasNextPage,
        fetchNextPage,
        refetch,
    } = useInfiniteQuery(
        queryKeys.code,
        ({ pageParam }) => getCodeList(pageParam),
        {
            enabled: userData !== undefined,
            getNextPageParam: (lastPage) =>
                lastPage &&
                (lastPage?.size < 12 ? null : lastPage.lastDocument),
        }
    );

    const directionHandler = async () => {
        setOrderData({
            ...orderData,
            isDesc: !orderData.isDesc,
        });
        await queryClient.cancelQueries({
            queryKey: queryKeys.code,
        });
        refetch();
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            async ([entry], observer) => {
                observer.unobserve(entry.target);
                if (entry.isIntersecting && hasNextPage) {
                    await fetchNextPage();
                }
                observer.observe(entry.target);
            },
            { threshold: 0.5 }
        );
        if (observeTargetRef.current) {
            observer.observe(observeTargetRef.current);
        }
    }, [observeTargetRef, hasNextPage, fetchNextPage]);

    return (
        <MainWrapper className={userData ? "" : "notLogin"}>
            {userData ? (
                codeList &&
                (codeList.pages[0]?.data.length! > 0 ? (
                    <>
                        <QueryWrapper>
                            <OrderWrapper>
                                정렬 기준
                                <select id="fleidPath">
                                    <option value="timestamp">
                                        최종 수정일
                                    </option>
                                    <option value="title">제목</option>
                                    <option value="language">언어</option>
                                </select>
                                <IconButton
                                    icon={
                                        orderData.isDesc
                                            ? faArrowDownShortWide
                                            : faArrowUpShortWide
                                    }
                                    message={
                                        orderData.isDesc
                                            ? "내림차순"
                                            : "오름차순"
                                    }
                                    onClickFunction={directionHandler}
                                    fixWidth={24}
                                />
                            </OrderWrapper>
                            <SearchWrapper>
                                <SearchInput type="search" name="searchInput" />
                                <IconButton
                                    icon={faSearch}
                                    message="검색"
                                    onClickFunction={() => {}}
                                />
                            </SearchWrapper>
                        </QueryWrapper>

                        <CodeList>
                            <>
                                {codeList.pages.map((page) => {
                                    const codePage = page?.data;
                                    return codePage?.map((doc) => {
                                        const codeData = doc.data();
                                        return (
                                            <li key={doc.id} className="card">
                                                <CodeCard
                                                    id={doc.id}
                                                    title={codeData.title}
                                                    description={
                                                        codeData.description
                                                    }
                                                    tags={codeData.tag}
                                                    language={codeData.language}
                                                    date={codeData.timestamp.toDate()}
                                                />
                                            </li>
                                        );
                                    });
                                })}
                                {hasNextPage && (
                                    <ObserveLi ref={observeTargetRef}>
                                        <Spinner />
                                    </ObserveLi>
                                )}
                            </>
                        </CodeList>
                    </>
                ) : (
                    <NoCodeWrapper>
                        <NoCodeMessage>저장된 코드가 없습니다.</NoCodeMessage>
                        <NoCodeMessage>코드를 작성해 보세요!</NoCodeMessage>
                        <ButtonLink message={"코드 작성하기"} to="/write" />
                    </NoCodeWrapper>
                ))
            ) : (
                <>
                    <LandingWrapper>
                        <LandingMessage className="big">당신의</LandingMessage>
                        <LandingMessage className="big">코드를</LandingMessage>
                        <LandingMessage className="big">
                            저장해 보세요.
                        </LandingMessage>
                    </LandingWrapper>
                    <LandingWrapper delay="1s">
                        <LandingMessage className="small">
                            코더라는 간단하고 짧은 코드를 저장하는 용도로
                            제작되었습니다.
                        </LandingMessage>
                        <LandingMessage className="small">
                            현재 총 {languageMap.size}개의 언어를 지원하고
                            있습니다.
                        </LandingMessage>
                        <LandingMessage className="small">
                            자주 사용하거나 기억해두고 싶은 코드가 있다면,
                        </LandingMessage>
                        <LandingMessage className="small">
                            코더라를 이용해 보세요.
                        </LandingMessage>
                        <ButtonLink to="/signin" message="시작하기" />
                    </LandingWrapper>
                </>
            )}
        </MainWrapper>
    );
};

export default Main;
