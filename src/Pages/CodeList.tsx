import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components";
import {
    collection,
    DocumentData,
    getDocs,
    limit,
    orderBy,
    query,
    QueryConstraint,
    startAfter,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowDownShortWide,
    faArrowUpShortWide,
    faCircleExclamation,
    faCircleXmark,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import CodeCard from "../Components/CodeCard";
import IconButton from "../Components/IconButton";
import Spinner from "../Components/Spinner";
import ButtonLink from "../Components/ButtonLink";
import { currentUserState } from "../Configs/atoms";
import { currentOrderState } from "../Configs/atoms";
import { db } from "../Configs/firebase";
import { queryClient } from "../Configs/queryClient";
import { backgroundPath } from "../Constants/assetPath";
import { colors } from "../Constants/colors";
import { queryKeys } from "../Constants/queryKeys";
import { variables } from "../Constants/variables";

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
    margin: 0px auto 12px;
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
    gap: 6px;
`;

const QuerySelect = styled.select`
    text-align: center;
    font-size: 16px;
    border-bottom: 2px solid transparent;
    padding: 2px 0;
    &:focus-visible {
        outline-style: none;
        border-bottom-color: ${colors.mainColor};
    }
`;

const SearchWrapper = styled.div`
    display: flex;
    padding: 6px 4px;
    gap: 6px;
`;

const SearchInputWrapper = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 2px solid gray;
    &:focus-within {
        border-bottom-color: ${colors.mainColor};
    }
`;

const SearchInput = styled.input`
    text-align: left;
    position: relative;
    font-size: 16px;
    padding: 2px 4px;
    &::-webkit-search-cancel-button {
        -webkit-appearance: none;
    }
    &:focus-visible {
        outline-style: none;
    }
`;

const List = styled.ol`
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
    gap: 10px;
`;

const NoCodeMessage = styled.p`
    font-size: 20px;
    margin: 20px auto;
`;

const CodeList = () => {
    const [filterData, setFilterData] = useState({
        fieldPath: "title",
        text: "",
    });
    const [orderData, setOrderData] = useRecoilState(currentOrderState);
    const userData = useRecoilValue(currentUserState);
    const observeTargetRef = useRef(null);
    const searchSelectRef = useRef<HTMLSelectElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const getCodeList = async (pageParam: DocumentData | undefined) => {
        if (userData) {
            const queryOptions: QueryConstraint[] = [
                orderBy(orderData.fieldPath, orderData.isDesc ? "desc" : "asc"),
                limit(variables.CODE_LIMIT),
            ];
            pageParam && queryOptions.push(startAfter(pageParam));
            const codeQuery = query(
                collection(db, `user/${userData.uid}/codes`),
                ...queryOptions
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
                (lastPage?.size < variables.CODE_LIMIT
                    ? null
                    : lastPage.lastDocument),
            select: (codeList) => ({
                pageParams: codeList.pageParams,
                pages: codeList.pages.map((page) => {
                    const filteredPageData =
                        filterData.text.length > 0
                            ? page?.data.filter((doc) =>
                                  doc
                                      .data()
                                      [filterData.fieldPath].includes(
                                          filterData.text
                                      )
                              )
                            : page?.data;
                    return {
                        ...page,
                        data: filteredPageData,
                    };
                }),
            }),
        }
    );

    const fieldPathHandler = async (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setOrderData({ ...orderData, fieldPath: event.target.value });
        await queryClient.invalidateQueries({
            queryKey: queryKeys.code,
        });
        await refetch();
    };

    const directionHandler = async () => {
        setOrderData({
            ...orderData,
            isDesc: !orderData.isDesc,
        });
        await queryClient.invalidateQueries({
            queryKey: queryKeys.code,
        });
        await refetch();
    };

    const inputClearHandler = async () => {
        if (searchInputRef.current) {
            searchInputRef.current.value = "";
            setFilterData({ ...filterData, text: "" });
            await refetch();
        }
    };

    const searchHandler = async () => {
        if (searchSelectRef.current && searchInputRef.current) {
            setFilterData({
                fieldPath: searchSelectRef.current.value,
                text: searchInputRef.current.value,
            });
            await refetch();
        }
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
            { threshold: 0.9 }
        );
        if (observeTargetRef.current) {
            observer.observe(observeTargetRef.current);
            if (!hasNextPage) {
                observer.unobserve(observeTargetRef.current);
            }
        }
        return () => {
            observer.disconnect();
        };
    }, [hasNextPage, fetchNextPage]);

    return (
        <MainWrapper>
            <h2 className="a11y-hidden">코드 리스트</h2>
            {codeList &&
                (codeList.pages[0]?.size! > 0 ? (
                    <>
                        <QueryWrapper>
                            <OrderWrapper>
                                <label
                                    htmlFor="fieldPath"
                                    className="a11y-hidden"
                                >
                                    정렬 기준
                                </label>
                                <QuerySelect
                                    id="fleidPath"
                                    defaultValue={orderData.fieldPath}
                                    onChange={fieldPathHandler}
                                >
                                    <option value="timestamp">
                                        최종 수정일
                                    </option>
                                    <option value="title">제목</option>
                                    <option value="language">언어</option>
                                </QuerySelect>
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
                                <QuerySelect
                                    id="where"
                                    defaultValue="title"
                                    ref={searchSelectRef}
                                >
                                    <option value="title">제목</option>
                                    <option value="description">설명</option>
                                    <option value="tag">태그</option>
                                    <option value="language">언어</option>
                                </QuerySelect>
                                <SearchInputWrapper>
                                    <label
                                        htmlFor="searchInput"
                                        className="a11y-hidden"
                                    >
                                        검색하기
                                    </label>
                                    <SearchInput
                                        type="search"
                                        id="searchInput"
                                        name="searchInput"
                                        autoComplete="off"
                                        ref={searchInputRef}
                                        onKeyDown={(event) => {
                                            if (event.key === "Enter") {
                                                searchHandler();
                                            }
                                        }}
                                        onChange={(event) => {
                                            if (!event.target.value) {
                                                inputClearHandler();
                                            }
                                        }}
                                    />
                                    <IconButton
                                        icon={faCircleXmark}
                                        message="검색어 초기화"
                                        subMessage="초기화"
                                        onClickFunction={inputClearHandler}
                                        size="sm"
                                    />
                                    <IconButton
                                        icon={faSearch}
                                        message="검색"
                                        onClickFunction={searchHandler}
                                    />
                                </SearchInputWrapper>
                            </SearchWrapper>
                        </QueryWrapper>
                        <List>
                            <>
                                {!codeList.pages.reduce(
                                    (a, page) => a + page?.data?.length!,
                                    0
                                ) && (
                                    <NoCodeWrapper>
                                        <FontAwesomeIcon
                                            icon={faCircleExclamation}
                                            size="10x"
                                        />
                                        <NoCodeMessage>
                                            검색 결과가 없습니다.
                                        </NoCodeMessage>
                                    </NoCodeWrapper>
                                )}
                                {codeList.pages.map((page) => {
                                    const codePage = page?.data;
                                    return (
                                        codePage &&
                                        codePage.map((doc) => {
                                            const codeData = doc.data();
                                            return (
                                                <li
                                                    key={doc.id}
                                                    className="card"
                                                >
                                                    <CodeCard
                                                        id={doc.id}
                                                        title={codeData.title}
                                                        description={
                                                            codeData.description
                                                        }
                                                        tags={codeData.tag}
                                                        language={
                                                            codeData.language
                                                        }
                                                        date={codeData.timestamp.toDate()}
                                                    />
                                                </li>
                                            );
                                        })
                                    );
                                })}
                                {hasNextPage && (
                                    <ObserveLi ref={observeTargetRef}>
                                        <Spinner />
                                    </ObserveLi>
                                )}
                            </>
                        </List>
                    </>
                ) : (
                    <NoCodeWrapper>
                        <FontAwesomeIcon
                            icon={faCircleExclamation}
                            size="10x"
                        />
                        <NoCodeMessage>저장된 코드가 없습니다.</NoCodeMessage>
                        <NoCodeMessage>코드를 작성해 보세요!</NoCodeMessage>
                        <ButtonLink message={"코드 작성하기"} to="/write" />
                    </NoCodeWrapper>
                ))}
        </MainWrapper>
    );
};

export default CodeList;
