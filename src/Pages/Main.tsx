import React, { useEffect, useRef } from "react";
import { useNavigate, Navigate } from "react-router-dom";
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
import CodeCard from "../Components/CodeCard";
import Spinner from "../Components/Spinner";
import { currentUserState } from "../Configs/atoms";
import { db } from "../Configs/firebase";
import { queryKeys } from "../Constants/queryKeys";
import { variables } from "../Constants/variables";

const MainWrapper = styled.section`
    width: 100%;
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

const Main = () => {
    const observeTargetRef = useRef(null);
    const userData = useRecoilValue(currentUserState);
    const navigate = useNavigate();

    const getCodeList = async (pageParam: DocumentData | undefined) => {
        if (userData) {
            const codeQuery =
                pageParam !== undefined
                    ? query(
                          collection(db, `user/${userData.uid}/codes`),
                          orderBy("timestamp", "desc"),
                          limit(variables.CODE_LIMIT),
                          startAfter(pageParam)
                      )
                    : query(
                          collection(db, `user/${userData.uid}/codes`),
                          orderBy("timestamp", "desc"),
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
    } = useInfiniteQuery(
        queryKeys.code,
        ({ pageParam }) => getCodeList(pageParam),
        {
            getNextPageParam: (lastPage) => {
                if (lastPage) {
                    if (lastPage.size < 12) {
                        return null;
                    } else {
                        return lastPage.lastDocument;
                    }
                }
            },
        }
    );

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

    return userData ? (
        <MainWrapper>
            {codeList &&
                (codeList.pages[0]?.data.length! > 0 ? (
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
                ) : (
                    <>
                        <p>저장된 코드가 없습니다.</p>
                        <button onClick={() => navigate("/write")}>
                            코드 작성하기
                        </button>
                    </>
                ))}
        </MainWrapper>
    ) : (
        <>
            <Navigate to="/signin" />
        </>
    );
};

export default Main;
